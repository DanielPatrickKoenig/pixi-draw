import * as PIXI from 'pixi.js';
import PointSet from './PointSet';
import ShapeTemplate from './ShapeTemplate';
export default class PointSetGroup extends PIXI.Container {
    constructor({ x, y, template }){
        super();
        this.points = [];
        this.changeHandler = null
        this.canAdd = true;
        this.closed = false;
        this.isComplete = template;
        if(!this.isComplete){
            this.addPoint(x, y);
        }
        else{
            this.createFromTemplate(template, x, y);
        }
        
    }
    addPoint(x, y){
        let set = null;
        if(this.canAdd){
            set = new PointSet();
            this.points.push(set);
            this.addChild(set);
            set.x = x;
            set.y = y;
            if(!this.isComplete){
                set.anchors.after.startDrag({x, y});
            }
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
        return set;
    }
    onChange(handler){
        this.changeHandler = handler;
    }
    createFromTemplate(template, _x, _y){
        const x = _x ? _x : 0;
        const y = _y ? _y : 0;
        template.coords.forEach(item => {
            const point = this.addPoint(item.x + x, item.y + y);
            if(item.anchors.before.x !== 0 || item.anchors.before.y !== 0 || item.anchors.after.x !== 0 || item.anchors.after.y !== 0){
                point.anchors.after.hasMoved = true;
                point.anchors.after.x = item.anchors.after.x;
                point.anchors.after.y = item.anchors.after.y;
                point.anchors.before.x = item.anchors.before.x;
                point.anchors.before.y = item.anchors.before.y;
            }
            
        });
        this.points.forEach(item => item.anchors.after.endDrag());
        this.closed = true;
        this.canAdd = false;
    }
    convertToTemplate(){
        const template = new ShapeTemplate();
        this.points.forEach(item => {
            template.addPoint({x: item.x, y: item.y}, {x: item.anchors.before.x, y: item.anchors.before.y}, {x: item.anchors.after.x, y: item.anchors.after.y})
        });
        return template;
    }
}