import {IPaytableItemData, SlotType} from "@app/data/game_data/IGameConfig";
import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {Reel} from "@app/screens/slot_machine_screen/reels/Reel";
import {IWinItem} from "@app/screens/SlotMachineScreen";
import {SlotUtils} from "@app/utils/SlotUtils";
import {GameData} from "@app/data/GameData";

export class Win {

    static countWin(reels: Reel[]): IWinItem[] {
        let stopReelsSymbols: Map<ReelsLine, SlotType>[] = [];
        let map: Map<ReelsLine, SlotType>;
        let stopLinesSymbols: Map<ReelsLine, SlotType[]> = new Map<ReelsLine, SlotType[]>();
        let existingLines: ReelsLine[] = [];
        let winItems: IWinItem[] = [];
        reels.forEach(reel => {
            map = new Map<ReelsLine, SlotType>();
            map.set(reel.stopReelsLine, reel.stopSlotType);
            switch (reel.stopReelsLine) {
                case ReelsLine.LINE_1:
                    map.set(ReelsLine.LINE_2, SlotType.NONE);
                    map.set(ReelsLine.LINE_3, SlotUtils.getPreviousReelSlotType(reel.stopSlotType));
                    break;
                case ReelsLine.LINE_2:
                    map.set(ReelsLine.LINE_1, SlotType.NONE);
                    map.set(ReelsLine.LINE_3, SlotType.NONE);
                    break;
                case ReelsLine.LINE_3:
                    map.set(ReelsLine.LINE_1, SlotUtils.getNextReelSlotType(reel.stopSlotType));
                    map.set(ReelsLine.LINE_2, SlotType.NONE);
                    break;
            }
            stopReelsSymbols.push(map);
        });
        GameData.gameConfig.reelsLines.forEach(reelsLine => stopLinesSymbols.set(reelsLine, stopReelsSymbols.map(item => item.get(reelsLine))));
        GameData.gameConfig.paytable.forEach(
            paytableItem => Win.checkLines(stopLinesSymbols, paytableItem).forEach(winItem => winItems.push(winItem))
        );

        return winItems.filter(
            item => {
                if (item.reelsLine != ReelsLine.NONE && existingLines.indexOf(item.reelsLine) == -1) {
                    existingLines.push(item.reelsLine);
                    return true
                }
                return false;
            }
        );
    }

    private static checkLines(stopLinesSymbols: Map<ReelsLine, SlotType[]>, paytableItemData: IPaytableItemData): IWinItem[] {
        let winLines: ReelsLine[] = GameData.gameConfig.reelsLines.filter(reelsLine =>
            Win.checkLine(stopLinesSymbols.get(reelsLine), reelsLine, paytableItemData)
        );

        return winLines.map(winLine => {
            return {reelsLine: winLine || ReelsLine.NONE, paytableItemData}
        });
    }

    private static checkLine(slotTypes: SlotType[], reelsLine: ReelsLine, paytableItemData: IPaytableItemData): boolean {
        return slotTypes.every(slotType => paytableItemData.slotTypes.indexOf(slotType) > -1 && paytableItemData.reelsLines.indexOf(reelsLine) > -1);
    };
}
