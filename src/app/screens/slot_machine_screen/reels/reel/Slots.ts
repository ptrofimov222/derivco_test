import {Slot} from "@app/screens/slot_machine_screen/reels/reel/slots/Slot";
import {SlotType} from "@app/data/game_data/IGameConfig";
import {GameData} from "@app/data/GameData";
import {Container} from "pixi.js";

export class Slots extends Container {

    slots: Slot[] = [];
    private _pivotY: number;

    constructor(
        private readonly reelData: SlotType[]
    ) {
        super();

        this.createChildren();
    }

    private _dampingValue: number = 0;

    get dampingValue(): number {
        return this._dampingValue;
    }

    set dampingValue(value: number) {
        this._dampingValue = value;
        this.pivot.y = this._pivotY + Math.random() * value - value * .5;
    }

    private _slotsPosition: number = 0;

    get slotsPosition(): number {
        return this._slotsPosition;
    }

    set slotsPosition(value: number) {
        this._slotsPosition = value % GameData.reelLength;
        this.pivot.y = -this._slotsPosition * GameData.gameConfig.slotHeight;
        this._pivotY = this.pivot.y;
    }

    makeBlured(blur: boolean = true) {
        for (let slot of this.slots) {
            slot.makeBlured(blur);
        }
    }

    protected createChildren() {
        let slot: Slot;
        let slotPosition = 0;
        for (let slotType of this.reelData) {
            slot = new Slot(slotType);
            this.addChild(slot).y = slotPosition;
            slotPosition -= GameData.gameConfig.slotHeight;
            this.slots.push(slot);
        }

        for (let index: number = 0; index < 3; index++) {
            slot = new Slot(this.reelData[index]);
            this.addChild(slot).y = slotPosition;
            slotPosition -= slot.height;
            this.slots.push(slot);
        }
    }
}
