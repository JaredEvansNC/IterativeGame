class GameScreen extends ScreenBase
{
     constructor()
     {
        super();

        // Change the background color
        this._fillShape.visible = false;

        // Make a ui entry to track the number of clicks
        this.scoreUI = ui.makeText(this, app.score, app.SCREEN_WIDTH - 15, 25, ui.defaultFont.font, ui.defaultFont.color, "right");
     
        // Displays text in between waves
        this.waveText = ui.makeText(this, "", 400, 200, "50px Titan One", "rgba(0, 0, 0, 255)", "center");
        this.waveText.alpha = 0;
        this.updateWaveText();

        ui.makeText(this, "SCORE", app.SCREEN_WIDTH - 15, 45, "12px Titan One", ui.defaultFont.color, "right");
     

        // Health bar
        var callback = function()
        {
            this.fill.scaleX = app.player.health / playerSettings.startingHealth ;
            this.text.text = app.player.health + " / " + playerSettings.startingHealth;
        };

        this.healthFill = ui.makeFillbar(this, 115, 25, 200, 25, ui.colors.dark, "red", "14px Titan One", "white", callback );
        ui.makeText(this, "HEALTH", 15, 45, "12px Titan One", ui.defaultFont.color, "left");

        var callback2 = function()
        {
            this.fill.scaleX = app.enemiesKilledThisWave / gameSettings.waveDefs[app.currentWave - 1].enemiesToClear ;
            this.text.text = app.enemiesKilledThisWave + " / " + gameSettings.waveDefs[app.currentWave - 1].enemiesToClear;
        };
        this.waveFill = ui.makeFillbar(this, app.SCREEN_WIDTH / 2, app.SCREEN_HEIGHT - 30, 350, 30, ui.colors.dark, "teal", "18px Titan One", "white", callback2 );
        ui.makeText(this, "ENEMIES CLEARED", app.SCREEN_WIDTH / 2, app.SCREEN_HEIGHT - 55, "14px Titan One", ui.defaultFont.color, "center");
    }

    updateWaveText()
    {
        var waveText = "WAVE " + app.currentWave;
        if(gameSettings.waveDefs[app.currentWave - 1] && gameSettings.waveDefs[app.currentWave - 1].waveName !== "default")
        {
            waveText = gameSettings.waveDefs[app.currentWave - 1].waveName;
        }

        this.waveText.text = waveText;
    }

}