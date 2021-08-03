import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {GameData} from "@app/data/GameData";

export class ReelLineUtils {

    static getLineColor(reelsLine: ReelsLine): number {
        switch (reelsLine) {
            case ReelsLine.LINE_1:
                return parseInt(GameData.gameConfig.reelsLineColors[0]);
            case ReelsLine.LINE_2:
                return parseInt(GameData.gameConfig.reelsLineColors[1]);
            case ReelsLine.LINE_3:
                return parseInt(GameData.gameConfig.reelsLineColors[2]);
        }
    }
}
