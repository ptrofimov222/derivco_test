import {SlotType} from "@app/data/game_data/IGameConfig";
import {SlotUtils} from "@app/utils/SlotUtils";
import {GameData} from "@app/data/GameData";
import {Container, Sprite} from "pixi.js";
import {Pivot} from "@app/utils/Pivot";

export class TestPanelSelectorButton extends Container {
    private _icon: Sprite;

    constructor(
        private onClickFunction: Function,
        public slotType: SlotType
    ) {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    private createChildren() {
        this._icon = new Sprite(SlotUtils.getSlotTypeSmallTesture(this.slotType));
    }

    private addChildren() {
        this.addChild(this._icon);
    }

    private initChildren() {
        Pivot.centerPivot(this._icon);
        this._icon.interactive = true;
        this._icon.buttonMode = true;
        this._icon.on(GameData.gameConfig.clickEventName, this.onClickFunction);
    }
}
