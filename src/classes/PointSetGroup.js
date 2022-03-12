import * as PIXI from 'pixi.js';
import PointSet from './PointSet';
export default class PointSetGroup extends PIXI.Container {
    constructor(x, y){
        super();
        this.points = [];
        this.changeHandler = null;
        this.canAdd = true;
        this.closed = false;
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
            set.onChange(() => {
                if(this.changeHandler){
                    this.changeHandler(this.points);
                }
            });
            set.onSelected((pointSet) => {
                console.log('onSelected called');
                if(this.points.length > 1 && pointSet.setID === this.points[0].setID && !this.closed){
                    this.closed = true;
                    this.changeHandler(this.points);
                }
            });
        }
    }
    onChange(handler){
        this.changeHandler = handler;
    }
}