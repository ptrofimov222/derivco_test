import {ReelsEvent} from "@app/screens/slot_machine_screen/reels/ReelsEvent";
import {TestersPanel} from "@app/screens/slot_machine_screen/TestersPanel";
import {Reels, ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {SpinButton} from "@app/screens/slot_machine_screen/SpinButton";
import {Counters} from "@app/screens/slot_machine_screen/Counters";
import {Paytable} from "@app/screens/slot_machine_screen/Paytable";
import {IPaytableItemData} from "@app/data/game_data/IGameConfig";
import {LoaderService} from "@app/LoaderService";
import {GameData} from "@app/data/GameData";
import {Container, Sprite} from "pixi.js";
import {Lines} from "@app/common/Lines";
import {Win} from "@app/utils/Win";

export class SlotMachineScreen extends Container {
    private _spinButton: SpinButton;
    private _counters: Counters;
    private _reels: Reels;
    private _background: Sprite;
    private _testersPanel: TestersPanel;
    private _paytable: Paytable;
    private _winPaytableItems: IWinItem[];
    private _winPaytableItemsIndex: number;
    private _winInterval: number;
    private _lines: Lines;
    private _linesIndicatorsLeft: Lines;
    private _linesIndicatorsRight: Lines;

    constructor() {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();

        addEventListener(ReelsEvent.STOPPED, this.onReelsStopped.bind(this));
    }

    private onReelsStopped() {
        this._winPaytableItems = Win.countWin(this._reels.reels);

        if (!this._winPaytableItems.length) {
            return;
        }

        let winSum: number = 0;
        this._winPaytableItems.forEach(item => winSum += item.paytableItemData.win);
        GameData.setBalance(GameData.balance + winSum);
        this.showWin();
    }

    private createChildren() {
        this._background = new Sprite(LoaderService.getTexture("background"));
        this._spinButton = new SpinButton(GameData.gameConfig.spinButtonLabel, this.onSpinButtonClicked.bind(this));
        this._counters = new Counters();
        this._reels = new Reels();
        this._paytable = new Paytable();
        this._testersPanel = new TestersPanel();
        this._lines = new Lines(
            GameData.gameConfig.reelsLines,
            GameData.gameConfig.linesWidth,
            GameData.gameConfig.linesHeight,
            GameData.gameConfig.linesBetween
        );
        this._linesIndicatorsLeft = new Lines(
            GameData.gameConfig.reelsLines,
            GameData.gameConfig.linesIndicatorsLinesWidth,
            GameData.gameConfig.linesHeight,
            GameData.gameConfig.linesBetween
        );
        this._linesIndicatorsRight = new Lines(
            GameData.gameConfig.reelsLines,
            GameData.gameConfig.linesIndicatorsLinesWidth,
            GameData.gameConfig.linesHeight,
            GameData.gameConfig.linesBetween
        );
    }

    private onSpinButtonClicked(): void {
        this.stopShowWin();
        this._reels.start();
    }

    private addChildren() {
        this.addChild(this._background);
        this.addChild(this._spinButton);
        this.addChild(this._counters);
        this.addChild(this._reels);
        this.addChild(this._paytable);
        this.addChild(this._testersPanel);
        this.addChild(this._lines);
        this.addChild(this._linesIndicatorsLeft);
        this.addChild(this._linesIndicatorsRight);
    }

    private initChildren() {
        this._spinButton.x = GameData.gameConfig.spinButtonX;
        this._spinButton.y = GameData.gameConfig.spinButtonY;
        this._counters.x = GameData.gameConfig.countersX;
        this._counters.y = GameData.gameConfig.countersY;
        this._reels.x = GameData.gameConfig.reelsX;
        this._reels.y = GameData.gameConfig.reelsY;
        this._background.x = GameData.gameConfig.backgroundX;
        this._background.y = GameData.gameConfig.backgroundY;
        this._paytable.x = GameData.gameConfig.paytableX;
        this._paytable.y = GameData.gameConfig.paytableY;
        this._testersPanel.x = GameData.gameConfig.testersPanelX;
        this._testersPanel.y = GameData.gameConfig.testersPanelY;
        this._lines.x = GameData.gameConfig.linesX;
        this._lines.y = GameData.gameConfig.linesY;
        this._lines.showLine(ReelsLine.NONE);
        this._linesIndicatorsLeft.x = GameData.gameConfig.linesIndicatorsLeftX;
        this._linesIndicatorsLeft.y = GameData.gameConfig.linesIndicatorsLeftY;
        this._linesIndicatorsRight.x = GameData.gameConfig.linesIndicatorsRightX;
        this._linesIndicatorsRight.y = GameData.gameConfig.linesIndicatorsRightY;
    }

    private showWin() {
        this._winPaytableItemsIndex = 0;
        this._winInterval = setInterval(this.showWinItem.bind(this), GameData.gameConfig.winCombinationsChangeTimeoutMs);
        this.showWinItem();
    }

    private showWinItem() {
        let currentWinItem: IWinItem = this._winPaytableItems[this._winPaytableItemsIndex++ % this._winPaytableItems.length];
        this._paytable.startBlink(currentWinItem.paytableItemData);
        this._lines.showLine(currentWinItem.reelsLine);
        this._lines.startBlink(currentWinItem.reelsLine);
    }

    private stopShowWin() {
        this._paytable.stopBlink();
        this._lines.showLine(ReelsLine.NONE);
        clearInterval(this._winInterval);
    }
}

export interface IWinItem {
    reelsLine: ReelsLine;
    paytableItemData: IPaytableItemData;
}
