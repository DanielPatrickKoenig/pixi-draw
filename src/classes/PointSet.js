import * as PIXI from 'pixi.js';
import Draggable from './Draggable';
import jt from 'jstrig';
export default class PointSet extends PIXI.Container{
    constructor(){
        super();
        this.setID = `${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}`;
        this.firstMove = true;
        this.mirrorDistance = true;
        this.mirrorAngle = true;
        this.changeHandler = null;
        this.selectedHandler = null;
        this.forceAnchorVisibility = {
            before: false,
            after: false
        };
        const anchorSize = 10;
        const pointSize = anchorSize * 2;
        this.twinProperties = {
            distance: 0,
            angle: 0,
            twin: null
        };
        this.anchors = {
            before: new Draggable(),
            after: new Draggable()
        }
        this.point = new Draggable(this);
        const pointGraphic = new PIXI.Graphics();
        pointGraphic.beginFill(0xcccccc);
        pointGraphic.drawRect(pointSize * -.5, pointSize * -.5, pointSize, pointSize);
        
        this.point.addChild(pointGraphic);
        this.addChild(this.point);
        this.point.onStart(() => {
            if(this.selectedHandler){
                this.selectedHandler(this);
            }
        });
        this.point.onMove(() => {
            if(this.changeHandler){
                this.changeHandler(this.getAnchorPositions());
            }
        });
        this.point.onEnd(() => {
            if(this.changeHandler){
                this.changeHandler(this.getAnchorPositions());
            }
        });
        Object.keys(this.anchors).forEach((item, index) => {
            const anchorGraphic = new PIXI.Graphics();
            anchorGraphic.beginFill(0x000000);
            anchorGraphic.drawRect(anchorSize * -.5, anchorSize * -.5, anchorSize, anchorSize);
            this.anchors[item].addChild(anchorGraphic);
            this.addChild(this.anchors[item]);
            this.anchors[item].onStart(() => {
                // console.log(this.anchors);
                this.twinProperties.twin = index === 0 ? this.anchors[Object.keys(this.anchors)[1]] : this.anchors[Object.keys(this.anchors)[0]];
                console.log(this.twinProperties.twin.x);
                if(this.mirrorAngle){
                    this.twinProperties.angle = jt.angle({x: 0, y: 0}, this.twinProperties.twin);
                    this.twinProperties.distance = jt.distance({x: 0, y: 0}, this.twinProperties.twin);
                }
                
            });
            this.anchors[item].onMove((x, y) => {
                if(this.mirrorAngle){
                    const angle = jt.angle({x: 0, y: 0}, {x, y});
                    const distance = this.mirrorDistance
                        ? jt.distance({x: 0, y: 0}, {x, y})
                        : this.twinProperties.distance;
                    this.twinProperties.twin.x = jt.orbit(0, distance, angle + 180, 'cos');
                    this.twinProperties.twin.y = jt.orbit(0, distance, angle + 180, 'sin');
                    // console.log(this.twinProperties);
                }
                if(this.changeHandler){
                    this.changeHandler(this.getAnchorPositions());
                }
            });
            this.anchors[item].onEnd(() => {
                const eitherMoved = this.anchors.before.hasMoved || this.anchors.after.hasMoved;
                const beforeMoved = this.firstMove ? eitherMoved : this.anchors.before.hasMoved;
                const afterMoved = this.firstMove ? eitherMoved : this.anchors.after.hasMoved;
                this.anchors.before.visible = beforeMoved || this.forceAnchorVisibility.before;
                this.anchors.after.visible = afterMoved || this.forceAnchorVisibility.after;
                this.anchors.before.hasMoved = beforeMoved;
                this.anchors.after.hasMoved = afterMoved;
                console.log(this.anchors.before.visible);
                this.firstMove = false;
                this.mirrorDistance = false;
                if(this.changeHandler){
                    this.changeHandler(this.getAnchorPositions());
                }
            });
        });
        
    }
    getAnchorPositions(){
        return {
            x: this.x,
            y: this.y,
            anchors: {
                before: {
                    x: this.x + this.anchors.before.x,
                    y: this.y + this.anchors.before.y
                },
                after: {
                    x: this.x + this.anchors.after.x,
                    y: this.y + this.anchors.after.y
                }
            }
        };
    }
    onChange(handler){
        this.changeHandler = handler;
    }
    onSelected(handler){
        this.selectedHandler = handler;
    }
    
}