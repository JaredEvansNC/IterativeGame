class Bullet {
    constructor(parent, name = "bullet", x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1)
    {
        // create and parent the image
        this._container = new createjs.Container();
        this._image = new createjs.Shape();
        this._image.graphics.beginFill("DarkTurquoise").dr(0, 0, 15, 7.5);
        parent.addChild(this._container);
        this._container.addChild(this._image);

        // Set the name
        this._name = name;

        // Set the position and rotation
        this._position = {x: x, y: y};
        this._rotation = rotation;

        // Set the attributes of the container
        this._container.x = this._position.x;
        this._container.y = this._position.y;
        this._container.scaleX = scaleX;
        this._container.scaleY = scaleY;
        this._container.rotation = this._rotation;    // degrees

        // Set a central reg x point
        this._image.setBounds(0, 0, 15, 7.5);
        this._image.regX = this._image.getBounds().width/2;
        this._image.regY = this._image.getBounds().height/2;

        this._radius = playerSettings.bulletCollisionRadius;

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
        // Update our position and rotation
        this._position.x += Math.cos(this.getRotationRadians()) * playerSettings.bulletSpeed * dt;
		this._position.y += Math.sin(this.getRotationRadians()) *  playerSettings.bulletSpeed  * dt;
        this._container.x = this._position.x;
        this._container.y = this._position.y; 

        if(this._position.x < -10 || this._position.x > app.SCREEN_WIDTH + 10 || this._position.y < -10 || this._position.y > app.SCREEN_HEIGHT + 10)
        {
            this.killBullet();
        }
    }

    draw(dt)
    {
        // Any special draw code we need
    }

    killBullet()
    {
        app.stage.removeChild(this._container);
        app.bullets.splice(app.bullets.indexOf(this), 1);
    }

    onCollision(collidingObject)
    {
        this.killBullet();
    }

}