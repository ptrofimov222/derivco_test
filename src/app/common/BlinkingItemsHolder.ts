import {Sprite} from "pixi.js";

export class BlinkingItemsHolder<BlinkingItemType extends Sprite, BlinkingItemData> extends Sprite {

    public items: BlinkingItemType[] = [];
    protected blinkItem: BlinkingItemType;
    protected blinkOn: boolean;
    protected blinkInterval: number;

    protected startBlink(itemData: BlinkingItemData) {
        itemData;
        throw new Error("Must Override");
    }

    protected stopBlink() {
        this.showBlinkItem();
        clearInterval(this.blinkInterval);
    }

    protected blink(): void {
        this.blinkOn = !this.blinkOn;
        this.blinkItem.alpha = this.blinkOn ? 1 : 0;
    }

    protected showBlinkItem() {
        if (this.blinkItem) {
            this.blinkItem.alpha = 1;
        }
    }
}
