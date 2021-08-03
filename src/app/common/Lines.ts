import {BlinkingItemsHolder} from "@app/common/BlinkingItemsHolder";
import {ReelsLine} from "../screens/slot_machine_screen/Reels";
import {GameData} from "@app/data/GameData";
import {Line} from "@app/common/Line";

export class Lines extends BlinkingItemsHolder<Line, ReelsLine> {

    constructor(reelsLines: ReelsLine[], lineWidth: number, lineHeight: number, betweenLines: number) {
        super();

        let line: Line;
        reelsLines.forEach((item, index) => {
            line = new Line(item, lineWidth, lineHeight);
            this.items.push(line);
            this.addChild(line).y = index * betweenLines;
        });
    }

    showLine(reelsLine: ReelsLine): void {
        this.items.forEach(line => line.visible = line.reelsLine === reelsLine);
    }

    startBlink(itemData: ReelsLine) {
        this.stopBlink();
        this.blinkOn = true;
        this.blinkItem = this.items.find(item => item.reelsLine === itemData);
        this.blinkInterval = setInterval(this.blink.bind(this), GameData.gameConfig.linesBlinkingTimeoutMs);
        this.blink();
    }

    stopBlink() {
        super.stopBlink();
    }
}
