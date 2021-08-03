import {SlotMachineScreen} from "@app/screens/SlotMachineScreen";
import {Container} from "pixi.js";
import {Game} from "../app";

export class Screens extends Container {

    private _screenSlotMachine: SlotMachineScreen;

    constructor() {
        super();
        this.addScreen();
        this.resize();
    }

    public addScreen() {
        this._screenSlotMachine = new SlotMachineScreen();
        this.addChild(this._screenSlotMachine);
    }

    public resize() {
        this.scale.x = this.scale.y = Game.scale;
    }
}
