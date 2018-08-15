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

        // Set the name
        this._name = name;

        // Set the position and rotation
        this._position = {x: 30, y: 30};
        this._rotation = 0;

        // Set the attributes of the container
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.rotation = this._rotation;    // degrees

        this._radius = this.info.collisionRadius;

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
        if(distance > 15)
        {	
            // Move towards the player
            this._position.x -= Math.cos(angleRad) * this.info.moveSpeed * dt;
            this._position.y -= Math.sin(angleRad) * this.info.moveSpeed * dt;
        }

        // Update our position and rotation
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.rotation = this._rotation - 90;
    }

    draw(dt)
    {
        // Any special draw code we need
    }

}