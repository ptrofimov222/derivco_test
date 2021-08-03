import {TestersPanelReel} from "@app/screens/slot_machine_screen/testers_panel/TestersPanelReel";
import {GameData} from "@app/data/GameData";
import {Lines} from "@app/common/Lines";
import {Sprite} from "pixi.js";

export class TestersPanel extends Sprite {
    private _lines: Lines;
    private _panelReels: TestersPanelReel[] = [];

    constructor() {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    private createChildren() {
        let panelReel: TestersPanelReel;

        this._lines = new Lines(GameData.gameConfig.reelsLines, GameData.gameConfig.testersPanelLinesWidth, GameData.gameConfig.testersPanelLinesHeight, GameData.gameConfig.testersPanelBetweenLines);

        for (let reelIndex: number = 0; reelIndex < GameData.gameConfig.reelsCount; reelIndex++) {
            panelReel = new TestersPanelReel(reelIndex);
            this._panelReels.push(panelReel);
        }
    }

    private addChildren() {
        this.addChild(this._lines);
        this._panelReels.forEach((panelReel, reelIndex) => this.addChild(panelReel).x = reelIndex * GameData.gameConfig.testersPanelBetweenReels);

    }

    private initChildren() {
        this._lines.x = GameData.gameConfig.testersPanelLinesX;
        this._lines.y = GameData.gameConfig.testersPanelLinesY;
    }
}
