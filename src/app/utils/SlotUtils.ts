import {SlotType} from "@app/data/game_data/IGameConfig";
import {Texture} from "pixi.js";
import {LoaderService} from "@app/LoaderService";
import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {GameData} from "@app/data/GameData";

export class SlotUtils{

    static getNextReelSlotType(slotType: SlotType): SlotType {
        let slotTypeIndex: number = GameData.gameConfig.reelData.indexOf(slotType);
        if (slotTypeIndex < GameData.reelLength - 1) {
            return GameData.gameConfig.reelData[slotTypeIndex + 1];
        }
        return GameData.gameConfig.reelData[0];
    }

    static getPreviousReelSlotType(slotType: SlotType): SlotType {
        let slotTypeIndex: number = GameData.gameConfig.reelData.indexOf(slotType);
        if (slotTypeIndex == 0) {
            return GameData.gameConfig.reelData[GameData.gameConfig.reelData.length - 1];
        }
        return GameData.gameConfig.reelData[slotTypeIndex - 1];
    }

    public static getSlotTypeNormalTexture(slotType: SlotType): Texture {
        let iconTextureId: string;
        switch (slotType) {
            case SlotType.BAR_X_1:
                iconTextureId = "bar1";
                break;
            case SlotType.BAR_X_2:
                iconTextureId = "bar2";
                break;
            case SlotType.BAR_X_3:
                iconTextureId = "bar3";
                break;
            case SlotType.SEVEN:
                iconTextureId = "seven";
                break;
            case SlotType.CHERRY:
                iconTextureId = "cherry";
                break;
        }

        return LoaderService.getTexture(iconTextureId);
    }

    static getSlotTypeSmallTesture(slotType: SlotType) {
        let iconTextureId: string;
        switch (slotType) {
            case SlotType.BAR_X_1:
                iconTextureId = "test_bar1";
                break;
            case SlotType.BAR_X_2:
                iconTextureId = "test_bar2";
                break;
            case SlotType.BAR_X_3:
                iconTextureId = "test_bar3";
                break;
            case SlotType.SEVEN:
                iconTextureId = "test_seven";
                break;
            case SlotType.CHERRY:
                iconTextureId = "test_cherry";
                break;
            case SlotType.RANDOM:
                iconTextureId = "test_random";
                break;
        }

        return LoaderService.getTexture(iconTextureId);
    }

    static getRandomSlotType(): SlotType {
        return GameData.gameConfig.reelData[Math.floor(Math.random() * GameData.reelLength)];
    }

    static getRandomReelsLine(): ReelsLine {
        return [ReelsLine.LINE_1, ReelsLine.LINE_2, ReelsLine.LINE_3][Math.floor(Math.random() * 3)];
    }

    static positionBySlotType(slotType: SlotType): number {
        return GameData.gameConfig.reelData.indexOf(slotType);
    }
}
