class GameScreen extends ScreenBase
{
     constructor()
     {
        super();

        // Change the background color
        this.color = '#adff5b';

        // Make a ui entry to track the number of clicks
        this.scoreUI = ui.makeText(this, "SCORE: " + app.score, 15, 25, ui.defaultFont.font, ui.defaultFont.color, "left");
     
        // Displays text in between waves
        this.waveText = ui.makeText(this, "", 400, 250, "40px arial", "rgba(0, 0, 0, 0)", "center");
        this.updateWaveText();
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