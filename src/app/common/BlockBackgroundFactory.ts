import * as PIXI from "pixi.js";
import {GameData} from "@app/data/GameData";
import {LoaderService} from "@app/LoaderService";

export class BlockBackgroundFactory {

    static create(): PIXI.NineSlicePlane {
        let cornerSize: number = GameData.gameConfig.nineSliceBackgroundCornerSize;
        return new PIXI.NineSlicePlane(LoaderService.getTexture("test_selector_bg"), cornerSize, cornerSize, cornerSize, cornerSize);
    }
}
