class HelpScreen extends ScreenBase
{
     constructor()
     {
        super();

        // Make a title
        ui.makeText(this, uiSettings.HELP_TITLE, app.SCREEN_WIDTH / 2, 100, ui.titleFont.font, ui.titleFont.color);

        // Instructions
        for(var i = 0; i < uiSettings.HELP_LINES.length; i++)
        {
            ui.makeText(this, uiSettings.HELP_LINES[i], app.SCREEN_WIDTH / 2, 265 + 45 * i - (45 * (uiSettings.HELP_LINES.length - 1) / 2), ui.defaultFont.font, ui.defaultFont.color);
        }
        

        // Make a back button
        var textInfo = { text: "BACK" };
        this.playButton = ui.makeSimpleButton(this, app.SCREEN_WIDTH / 2, 450, 200, 50, textInfo);
        this.playButton.callback = function(evt) {
            app.gotoScreen("menus");
        }
     }
}

