import {LoaderService} from "@app/LoaderService";
import {TweenMax} from "gsap";
import {Container, Sprite, Text} from "pixi.js";
import {GameData} from "@app/data/GameData";
import {ReelsEvent} from "@app/screens/slot_machine_screen/reels/ReelsEvent";
import {Pivot} from "@app/utils/Pivot";

export class SpinButton extends Container {
    private _playText: Text;
    private _under: Sprite;
    private _underHover: Sprite;
    private _tween: TweenMax;
    private _underDisabled: Sprite;

    constructor(
        private buttonText: string,
        onClick: Function
    ) {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();

        this._under.on(GameData.gameConfig.clickEventName, SpinButton.onButtonClick.bind(this, onClick));
        this._under.on("pointerover", this.onOver.bind(this));
        this._under.on("pointerout", this.onOut.bind(this));

        this._underHover.interactive = this._underHover.interactiveChildren = false;

        addEventListener(ReelsEvent.STARTED, this.onReelsStarted.bind(this));
        addEventListener(ReelsEvent.STOPPED, this.onReelsStopped.bind(this));
        this.onReelsStopped();
    }

    public set enabled(value: boolean) {
        this.interactive = value;
    }

    private static onButtonClick(onClick: Function): void {
        let newBalance: number = GameData.balance - GameData.gameConfig.spinPrice;
        if (newBalance < 0) {
            return;
        }
        GameData.setBalance(newBalance);
        onClick();
    }

    private onReelsStarted(): void {
        this._underDisabled.visible = true;
        this._under.visible = false;
        this._under.interactive = false;
        this._under.buttonMode = false;
        this.onOut();
    }

    private onReelsStopped(): void {
        this._underDisabled.visible = false;
        this._under.visible = true;
        this._under.interactive = true;
        this._under.buttonMode = true;
    }

    private onOver(): void {
        if (this._tween != null) {
            this._tween.pause();
        }
        this._tween = TweenMax.to(this._underHover, GameData.gameConfig.spinButtonHoverLasts, {alpha: 1});
    }

    private onOut(): void {
        if (this._tween != null) {
            this._tween.pause();
        }
        this._tween = TweenMax.to(this._underHover, GameData.gameConfig.spinButtonHoverLasts, {alpha: 0});
    }

    private createChildren() {
        this._under = new Sprite(LoaderService.getTexture("spin_normal"));
        this._underHover = new Sprite(LoaderService.getTexture("spin_hover"));
        this._underDisabled = new Sprite(LoaderService.getTexture("spin_disabled"));
        this._playText = new Text(this.buttonText, {
            fontFamily: GameData.gameConfig.defaultFont,
            fontSize:  GameData.gameConfig.spinButtonFontSize,
            fill: GameData.gameConfig.spinButtonFontColor,
            align: 'center',
        });
    }

    private addChildren() {
        this.addChild(this._under);
        this.addChild(this._underDisabled);
        this.addChild(this._underHover);
        this.addChild(this._playText);
    }

    private initChildren() {
        Pivot.centerPivot(this._playText);
        Pivot.centerPivot(this._under);
        Pivot.centerPivot(this._underDisabled);
        Pivot.centerPivot(this._underHover);

        this._underHover.alpha = 0;
        this._underDisabled.interactive = this._underDisabled.interactiveChildren = false;
        this._underHover.interactive = this._underHover.interactiveChildren = false;
        this._playText.interactive = this._playText.interactiveChildren = false;
    }
}
