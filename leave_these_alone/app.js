// This is our global container for the entire app
var app = {
    // put any 'global' variables here, e.g. anything you want to access wherever you are

    // This will hold the stage variable needed for createJS
    stage: null,
    gamespace: null,
 
    // Store a reference to the game canvas and the context
    canvas: null,
    ctx: null,

    // Screen settings and container
    SCREEN_WIDTH: 800,
    SCREEN_HEIGHT: 600,
    screen: null,

    // Keep track of the game time
    elapsedTime: 0, // total app time
    gameTime: 0, // time for this session, reset when entering game
    nextSpawnTime: 0,

    // Game Settings
    FPS: 30,
    currentWave: 1,
    enemiesKilledThisWave: 0,
    enemiesKilledThisGame: 0,

    // menus
    // wavestart
    // inwave
    // postwave
    // gameover
    state: "menus",
    waveStartTimer: gameSettings.waveStartDelay,
    postWaveTimer: gameSettings.waveIsOverDelay,

    // Asset management
    bullets: [],
    enemies: [],
    player: null,

    // Track the particle emitters
    // We'll update this in update
    // Note that since our particles are createjs objects, createjs will do the drawing for us
    particleEmitters: [],

    // Can the player fire again?
    fireRateTimer : 0,

    // Keyboard input info
    KEYCODE_LEFT : { code: 37, isPressed: false},
    KEYCODE_UP : { code: 38, isPressed: false},
    KEYCODE_RIGHT : { code: 39, isPressed: false},
    KEYCODE_DOWN : { code: 40, isPressed: false},
    KEYCODE_SPACEBAR : { code: 32, isPressed: false},
    KEYCODE_W : { code: 87, isPressed: false},
    KEYCODE_A : { code: 65, isPressed: false},
    KEYCODE_S : { code: 83, isPressed: false},
    KEYCODE_D : { code: 68, isPressed: false},


    // Mouse pos tracker
    mousePos: {x: 0, y: 0},

    // Setup the canvas
    setupCanvas: function() {
      this.canvas = document.getElementById("game"); //get canvas with id='game'
      this.canvas.width = this.SCREEN_WIDTH;
      this.canvas.height = this.SCREEN_HEIGHT;
      this.ctx = this.canvas.getContext("2d");
      this.stage = new createjs.Stage(this.canvas); //makes stage object from the canvas
    },
    
    // Run once when the page loads
    init: function () {
        // Sets up the canvas and our screen
        this.setupCanvas(); 
        this.gamespace = new createjs.Container();
        this.gamespace.setBounds(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        var background = new createjs.Shape();
        background.graphics.beginFill('#adff5b').dr(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.stage.addChild(this.gamespace);
        this.gamespace.addChild(background);

        this.screen = new createjs.Container();
        this.screen.setBounds(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.stage.addChild(this.screen);

        // Enable and track mouse input
        this.stage.enableMouseOver();
        
        this.stage.on("stagemousemove", function(evt) {
            app.mousePos.x = Math.floor(evt.stageX);
            app.mousePos.y = Math.floor(evt.stageY);
            //console.log("Mouse: ( " + app.mouseX + ", " + app.mouseY + " )");
        });
        this.stage.on("stagemousedown", function (evt) {
            app.handleMouseDown(evt);
        });

        // Set up our basic keyboard inputs 
        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        
        // Set up our game loop
        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = this.FPS;

        // Create the first screen
        this.gotoScreen("menus");


    },

    // Our game's update function, which will be run every tick at the FPS we specified
    update: function (event)
    {
        // Calculate our delta time
        var dt = event.delta / 1000;

        // Track the elapsed time
        app.elapsedTime += dt;

        app.stage.update(event);  //updates the stage
		if(app.screen.update !== undefined)
		{
			app.screen.update(dt); // update the current screen
		}
        // Particle test code
        for (var i = 0; i < app.particleEmitters.length; i++)
        {
            app.particleEmitters[i].update(dt);            
        }

        // Update our game to match the state
        if(app.state == "menus")
        {
            // Anything specific in the menu state
        }
        // Update specific to actually being in game
        else if (app.state == "wavestart" || app.state == "inwave" || app.state == "postwave")
        {
             // Update all of our bullets
            for (var i = 0; i < app.bullets.length; i++)
            {
                app.bullets[i].update(dt);
            }

            // Update all of our enemies
            for (var i = 0; i < app.enemies.length; i++)
            {
                app.enemies[i].update(dt);
            }

            // Update the player
            app.player.update(dt);

            // Update the game timer
            app.gameTime += dt;

            // Update our fire rate
            if(app.fireRateTimer >= 0)
            {
                app.fireRateTimer -= dt;
            }

            var moveSpeed = 50;
            if(playerSettings.moveSpeed)
            {
                moveSpeed = playerSettings.moveSpeed;
            }
            else
            {
                console.log("ERROR: playerSettings.moveSpeed is not defined");
            }


            // Poll the keys and move the player character accordinlgy
            if(app.KEYCODE_LEFT.isPressed || app.KEYCODE_A.isPressed)
            {
                app.player.addPosition(-playerSettings.moveSpeed * dt, 0);
            }

            if(app.KEYCODE_RIGHT.isPressed || app.KEYCODE_D.isPressed)
            {
                app.player.addPosition(playerSettings.moveSpeed * dt, 0);
            }

            if(app.KEYCODE_UP.isPressed || app.KEYCODE_W.isPressed)
            {
                app.player.addPosition(0, -playerSettings.moveSpeed * dt);
            }

            if(app.KEYCODE_DOWN.isPressed || app.KEYCODE_S.isPressed)
            {
                app.player.addPosition(0, playerSettings.moveSpeed * dt);
            }

            // We need the angle in both radians and degrees
            var angleRad = Math.atan2(app.mousePos.y - app.player.position.y, app.mousePos.x - app.player.position.x);
            var angleDeg = angleRad * 180 / Math.PI;
            app.player.rotation = angleDeg;
            
            // Update the prewave sequence if we're here
            if (app.state == "wavestart")
            {
                if(gameSettings.waveStartDelay)
                {
                    if(app.waveStartTimer > 0)
                    {
                        app.waveStartTimer -= dt;
    
                        if(app.waveStartTimer <= gameSettings.waveStartDelay * 0.25)
                        {
                            app.screen.waveText.alpha = lerp(0, 1, app.waveStartTimer / (gameSettings.waveStartDelay * 0.25));
                        }
                        else if (app.waveStartTimer >= gameSettings.waveStartDelay * 0.75)
                        {
                            var timeOffset = gameSettings.waveStartDelay * 0.75;
                            app.screen.waveText.alpha = lerp(1, 0, (app.waveStartTimer - timeOffset) / (gameSettings.waveStartDelay  - timeOffset));
                        }
                        else
                        {
                            app.screen.waveText.alpha = 1;
                        }
    
                        if(app.waveStartTimer <= 0)
                        {
                            app.state = "inwave";
                            app.screen.waveText.alpha = 0;
                        }
                    }
                }
                else
                {
                    console.log("ERROR: gameSettings.waveStartDelay is not defined");
                }

                
            }

            // If we're here, handle the wave spawning
            if (app.state == "inwave")
            {

                if(app.nextSpawnTime > 0)
                {
                    app.nextSpawnTime -= dt;

                    if(app.nextSpawnTime <= 0)
                    {
                        app.getNextSpawnTime();

                        var randomEnemyIndex = Math.floor(Math.random() * gameSettings.waveDefs[app.currentWave - 1].enemyList.length );
                        var randomEnemyName = gameSettings.waveDefs[app.currentWave - 1].enemyList[randomEnemyIndex];
                        var randomEnemyInfo = enemySettings[randomEnemyName];
                        
                        if (randomEnemyInfo)
                        {
                            app.enemies.push(new Enemy(app.gamespace, randomEnemyName, randomEnemyInfo));
                        }
                        else
                        {
                            console.log("ERROR: Enemy name listed in waveDefs does not match an enemy in enemysettings.js");
                        }
                    }
                }

            }

            // If we're here, handle the post wave sequence
            if (app.state == "postwave")
            {
                if(gameSettings.waveIsOverDelay)
                {
                    if(app.postWaveTimer > 0)
                    {
                        app.postWaveTimer -= dt;

                        if(app.postWaveTimer <= gameSettings.waveIsOverDelay * 0.25)
                        {
                            app.screen.waveText.alpha = lerp(0, 1, app.postWaveTimer / (gameSettings.waveIsOverDelay * 0.25));
                        }
                        else if (app.postWaveTimer >= gameSettings.waveIsOverDelay * 0.75)
                        {
                            var timeOffset = gameSettings.waveIsOverDelay * 0.75;
                            app.screen.waveText.alpha = lerp(1, 0, (app.postWaveTimer - timeOffset) / (gameSettings.waveIsOverDelay  - timeOffset));
                        }
                        else
                        {
                            app.screen.waveText.alpha = 1;
                        }

                        if(app.postWaveTimer <= 0)
                        {
                            
                            // If the game is over, end it now
                            if(app.currentWave > gameSettings.waveDefs.length)
                            {
                                app.gotoScreen("gameover");
                            }
                            else
                            {
                                app.waveReset();
                            }
                        }
                    }

                }
                else
                {
                    console.log("ERROR: gameSettings.waveIsOverDelay is not defined");
                }
            }

        }
        

        // Now that everything is updated, draw our game
        app.draw(dt); 
    },

    // Our game's draw function, which will be run every tick at the FPS we specified
    draw: function (dt)
    {

        // Draw our game to match the state
        if(app.state == "loading")
        {
            // If we're loading, update the screen fillbar
        }
        else if (app.state == "mainmenu")
        {
            //console.log("We're playing");
        }
        else if (app.state == "help")
        {
            //console.log("We're playing");
        }
        else if (app.state == "gameplay")
        {
            //console.log("We're playing");
        }
    },

    // Given a screen id, change our screen to a new one, set the appropriate game state
    gotoScreen: function(screenType)
    {
        // In most cases, we clear all the children of the current screen 
        switch(screenType)
        {
            case "menus":
            effects.clearAllParticles();
            this.screen.removeAllChildren();
            this.screen = new MainMenu();
            this.state = "menus";
            break;

            case "help":
            effects.clearAllParticles();
            this.screen.removeAllChildren();
            this.screen = new HelpScreen();
            this.state = "help";
            break;

            case "wavestart":
            effects.clearAllParticles();
            this.screen.removeAllChildren();
            this.resetGame(); 
            this.screen = new GameScreen();
            this.state = "wavestart";
            this.createPlayer();
            this.screen.healthFill.updateFillbar();
            this.getNextSpawnTime();
            app.screen.waveFill.updateFillbar();
            break;

            case "gameover":
            effects.clearAllParticles();
            this.screen.removeAllChildren();
            this.screen = new EndScreen();
            this.state = "gameover";
            break;

            default:
            console.log("ERROR: Cannot swap screen, invalid ID");
            break;
        }
    },

    handleKeyDown: function(evt)
    {
        if(!evt){ var evt = window.event; }  //browser compatibility
        
        //console.log("Key " + evt.keyCode + " is down");

        switch(evt.keyCode) {
            case app.KEYCODE_LEFT.code:     app.KEYCODE_LEFT.isPressed = true; return false;
            case app.KEYCODE_RIGHT.code:    app.KEYCODE_RIGHT.isPressed = true; return false;
            case app.KEYCODE_UP.code:       app.KEYCODE_UP.isPressed = true; return false;
            case app.KEYCODE_DOWN.code:     app.KEYCODE_DOWN.isPressed = true; return false;
            case app.KEYCODE_SPACEBAR.code: app.KEYCODE_SPACEBAR.isPressed = true; return false;
            case app.KEYCODE_W.code:     app.KEYCODE_W.isPressed = true; return false;
            case app.KEYCODE_A.code:     app.KEYCODE_A.isPressed = true; return false;
            case app.KEYCODE_S.code:     app.KEYCODE_S.isPressed = true; return false;
            case app.KEYCODE_D.code:     app.KEYCODE_D.isPressed = true; return false;
        }
    },
        
    handleKeyUp: function (evt)
    {
        if(!evt) { var evt = window.event; }  //browser compatibility
        
        //console.log("Key " + evt.keyCode + " is up");

        switch(evt.keyCode) {
            case app.KEYCODE_LEFT.code:     app.KEYCODE_LEFT.isPressed = false; break;
            case app.KEYCODE_RIGHT.code:    app.KEYCODE_RIGHT.isPressed = false; break;
            case app.KEYCODE_UP.code:       app.KEYCODE_UP.isPressed = false; break;
            case app.KEYCODE_DOWN.code:     app.KEYCODE_DOWN.isPressed = false; break;
            case app.KEYCODE_SPACEBAR.code: app.KEYCODE_SPACEBAR.isPressed = false; break;
            case app.KEYCODE_W.code:     app.KEYCODE_W.isPressed = false; return false;
            case app.KEYCODE_A.code:     app.KEYCODE_A.isPressed = false; return false;
            case app.KEYCODE_S.code:     app.KEYCODE_S.isPressed = false; return false;
            case app.KEYCODE_D.code:     app.KEYCODE_D.isPressed = false; return false;
        }
    },

    // When the mouse is clicked, pass it on to the appropriate places
    handleMouseDown: function(evt)
    {

        if(this.state == "inwave" || this.state == "wavestart" || this.state == "postwave")
        {
            // fire a bullet
            if(this.fireRateTimer <= 0)
            {
                var offset = 30;
                var xPos = app.player.position.x + (Math.cos(app.player.getRotationRadians()) * offset);
		        var yPos = app.player.position.y + (Math.sin(app.player.getRotationRadians()) * offset);
                app.bullets.push(new Bullet(this.gamespace, "bullet" + app.bullets.length, xPos, yPos, app.player.rotation, playerSettings.bulletSize));
                this.fireRateTimer = 2;

                if(playerSettings.fireRate)
                {
                    this.fireRateTimer = playerSettings.fireRate;
                }
                else
                {
                    console.log("ERROR: playerSettings.fireRate is not defined");
                }
                
            }
        }
        
    },

    // Change the score by the given amount
    addToScore: function(points)
    {
        app.score += points;
        app.screen.scoreUI.text = app.score;
    },

    // Called whenever we need to reset the game
    resetGame: function()
    {
        app.score = 0;
        app.gameTime = 0;
        app.currentWave = 1;
        app.clearEnemies();
        app.waveReset();
        app.enemiesKilledThisGame = 0;
    },

    // Creates the player object
    createPlayer: function()
    {
        if(!app.player)
        {

            var scale = 1;
            if(playerSettings.playerSize)
            {
                scale = playerSettings.playerSize;
            }
            else
            {
                console.log("ERROR: playerSettings.playerSize is not defined");
            }

            app.player = new Actor(app.gamespace, "player", app.SCREEN_WIDTH / 2, app.SCREEN_HEIGHT /2, scale);
        }
        else
        {
            app.player.position = {x: app.SCREEN_WIDTH / 2, y: app.SCREEN_HEIGHT /2}
        }
    },

    // What is our next spawn time?
    getNextSpawnTime: function()
    {
        this.nextSpawnTime = gameSettings.waveDefs[this.currentWave - 1].spawnRate + (Math.random() * (gameSettings.waveDefs[this.currentWave - 1].spawnRateRandomizer + gameSettings.waveDefs[this.currentWave - 1].spawnRateRandomizer) - gameSettings.waveDefs[this.currentWave - 1].spawnRateRandomizer);
    },

    clearEnemies: function()
    {
        for(i = app.enemies.length -1 ; i >= 0; i--)
        {
            app.enemies[i].killEnemy();
        }
    },

    waveReset: function()
    {
        app.state = "wavestart";
        if(app.screen.updateWaveText)
        {
            app.screen.updateWaveText();
            app.screen.waveText.alpha = 0;
        }
        app.waveStartTimer = gameSettings.waveStartDelay;
        app.enemiesKilledThisWave = 0;
        
        if(app.screen.waveFill)
        {
            app.screen.waveFill.updateFillbar();
        }
    }

}
    