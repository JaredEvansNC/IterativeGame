class Enemy {
    constructor(parent, name = "enemy", info)
    {
        // Save our info
        this.info = info;

        // create and parent the image
        this._container = new createjs.Container();
        this._image = new createjs.Shape();
        this._image.graphics.beginFill("magenta").dp(0, 0, this.info.enemySize || 20, 6);
        parent.addChild(this._container);
        this._container.addChild(this._image);

        if(!this.info.enemySize)
        {
            console.log("ERROR: enemySize is not defined for " + info.name);
        }

        // Set the name
        this._name = name;

        // Set the position and rotation
        var x = -50;
        var y = -50;

        var coinFlip = Math.random() * 2;
        if(coinFlip > 1)
        {
            // top/bottom spawn
            x = Math.random() * 800;

            var coinFlip2 = Math.random() * 2;
            if(coinFlip2 > 1)
            {
                y = -50;
            }
            else
            {
                y = 650;
            }
        }
        else
        {
            // left/right spawn
            y = Math.random() * 600;

            var coinFlip3 = Math.random() * 2;
            if(coinFlip3 > 1)
            {
                x = -50;
            }
            else
            {
                x = 850;
            }
        }

        this._position = {x: x, y: y};
        this._rotation = 0;

        // Set the attributes of the container
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.rotation = this._rotation;    // degrees

        this._radius = 20;

        if(this.info.collisionRadius)
        {
            this._radius = this.info.collisionRadius;
        }
        else
        {
            console.log("ERROR: collisionRadius is not defined for enemy " + name);
        }

        this.health = 1;

        if(this.info.health)
        {
            this.health = this.info.health;
        }
        else
        {
            console.log("ERROR: health is not defined for enemy " + name);
        }

        if(gameSettings.DEBUG_MODE_ON)
        {
            this.debugShape = new createjs.Shape();
            this.debugShape.graphics.beginStroke("red").drawCircle(0,0, this._radius);
            this._container.addChild(this.debugShape);
        }
    }

    get container() { return this._container; }
    set container(c) { this._container = c; }

    get image() { return this._image; }
    set image(i) { this._image = i; }

    get name() { return this._name; }
    set name(n) { this._name = n; }

    get position() { return this._position; }
    set position(p) { this._position = p; }

    get radius() { return this._radius; }
    set radius(r) { this._radius = r; }

    addPosition(x, y)
    {
        this._position.x += x;
        this._position.y += y;
    }

    setScale(scaleX, scaleY)
    {
        this._image.scaleX = scaleX;
        this._image.scaleY = scaleY;
    }
    
    get rotation() { return this._rotation; }
    set rotation(r) { this._rotation = r; }

    getRotationRadians()
    {
        return this._rotation / 360 * 2 * Math.PI;    // degrees
    }

    addRotation(rotation)
    {
        this._rotation += rotation;    // degrees
    }


    update(dt)
    {
        // Start moving us towards the player
        var angleRad = Math.atan2(this._position.y - app.player.position.y, this._position.x - app.player.position.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this._rotation = angleDeg;

        // Now, we get the distance between both points, so that we can stop moving when we're close enough
        var distance = Math.sqrt(Math.pow((this._position.x - app.player.position.x), 2) + Math.pow((this._position.y - app.player.position.y), 2));

        // If the game object is far enough away, moves it towards the player
        var moveSpeed = this.info.moveSpeed;    

        if(this.info.moveSpeed)
        {
            moveSpeed = this.info.moveSpeed;
        }
        else
        {
            console.log("ERROR: moveSpeed is not defined for enemy " + this._name);
        }

        if(distance > 15)
        {	
            // Move towards the player
            this._position.x -= Math.cos(angleRad) * moveSpeed * dt;
            this._position.y -= Math.sin(angleRad) * moveSpeed * dt;
        }

        // Update our position and rotation
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.rotation = this._rotation - 90;

        // Test for collisions
        var enemy = this;
        app.bullets.forEach(function(bullet){
            if(areActorsColliding(enemy, bullet))
            {
                enemy.onCollision(bullet);
                bullet.onCollision(enemy);
            }
        });

        if(areActorsColliding(enemy, app.player))
        {
            enemy.onCollision(app.player);
            app.player.onCollision(enemy);
        }
    }

    draw(dt)
    {
        // Any special draw code we need
    }
    
    killEnemy()
    {
        app.stage.removeChild(this._container);
        app.enemies.splice(app.enemies.indexOf(this), 1);
    }

    onCollision(collidingObject)
    {
        this.health -= this.collidingObject.damage || this.health;

        if(this.health <= 0)
        {
            this.killEnemy();

            if(collidingObject instanceof Bullet)
            {
                app.enemiesKilledThisWave++;

                if(app.enemiesKilledThisWave >= gameSettings.waveDefs[app.currentWave - 1].enemiesToClear)
                {
                    app.state = "postwave";
                    app.postWaveTimer = gameSettings.waveIsOverDelay;
                    app.currentWave++;
                    app.screen.waveText.text += " COMPLETE";
                    app.clearEnemies();

                    if (app.currentWave > gameSettings.waveDefs.length)
                    {
                        app.screen.waveText.text = gameSettings.victoryMessage;
                    }
                }
            }
        }
    }

}