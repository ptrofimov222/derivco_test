import {LoaderService} from "@app/LoaderService";
import {Screens} from "@app/Screens";
import {Application, Text} from "pixi.js";
import * as WebFont from "webfontloader";
import {GameData} from "@app/data/GameData";
import {Pivot} from "@app/utils/Pivot";

export class Game {

    static app: Application;
    static scale: number;
    private static screens: Screens;
    private static width: number;
    private static height: number;
    private static ratio: number;
    private static percents: Text;

    constructor() {
        console.log("VERSION:0.046");
        this.createGame();
    }

    private static onWindowResize(): void {
        let ratio = Game.ratio;
        let w: number;
        let h: number;

        if (window.innerWidth / window.innerHeight >= ratio) {
            w = window.innerHeight * ratio;
            h = window.innerHeight;
        } else {
            w = window.innerWidth;
            h = window.innerWidth / ratio;
        }

        const parent = Game.app.view.parentElement;
        parent.style.height = window.innerHeight + "px";

        Game.width = parent.clientWidth;
        Game.height = parent.clientHeight;
        Game.scale = w / GameData.gameConfig.gameInitialWidth;
        Game.app.renderer.resize(Game.width, Game.height);

        if (Game.screens != null) {
            Game.screens.x = Math.floor(Game.width * .5);
            Game.screens.y = Math.floor((Game.height - h) * .5);
            Game.screens.resize();
        }
        if (Game.percents != null) {
            Game.percents.x = Math.floor(Game.width * .5);
            Game.percents.y = Math.floor(Game.height * .5);
        }
    }

    private static updatePercentsPivot(): void {
        Pivot.centerPivot(Game.percents);
    }

    private static onProgress(progress: number): void {
        Game.percents.text = Math.round(progress) + "%";
        Game.updatePercentsPivot();
    }

    private static createChildren(): void {
        Game.screens = new Screens();
        Game.app.renderer.plugins.interaction.autoPreventDefault = false;
    }

    private static addChildren(): void {
        Game.app.stage.addChild(Game.screens);
    }

    private async createGame(): Promise<void> {
        await GameData.init();
        Game.ratio = GameData.gameConfig.gameInitialWidth / GameData.gameConfig.gameInitialHeight;
        WebFont.load(
            {
                active: this.prestart.bind(this),
                fontloading: htmlRenderFont,
                google:
                    {
                        families: [GameData.gameConfig.defaultFont + ":400:latin", GameData.gameConfig.defaultFont],
                    }
            });

        function htmlRenderFont() {
            let p = document.createElement('p');
            p.style.fontFamily = GameData.gameConfig.defaultFont;
            p.style.fontSize = "0px";
            p.style.visibility = "hidden";
            p.innerHTML = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

            document.body.appendChild(p);
            console.log("Font rendering");
        }
    }

    private prestart(): void {
        console.log("Rendering fonts");
        setTimeout(this.start.bind(this), 500);
    }

    private async start(): Promise<void> {
        console.log("Start");
        Game.app = new Application({
            backgroundColor: 0x6b148f,
            //transparent: true,
            antialias: true,
            resolution: 1
        });
        console.log("devicePixelRatio", window.devicePixelRatio);
        Game.app.view.style.display = "block";
        document.body.appendChild(Game.app.view);
        LoaderService.loadGameResources(this.onResourcesLoaded.bind(this), Game.onProgress.bind(this));
        Game.app.renderer.autoDensity = true;
        Game.percents = new Text("", {
            fontFamily: GameData.gameConfig.defaultFont,
            fontSize: 100,
            fill: 0xffffff,
            align: 'center',
        });
        Game.app.stage.addChild(Game.percents);
        Game.updatePercentsPivot();
        window.addEventListener("resize", Game.onWindowResize.bind(Game));
        Game.onWindowResize();
    }

    private async onResourcesLoaded(): Promise<void> {
        Game.createChildren();
        Game.addChildren();
        this.initChildren();

        Game.app.stage.removeChild(Game.percents);

        Game.onWindowResize();
    }

    private initChildren(): void {

    }
}

new Game();
