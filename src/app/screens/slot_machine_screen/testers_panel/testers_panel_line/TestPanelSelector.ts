import {TestersPanelSelectorEvent} from "@app/screens/slot_machine_screen/testers_panel/testers_panel_line/selector/TestersPanelSelectorEvent";
import {TestPanelSelectorButton} from "@app/screens/slot_machine_screen/testers_panel/testers_panel_line/selector/TestPanelSelectorButton";
import {BlockBackgroundFactory} from "@app/common/BlockBackgroundFactory";
import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {SlotType} from "@app/data/game_data/IGameConfig";
import {LoaderService} from "@app/LoaderService";
import {GameData} from "@app/data/GameData";
import * as PIXI from "pixi.js";
import {Sprite} from "pixi.js";
import {TweenMax} from "gsap";
import {Pivot} from "@app/utils/Pivot";

export class TestPanelSelector extends Sprite {
    private _buttons: TestPanelSelectorButton[] = [];
    private _highlight: Sprite;
    private _background: PIXI.NineSlicePlane;

    constructor(
        private readonly reelIndex: number,
        public readonly reelsLine: ReelsLine
    ) {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    highlightSlotType(slotType: SlotType): void {
        if (slotType == SlotType.NONE) {
            this._highlight.visible = false;
            return;
        }
        let goX: number = this._buttons.find(item => item.slotType == slotType).x;
        if (this._highlight.visible) {
            TweenMax.to(this._highlight, GameData.gameConfig.testersPanelSelectorMoveMs, {x: goX});
        } else {
            this._highlight.x = goX;
            this._highlight.visible = true;
        }
    }

    private createButton(item: SlotType): void {
        let button: TestPanelSelectorButton = new TestPanelSelectorButton(this.onClick.bind(this, item), item);
        this._buttons.push(button);
    }

    private createChildren(): void {
        this.createButton(SlotType.RANDOM);
        GameData.gameConfig.reelData.forEach(item => {
            this.createButton(item)
        });

        this._background = BlockBackgroundFactory.create();
        this._highlight = new Sprite(LoaderService.getTexture("test_selector_highlight"));
    }

    private addChildren(): void {
        this.addChild(this._background);
        this.addChild(this._highlight);

        this._buttons.forEach(item => {
            this.addChild(item)
        });
    }

    private initChildren(): void {
        const step: number = 44;

        this._buttons.forEach((item, index) => {
            item.x = step * index;
        });

        Pivot.centerPivot(this._highlight);
        this._highlight.x = this._buttons[0].x;

        this._background.x = -19;
        this._background.y = -21;
        this._background.width = 259;
    }

    private onClick(slotType: SlotType): void {
        this.highlightSlotType(slotType);
        dispatchEvent(new MessageEvent(TestersPanelSelectorEvent.CHOOSE, {
            data: {
                reelsLine: this.reelsLine,
                reelIndex: this.reelIndex,
                slotType
            } as ITestPanelSelectorData
        }));
    }
}

export interface ITestPanelSelectorData {
    reelsLine: ReelsLine,
    reelIndex: number,
    slotType: SlotType
}
