import {TestersPanelSelectorEvent} from "@app/screens/slot_machine_screen/testers_panel/testers_panel_line/selector/TestersPanelSelectorEvent";
import {
    ITestPanelSelectorData,
    TestPanelSelector
} from "@app/screens/slot_machine_screen/testers_panel/testers_panel_line/TestPanelSelector";
import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {SlotType} from "@app/data/game_data/IGameConfig";
import {SlotUtils} from "@app/utils/SlotUtils";
import {GameData} from "@app/data/GameData";
import {Sprite} from "pixi.js";

export class TestersPanelReel extends Sprite {

    private _selectors: TestPanelSelector[] = [];

    constructor(
        private readonly reelIndex: number
    ) {
        super();

        this.createChildren();

        addEventListener(TestersPanelSelectorEvent.CHOOSE, this.onTestersPanelSelectorEvent.bind(this));
    }

    private createChildren() {
        let selector: TestPanelSelector;
        GameData.gameConfig.reelsLines.forEach((line, index) => {
            selector = new TestPanelSelector(this.reelIndex, line);
            this._selectors.push(selector);
            this.addChild(selector).y = index *  GameData.gameConfig.testersPanelBetweenLines;
        });
    }

    private onTestersPanelSelectorEvent(event: MessageEvent): void {
        let data: ITestPanelSelectorData = event.data;
        if (data.reelIndex != this.reelIndex) {
            return;
        }
        if (data.slotType == SlotType.RANDOM) {
            this._selectors.forEach(selector => selector.highlightSlotType(SlotType.RANDOM));
            return;
        }
        switch (data.reelsLine) {
            case ReelsLine.LINE_1:
                this._selectors.find(selector => selector.reelsLine == ReelsLine.LINE_3).highlightSlotType(SlotUtils.getPreviousReelSlotType(data.slotType));
                this._selectors.find(selector => selector.reelsLine == ReelsLine.LINE_2).highlightSlotType(SlotType.NONE);
                break;
            case ReelsLine.LINE_2:
                this._selectors.filter(selector => selector.reelsLine != ReelsLine.LINE_2).forEach(selector => selector.highlightSlotType(SlotType.NONE));
                break;
            case ReelsLine.LINE_3:
                this._selectors.find(selector => selector.reelsLine == ReelsLine.LINE_1).highlightSlotType(SlotUtils.getNextReelSlotType(data.slotType));
                this._selectors.find(selector => selector.reelsLine == ReelsLine.LINE_2).highlightSlotType(SlotType.NONE);
                break;
        }
    }
}
