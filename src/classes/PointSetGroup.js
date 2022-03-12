import * as PIXI from 'pixi.js';
import PointSet from './PointSet';
export default class PointSetGroup extends PIXI.Container {
    constructor(x, y){
        super();
        this.points = [];
        this.canAdd = true;
        this.addPoint(x, y);
    }
    addPoint(x, y){
        if(this.canAdd){
            const set = new PointSet();
            this.points.push(set);
            this.addChild(set);
            set.x = x;
            set.y = y;
            set.anchors.after.startDrag({x, y});
        }
    }
}