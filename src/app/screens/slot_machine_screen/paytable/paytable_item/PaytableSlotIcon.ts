import {SlotType} from "@app/data/game_data/IGameConfig";
import {SlotUtils} from "@app/utils/SlotUtils";
import {Pivot} from "@app/utils/Pivot";
import {Sprite} from "pixi.js";

export class PaytableSlotIcon extends Sprite {

    private _icon: Sprite;

    constructor(private readonly slotTypes: SlotType[]) {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    setIcon(slotType: SlotType) {
        this._icon.texture = SlotUtils.getSlotTypeSmallTesture(slotType);
        Pivot.centerPivot(this._icon);
    }

    private createChildren() {
        this._icon = new Sprite(SlotUtils.getSlotTypeSmallTesture(this.slotTypes[0]));
    }

    private addChildren() {
        this.addChild(this._icon);
    }

    private initChildren() {
        Pivot.centerPivot(this._icon);
    }
}
