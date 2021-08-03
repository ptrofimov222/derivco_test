import {GameDataEvent} from "@app/data/game_data/GameDataEvent";
import {TextInput} from "pixi-textinput-v5";
import {GameData} from "@app/data/GameData";
import {Sprite} from "pixi.js";

export class CoinsBlock extends Sprite {

    private _text: TextInput;
    private _allowedKeys: string[] = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0",
        "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7", "Numpad8", "Numpad9", "Numpad0",
        "Backspace", "Delete", "ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight", "ArrowLeft", "ArrowRight"];

    constructor() {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();

        addEventListener(GameDataEvent.BALANCE_CHANGED, this.updateBalance.bind(this));
        this.updateBalance();
    }

    protected addChildren() {
        this.addChild(this._text);
    }

    protected initChildren() {
        let textInput: HTMLTextAreaElement = this._text._dom_input as HTMLTextAreaElement;
        textInput.addEventListener('input', () => {
            let joined: string = textInput.value.split("").filter(char => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(char) > -1).join("");
            textInput.value = joined == "" ? "0" : joined;
            let inputValue: number = parseInt(textInput.value);
            GameData.setBalance(Math.min(inputValue, GameData.gameConfig.maxInputBalance));
        });
        textInput.addEventListener('keydown', (e: KeyboardEvent) => {
            this._allowedKeys.indexOf(e.code) == -1 && e.preventDefault();
        });
    }

    private createChildren() {
        this._text = new TextInput({
            multiline: false,
            box: {
                default: {fill: GameData.gameConfig.coinsBlockBoxFill, rounded: GameData.gameConfig.coinsBlockBoxRounded},
            }, input: {
                multiline: false,
                fontSize: GameData.gameConfig.coinsBlockFontSize + "px",
                fontFamily: GameData.gameConfig.defaultFont,
                padding: GameData.gameConfig.coinsBlockPadding + "px",
                width: GameData.gameConfig.coinsBlockWidth + "px",
                height: GameData.gameConfig.coinsBlockHeight + "px",
                color: GameData.gameConfig.coinsBlockFontColor,
                textAlign: "right",
                rows: 1,
            }
        });
    }

    private updateBalance(): void {
        this._text.text = GameData.balance.toString();
    }
}
