import {IGameConfig} from "@app/data/game_data/IGameConfig";
import {GameDataEvent} from "@app/data/game_data/GameDataEvent";

export class GameData {

    static reelLength: number;
    static gameConfig: IGameConfig;
    static balance: number;

    static async init(): Promise<void> {
        let response: Response = await fetch("config/main_config.json");
        let text: string = await response.text();
        GameData.gameConfig = JSON.parse(text);
        console.log(GameData.gameConfig);
        GameData.balance = GameData.gameConfig.startBalance;
        GameData.reelLength = GameData.gameConfig.reelData.length;
    }

    static setBalance(value: number): void {
        GameData.balance = value;
        dispatchEvent(new Event(GameDataEvent.BALANCE_CHANGED));
    }
}
