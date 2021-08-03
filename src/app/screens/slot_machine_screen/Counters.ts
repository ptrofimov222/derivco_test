import {CoinsBlock} from "@app/screens/slot_machine_screen/counters/CoinsBlock";
import {Sprite} from "pixi.js";

export class Counters extends Sprite {

    private _coinsBlock: CoinsBlock;

    constructor() {
        super();

        this.createChildren();
        this.addChildren();
    }

    private createChildren() {
        this._coinsBlock = new CoinsBlock();
    }

    private addChildren() {
        this.addChild(this._coinsBlock);
    }
}
