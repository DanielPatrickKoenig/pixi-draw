import * as PIXI from 'pixi.js';
export default class InteractiveContainer extends PIXI.Container{
    constructor(){
        super();
        this.interactive = true;
    }
    processEvent (e) {
        return e.data ? {x: e.data.global.x, y: e.data.global.y} : e;
    }
}