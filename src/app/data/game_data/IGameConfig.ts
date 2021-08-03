import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";

export enum SlotType {
    CHERRY = "cherry",
    SEVEN = "seven",
    BAR_X_2 = "bar2",
    BAR_X_1 = "bar1",
    BAR_X_3 = "bar3",
    RANDOM = "random",
    NONE = "none",
}

export interface IPaytableItemData {
    reelsLines: ReelsLine[];
    slotTypes: SlotType[];
    win: number;
}

export interface IGameConfig {
    gameInitialWidth: number;
    gameInitialHeight: number;
    clickEventName: string;
    defaultFont: string;
    spinButtonX: number;
    spinButtonY: number;
    spinButtonFontSize: number;
    spinButtonFontColor: string;
    spinButtonHoverLasts: number;
    countersX: number;
    countersY: number;
    reelsX: number;
    reelsY: number;
    backgroundX: number;
    backgroundY: number;
    paytableX: number;
    paytableY: number;
    testersPanelX: number;
    testersPanelY: number;
    linesX: number;
    linesY: number;
    linesIndicatorsLeftX: number;
    linesIndicatorsLeftY: number;
    linesIndicatorsRightX: number;
    linesIndicatorsRightY: number;
    linesWidth: number,
    linesHeight: number,
    linesBetween: number,
    linesBlinkingTimeoutMs: number;
    linesIndicatorsLinesWidth: number,
    spinPrice: number;
    config: number;
    startBalance: number;
    maxInputBalance: number;
    assetsDirectory: string;
    spinButtonLabel: string;
    slotWidth: number;
    slotHeight: number;
    blurSize: number;
    blurQuality: number;
    beginStartDuration: number;
    beginStartOffsetY: number;
    rotateDuration: number;
    rotateSlotsPass: number;
    betweenReelsStopsDuration: number;
    betweenReelsStopsSlotsPass: number;
    stopDuration: number;
    stopReelsPass: number;
    dampingDuration: number;
    dampingStartValue: number;
    reelsCount: number;
    betweenReels: number;
    paytableBackgroundX: number;
    paytableBackgroundY: number;
    paytableBackgroundWidth: number;
    paytableLineWidth: number;
    paytableLineHeight: number;
    paytableBetweenLines: number;
    paytableWinTextX: number;
    paytableWinTextFontSize: number;
    paytableWinTextFontColor: string;
    paytableLinesX: number;
    paytableBetweenSymbols: number;
    paytableColumns: number;
    paytableBetweenColumnsX: number;
    paytableBetweenColumnsY: number;
    paytableBlinkInterval: number;
    paytableComplexWinChangeTimeoutMs: number;
    winCombinationsChangeTimeoutMs: number
    coinsBlockFontSize: number;
    coinsBlockFontColor: string;
    coinsBlockWidth: number;
    coinsBlockHeight: number;
    coinsBlockPadding: number;
    coinsBlockBoxFill: string;
    coinsBlockBoxRounded: number;
    testersPanelLinesX: number;
    testersPanelLinesY: number;
    testersPanelLinesWidth: number;
    testersPanelLinesHeight: number;
    testersPanelBetweenLines: number;
    testersPanelBetweenReels: number;
    testersPanelSelectorMoveMs: number;
    nineSliceBackgroundCornerSize: number;
    reelsLines: ReelsLine[];
    reelsLineColors: string[];
    reelData: SlotType[];
    paytable: IPaytableItemData[];
    resources: string[];
}
