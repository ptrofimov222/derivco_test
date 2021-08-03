import {TestersPanelSelectorEvent} from "@app/screens/slot_machine_screen/testers_panel/testers_panel_line/selector/TestersPanelSelectorEvent";
import {ITestPanelSelectorData} from "@app/screens/slot_machine_screen/testers_panel/testers_panel_line/TestPanelSelector";
import {ReelsEvent} from "@app/screens/slot_machine_screen/reels/ReelsEvent";
import {Slots} from "@app/screens/slot_machine_screen/reels/reel/Slots";
import {ReelsLine} from "@app/screens/slot_machine_screen/Reels";
import {SlotType} from "@app/data/game_data/IGameConfig";
import {SlotUtils} from "@app/utils/SlotUtils";
import {Container, Graphics} from "pixi.js";
import {Linear, Sine, TweenMax} from "gsap";
import {GameData} from "@app/data/GameData";

export class Reel extends Container {

    slots: Slots;
    private _maskGraphics: Graphics;
    private _slotType: SlotType = SlotType.RANDOM;
    private _reelsLine: ReelsLine = ReelsLine.RANDOM;

    constructor(
        private readonly reelIndex: number,
        private readonly reelData: SlotType[]
    ) {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();

        addEventListener(TestersPanelSelectorEvent.CHOOSE, this.onTestersPanelSelectorEvent.bind(this));
    }

    private _stopSlotType: SlotType;

    public get stopSlotType(): SlotType {
        return this._stopSlotType;
    }

    private _stopReelsLine: ReelsLine;

    public get stopReelsLine(): ReelsLine {
        return this._stopReelsLine;
    }

    beginStart() {
        TweenMax.to(this.slots, GameData.gameConfig.beginStartDuration, {
            slotsPosition: this.slots.slotsPosition - GameData.gameConfig.beginStartOffsetY,
            ease: Sine.easeOut,
            onComplete: () => {
                this.start();
            }
        });
    }

    start() {
        this._stopSlotType = this._slotType == SlotType.RANDOM ? SlotUtils.getRandomSlotType() : this._slotType;
        this._stopReelsLine = this._reelsLine == ReelsLine.RANDOM ? SlotUtils.getRandomReelsLine() : this._reelsLine;
        this.slots.makeBlured();
        TweenMax.to(this.slots, GameData.gameConfig.rotateDuration + this.reelIndex * GameData.gameConfig.betweenReelsStopsDuration, {
            slotsPosition: this.slots.slotsPosition + GameData.gameConfig.rotateSlotsPass + this.reelIndex * GameData.gameConfig.betweenReelsStopsSlotsPass,
            ease: Linear.easeNone,
            onComplete: () => {
                this.stop(this._stopSlotType, this._stopReelsLine);
            }
        });
    }

    stop(slotType: SlotType, reelsLine: ReelsLine) {
        let positionOffset: number;
        switch (reelsLine) {
            case ReelsLine.LINE_3:
                positionOffset = 0;
                break;
            case ReelsLine.LINE_2:
                positionOffset = -.5;
                break;
            case ReelsLine.LINE_1:
                positionOffset = -1;
                break;
        }
        let endPosition: number = (Math.ceil(this.slots.slotsPosition / GameData.reelLength) + GameData.gameConfig.stopReelsPass) * GameData.reelLength + SlotUtils.positionBySlotType(slotType) + positionOffset;
        TweenMax.to(this.slots, GameData.gameConfig.stopDuration, {
            slotsPosition: endPosition,
            ease: Linear.easeNone,
            onComplete: () => {
                this.damping();
            }
        });
    }

    private onTestersPanelSelectorEvent(event: MessageEvent): void {
        let data: ITestPanelSelectorData = event.data;
        if (data.reelIndex != this.reelIndex) {
            return;
        }
        if (data.slotType == SlotType.RANDOM) {
            this._slotType = SlotType.RANDOM;
            this._reelsLine = ReelsLine.RANDOM;
            return;
        }
        this._slotType = data.slotType;
        this._reelsLine = data.reelsLine;
    }

    private createChildren() {
        this._maskGraphics = new Graphics();
        this.slots = new Slots(this.reelData);
    }

    private damping() {
        this.slots.makeBlured(false);
        this.slots.dampingValue = GameData.gameConfig.dampingStartValue;
        TweenMax.to(this.slots, GameData.gameConfig.dampingDuration, {
            dampingValue: 0,
            ease: Linear.easeNone,
            onComplete: () => {
                if (this.reelIndex == GameData.gameConfig.reelsCount - 1) {
                    dispatchEvent(new Event(ReelsEvent.STOPPED));
                }
            }
        });
    }

    private addChildren() {
        this.addChild(this.slots);
        this.addChild(this._maskGraphics);
    }

    private initChildren() {
        this._maskGraphics.beginFill(0xffffff);
        this._maskGraphics.drawRect(0, 0, GameData.gameConfig.slotWidth, GameData.gameConfig.slotHeight * 2);
        this._maskGraphics.endFill();

        this.slots.y = GameData.gameConfig.slotHeight * 2;
        this.slots.mask = this._maskGraphics;
    }
}
