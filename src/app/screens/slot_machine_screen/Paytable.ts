import {PaytableItem} from "@app/screens/slot_machine_screen/paytable/PaytableItem";
import {BlinkingItemsHolder} from "@app/common/BlinkingItemsHolder";
import {IPaytableItemData} from "@app/data/game_data/IGameConfig";
import {GameData} from "@app/data/GameData";

export class Paytable extends BlinkingItemsHolder<PaytableItem, IPaytableItemData> {

    constructor() {
        super();

        this.createChildren();
        this.addChildren();
    }

    startBlink(paytableItemData: IPaytableItemData) {
        this.stopBlink();
        this.blinkOn = true;
        this.blinkItem = this.items.find(item => item.data === paytableItemData);
        this.blinkInterval = setInterval(this.blink.bind(this), GameData.gameConfig.paytableBlinkInterval);
        this.blink();
    }

    stopBlink() {
        super.stopBlink();
    }

    private createChildren() {
        let paytableItem: PaytableItem;
        for (let paytableItemData of GameData.gameConfig.paytable) {
            paytableItem = new PaytableItem(paytableItemData);
            this.items.push(paytableItem);
        }
    }

    private addChildren() {
        this.items.forEach((item, index) => {
            item.x = Math.floor(index / GameData.gameConfig.paytableColumns) * GameData.gameConfig.paytableBetweenColumnsX;
            item.y = index % GameData.gameConfig.paytableColumns * GameData.gameConfig.paytableBetweenColumnsY;
            this.addChild(item);
        });
    }
}
