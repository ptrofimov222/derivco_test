import {PaytableSlotIcon} from "@app/screens/slot_machine_screen/paytable/paytable_item/PaytableSlotIcon";
import {IPaytableItemData} from "@app/data/game_data/IGameConfig";
import {GameData} from "@app/data/GameData";
import {Lines} from "@app/common/Lines";
import {Pivot} from "@app/utils/Pivot";
import * as PIXI from "pixi.js";
import {Sprite, Text} from "pixi.js";
import {Zero} from "@app/utils/Zero";
import {BlockBackgroundFactory} from "@app/common/BlockBackgroundFactory";

export class PaytableItem extends Sprite {

    private _background: PIXI.NineSlicePlane;
    private _lines: Lines;
    private _winText: Text;
    private _combinations: number[][];
    private _combinationIndex: number = 0;
    private _slotIcons: PaytableSlotIcon[] = [];

    constructor(
        public readonly data: IPaytableItemData
    ) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();

        if (this.data.slotTypes.length == 1) {
            return;
        }

        this.nextSymbols();
        setInterval(() => this.nextSymbols(), GameData.gameConfig.paytableComplexWinChangeTimeoutMs);
    }

    private createChildren() {
        let slotIcon: PaytableSlotIcon;
        let combinationsCount: number = Math.pow(this.data.slotTypes.length, GameData.gameConfig.reelsCount);
        let combinations: string[] = [];
        this._background = BlockBackgroundFactory.create();

        this._winText = new Text(this.data.win.toString(), {
            fontFamily: GameData.gameConfig.defaultFont,
            fontSize: GameData.gameConfig.paytableWinTextFontSize,
            fill: GameData.gameConfig.paytableWinTextFontColor,
            align: 'center',
        });

        this._lines = new Lines(this.data.reelsLines, GameData.gameConfig.paytableLineWidth, GameData.gameConfig.paytableLineHeight, GameData.gameConfig.paytableBetweenLines);

        for (let reelIndex: number = 0; reelIndex < GameData.gameConfig.reelsCount; reelIndex++) {
            slotIcon = new PaytableSlotIcon(this.data.slotTypes);
            this._slotIcons.push(slotIcon);
        }

        for (let combinationIndex: number = 1; combinationIndex < combinationsCount; combinationIndex++) {
            combinations.push(Zero.addLeadingZero(combinationIndex.toString(this.data.slotTypes.length), GameData.gameConfig.reelsCount));
        }
        this._combinations = combinations.filter(
            item => !this.allSymbolsSame(item)
        ).map(
            item => item.split("").map(item => parseInt(item))
        );
    }

    private addChildren() {
        this.addChild(this._background);
        this.addChild(this._lines);
        this.addChild(this._winText);
        this._slotIcons.forEach(icon => this.addChild(icon))
    }

    private initChildren() {
        this._background.x = GameData.gameConfig.paytableBackgroundX;
        this._background.y = GameData.gameConfig.paytableBackgroundY;
        this._background.width = GameData.gameConfig.paytableBackgroundWidth;
        this._lines.x = GameData.gameConfig.paytableLinesX;
        this._lines.pivot.y = (this.data.reelsLines.length - 1) * .5 * (GameData.gameConfig.paytableLineHeight * .5 + GameData.gameConfig.paytableBetweenLines);

        Pivot.centerPivot(this._winText);
        this._winText.x = GameData.gameConfig.paytableWinTextX;

        this._slotIcons.forEach((icon, index) => icon.x = index * GameData.gameConfig.paytableBetweenSymbols)
    }

    private allSymbolsSame(item: string) {
        let split: string[] = item.split("");
        return split.every(char => char == split[0]);
    }

    private nextSymbols() {
        let combinationIndex: number = this._combinationIndex++ % this._combinations.length;
        this._slotIcons.forEach((icon, index) => icon.setIcon(this.data.slotTypes[this._combinations[combinationIndex][index]]))
    }
}
