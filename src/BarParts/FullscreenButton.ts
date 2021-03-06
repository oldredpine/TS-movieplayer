/// <reference path="../BarParts.ts" />
/// <reference path="../TSPlayer.ts" />
/// <reference path="../Bar.ts" />

class BarPartsFullscreenButton extends BarParts{
    constructor(player : TSPlayer , controlBar : Bar , imageSetting : BarPartsSetting){
        super(player , controlBar);

        var fullscreenButton  : HTMLDivElement = this.createButton(imageSetting)
        fullscreenButton.className = 'controllButtonRight playPauseButton';
        this.addEvent(fullscreenButton , 'click' , ()=>{
            this.player.toggleFullscreen()
        } , false);
        this.controlBar.getElement().appendChild(fullscreenButton);
    }
}
