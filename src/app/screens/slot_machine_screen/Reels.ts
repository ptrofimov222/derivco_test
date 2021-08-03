import {Reel} from "@app/screens/slot_machine_screen/reels/Reel";
import {Container} from "pixi.js";
import {GameData} from "@app/data/GameData";
import {ReelsEvent} from "@app/screens/slot_machine_screen/reels/ReelsEvent";

export class Reels extends Container {

    reels: Reel[] = [];

    constructor() {
        super();

        this.createChildren();
    }

    start() {
        dispatchEvent(new Event(ReelsEvent.STARTED));
        for (let reel of this.reels) {
            reel.beginStart();
        }
    }

    private createChildren() {
        let reel: Reel;
        for (let reelIndex: number = 0; reelIndex < GameData.gameConfig.reelsCount; reelIndex++) {
            reel = new Reel(reelIndex, GameData.gameConfig.reelData);
            this.reels.push(reel);
            this.addChild(reel).x = reelIndex * (GameData.gameConfig.slotWidth + GameData.gameConfig.betweenReels);
        }
    }
}

export enum ReelsLine {
    LINE_1 = 1,
    LINE_2 = 2,
    LINE_3 = 3,
    RANDOM = 0,
    NONE = -1,
}
