import {Sprite} from "pixi.js";

export class Pivot{

    static centerPivot(sprite:Sprite){
        sprite.pivot.x = Math.floor(sprite.width * .5);
        sprite.pivot.y = Math.floor(sprite.height * .5);
    }
}
