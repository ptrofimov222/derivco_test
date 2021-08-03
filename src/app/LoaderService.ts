import {GameData} from "@app/data/GameData";
import {Loader, Texture} from "pixi.js";

export class LoaderService {

    private static _loader: Loader;

    static loadGameResources(onResourcesLoaded: () => any, onProgress: Function): void {
        LoaderService._loader = new Loader();
        GameData.gameConfig.resources.forEach(value => {
            LoaderService._loader.add(value.substring(value.lastIndexOf("/") + 1, value.indexOf(".")), GameData.gameConfig.assetsDirectory + value);
        });

        LoaderService._loader.load(onResourcesLoaded);
        LoaderService._loader.onProgress.add(function (): void {
            onProgress(LoaderService._loader.progress);
        });
    }

    public static getTexture(textureName: string): Texture {
        return LoaderService._loader.resources[textureName].texture;
    }
}
