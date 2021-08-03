import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {ReelLineUtils} from "@app/utils/ReelsLine";
import {Graphics, Sprite} from "pixi.js";

export class Line extends Sprite {

    constructor(
        public readonly reelsLine: ReelsLine,
        width: number,
        height: number
    ) {
        super();

        let line: Graphics = new Graphics();
        line.beginFill(ReelLineUtils.getLineColor(this.reelsLine));
        line.drawRoundedRect(0, 0, width, height, Math.floor(height * .5));
        line.endFill();
        this.addChild(line);
    }
}
