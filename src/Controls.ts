/// <reference path="jquery.d.ts" />
/// <reference path="Player.ts" />
/// <reference path="Bar.ts" />

class BackgroundImageSetting{
    src         :  string;
    width       :  number;
    height      :  number;
    top         :  number;
    left        :  number;
    scaleWidth  :  number;
    scaleHeight :  number;
    constructor(src , width , height , top , left , scaleWidth , scaleHeight){
        this.src         = src
        this.width       = width
        this.height      = height
        this.top         = top
        this.left        = left
        this.scaleWidth  = scaleWidth
        this.scaleHeight = scaleHeight
    }
}

class Controls{
    player : Player;
    controlBar : Bar;
    centerPlayButton     :HTMLDivElement
    separateString : string
    hasSetDuration      : Boolean = false
    hasSetCurrentTime   : Boolean = false
    constructor(player : Player , controlBar : Bar ){
        this.player = player;
        this.controlBar = controlBar;
    }
    
    private createButton(backgroundImageSetting : BackgroundImageSetting):HTMLDivElement{
        var button: HTMLDivElement = document.createElement('div');
        var style = button.style;
        style.width               = backgroundImageSetting.width + "px";
        style.height              = backgroundImageSetting.height + "px";
        style.backgroundImage     = "url('" + backgroundImageSetting.src + "')";
        style.backgroundRepeat    =  "no-repeat";
        style.backgroundPosition  = backgroundImageSetting.top + "px " + backgroundImageSetting.left + "px";
        style.backgroundSize      = backgroundImageSetting.scaleWidth + "% " + backgroundImageSetting.scaleHeight + "%";
        style.zIndex              = (<ControlBar>this.controlBar).getZIndex() + 1 + "";
        return button;
    }

    /**
        <br>
        
        @method setCenterPlayButton 
        @param width        {number} image element Width
        @param height       {number} image element Height
        @param top          {number} image element view area start top  for CSS Sprite
        @param left         {number} image element view area start left for CSS Sprite
        @param scaleWidth   {number} background image view ratio
        @param scaleHeight  {number} background image view ratio
        @return void
    */
    public setCenterPlayButton(backgroundImageSetting : BackgroundImageSetting):void{
        var centerPlayButton : HTMLDivElement = this.createButton(backgroundImageSetting)
        centerPlayButton.className = 'centerPlayButton';
        var style = centerPlayButton.style;
        style.position = 'absolute';
        style.left = (this.player.width  - backgroundImageSetting.width) / 2 + "px";
        style.top  = (this.player.height - backgroundImageSetting.height) / 2 + "px";
        
        var targetParent:HTMLDivElement = this.player.targetParent;
        targetParent.appendChild(centerPlayButton);

        this.centerPlayButton = centerPlayButton;
        
        centerPlayButton.addEventListener('click' , () => {
            this.player.togglePlayPause();
        },false);

        centerPlayButton.addEventListener('touch' , () => {
            this.player.togglePlayPause();
        },false);

        // hide
        this.player.hookAfterRestart(() => {
            style.visibility = "hidden";
            style.display    = "none";
        });
        this.player.hookAfterPlay(() => {
            style.visibility = "hidden";
            style.display    = "none";
        });

        // view 
        this.player.hookAfterPause(() => {
            style.visibility = "visible";
            style.display    = "block";
        });
        this.player.hookEnded(() => {
            style.visibility = "visible";
            style.display    = "block";
        });
    }
 
    private modifyButton(button:HTMLDivElement , backgroundImageSetting : BackgroundImageSetting):void{
        var style = button.style;
        style.width               = backgroundImageSetting.width + "px";
        style.height              = backgroundImageSetting.height + "px";
        style.backgroundImage     = "url('" + backgroundImageSetting.src + "')";
        style.backgroundRepeat    =  "no-repeat";
        style.backgroundPosition  = backgroundImageSetting.top + "px " + backgroundImageSetting.left + "px";
        style.backgroundSize      = backgroundImageSetting.scaleWidth + "% " + backgroundImageSetting.scaleHeight + "%";
    }

    /**
        <br>
        
        @method setPlayButton 
        @param {} 
        @return void
    */
    public setPlayButton(playBackgroundImageSetting : BackgroundImageSetting , pauseBackgroundImageSetting : BackgroundImageSetting){
        var playPauseButton  : HTMLDivElement = this.createButton(pauseBackgroundImageSetting)
        playPauseButton.className = 'controllButtonLeft playPauseButton';
        this.controlBar.getElement().appendChild(playPauseButton);
        
        // play
        this.player.hookAfterRestart(() => {
            this.modifyButton(playPauseButton , pauseBackgroundImageSetting)
        });
        this.player.hookAfterPlay(() => {
            this.modifyButton(playPauseButton , pauseBackgroundImageSetting)
        });

        // pause/end 
        this.player.hookAfterPause(() => {
            this.modifyButton(playPauseButton , playBackgroundImageSetting)
        });
        this.player.hookEnded(() => {
            this.modifyButton(playPauseButton , playBackgroundImageSetting)
        });

        playPauseButton.addEventListener('click' , () => {
            this.player.togglePlayPause();
        },false);
        playPauseButton.addEventListener('touch' , () => {
            this.player.togglePlayPause();
        },false);
    }

    /**
        <br>
        
        @method setFullscreenButton 
        @param {} 
        @return void
    */
    public setFullscreenButton(backgroundImageSetting : BackgroundImageSetting):void{
        var fullscreenButton  : HTMLDivElement = this.createButton(backgroundImageSetting)
        fullscreenButton.className = 'controllButtonRight playPauseButton';
        this.controlBar.getElement().appendChild(fullscreenButton);
    }
    
    /**
        <br>
        
        @method setVolumeButton 
        @param {} 
        @return void
    */
    public setVolumeButton(barBackgroundImageSetting : BackgroundImageSetting , barBackgroundOption : BackgroundImageSetting):void{
    }

    /**
        <br>
        
        @method setVolumeBar 
        @param {} 
        @return void
    */
    public setVolumeBar(src : string , width : number , height : number , top : number , left : number , scaleWidth : number , scaleHeight : number):void{
    }

    /**
        <br>
        
        @method setVolumeBackground 
        @param {} 
        @return void
    */
    public setVolumeBackground(src : string , width : number , height : number , top : number , left : number , scaleWidth : number , scaleHeight : number):void{
    }
    
    /**
        <br>
        
        @method setSeparator 
        @param separateString {string} 
        @return void
    */
    public setSeparator(separateString : string):void{
        this.separateString = separateString;
    }

    /**
        <br>
        
        @method setCurrentTime 
        @return void
    */
    public setCurrentTime():void{
        this.hasSetCurrentTime = true;
        var barHeight : number = this.controlBar.getHeight();
        var area : HTMLDivElement = document.createElement('div');
        area.style.height = barHeight + "px";
        area.innerHTML = "00:00";
        area.className = 'controllButtonLeft currentTime';
        this.controlBar.getElement().appendChild(area);

        this.player.hookTimeUpdate((player:Player , video:HTMLVideoElement)=>{
            var currentTime = player.getCurrentTime();
            var currentTimeString = this.getTime(currentTime);
            area.innerHTML = currentTimeString;
        });
    }

    /**
        <br>
        
        @method setDuration 
        @param durationSeconds {number} 
        @return void
    */
    public setDuration(durationSeconds : number):void{
        var barHeight : number = this.controlBar.getHeight();
        var area : HTMLDivElement = document.createElement('div');
        area.style.height = barHeight + "px";
        
        var durationString : string = this.getTime(durationSeconds)

        area.innerHTML = durationString;
        area.className = 'controllButtonLeft duration';

        if(this.hasSetCurrentTime && this.separateString){
            // display separator
            var separator : HTMLDivElement = document.createElement('div');
            separator.style.height = barHeight + "px";
            separator.innerHTML = this.separateString;
            separator.className = 'controllButtonLeft';
            this.controlBar.getElement().appendChild(separator);
        }
        this.controlBar.getElement().appendChild(area);
    }

    private getTime(time : number) : string{
        var hour   = 0 ;
        var minute = 0 ;
        var second = 0 ;

        while(time > 3600){
            time -= 3600;
            hour ++
        }
        while(time> 60){
            time -= 60;
            minute ++
        }
        second = parseInt(time.toString());
        var timeString = "";
        if(hour > 0){
            timeString += hour < 10 ? "0" + hour : hour.toString();
            timeString += ":"
        }
        timeString += minute < 10 ? "0" + minute : minute.toString();
        timeString += ":"
        timeString += second < 10 ? "0" + second : second.toString();
        
        return timeString
    }
}
