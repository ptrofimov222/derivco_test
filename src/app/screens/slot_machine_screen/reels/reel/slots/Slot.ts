import {Container, filters, RenderTexture, Sprite} from "pixi.js";
import {SlotType} from "@app/data/game_data/IGameConfig";
import {SlotUtils} from "@app/utils/SlotUtils";
import {GameData} from "@app/data/GameData";
import {Game} from "../../../../../../app";
import BlurFilter = filters.BlurFilter;

export class Slot extends Container {

    private _icon: Sprite;
    private _bluredTexture: RenderTexture;
    private _bluredIcon: Sprite;
    private _blurFilter: BlurFilter = new BlurFilter(1, GameData.gameConfig.blurQuality, 1);

    constructor(private readonly slotType: SlotType) {

        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    makeBlured(blur: boolean) {
        this._bluredIcon.visible = blur;
        this._icon.visible = !blur;
    }

    protected createChildren() {
        this._icon = new Sprite(SlotUtils.getSlotTypeNormalTexture(this.slotType));
        this._blurFilter.blurX = 0;
        this._blurFilter.blurY = GameData.gameConfig.blurSize;
        this._icon.filters = [this._blurFilter];
        this._bluredTexture = RenderTexture.create({
            width: this._icon.width,
            height: this._icon.height + GameData.gameConfig.blurSize * 2
        });
        this._icon.y = GameData.gameConfig.blurSize;
        Game.app.renderer.render(this._icon, this._bluredTexture);
        this._icon.y = 0;
        this._icon.filters = [];
        this._bluredIcon = new Sprite(this._bluredTexture);
    }

    private addChildren() {
        this.addChild(this._icon);
        this.addChild(this._bluredIcon);
    }

    private initChildren() {
        this._icon.pivot.y = this._icon.height;
        this._bluredIcon.pivot.y = this._icon.height;
        this.makeBlured(false);
    }
}
