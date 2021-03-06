import * as PIXI from 'pixi.js';
import InteractiveContainer from './InteractiveContainer';
import PointSetGroup from './PointSetGroup';
import VectorableGraphics from './VectorableGraphics';
import Draggable from './Draggable';
// import PointSet from './PointSet';
const ArtBoardModes = {
    MOVE: 0,
    PEN: 1,
    POLYGON: 2,
    TEMPLATE: 3
};
const LayerTypes = {
    UNSET: 0,
    PEN: 1,
    POLYGON: 2
};
export default class ArtBoardLayer extends InteractiveContainer{
    constructor({width, height, mode}){
        super();
        this.artBoardID = `art-board-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}`;
        this.currentTemplate = null;
        this.mode = mode ? mode : ArtBoardModes.PEN;
        this.layerType = LayerTypes.UNSET;
        this.editor = null;
        this.changeHandler = null;
        this.shapeContainer = new Draggable();
        this.shapeContainer.onStart(() => {
            this.editor.visible = false;
        });
        this.shapeContainer.onEnd(() => {
            this.shiftPoints(this.shapeContainer.x, this.shapeContainer.y);
            this.shapeContainer.x = 0;
            this.shapeContainer.y = 0;
            this.editor.visible = true;
        });
        this.shape = null;
        this.interactive = false;
        this.surfaceContainer = new InteractiveContainer();
        this.addChild(this.shapeContainer);
        const surface = new PIXI.Graphics();
        surface.beginFill(0xffffff, .001);
        surface.drawRect(0,0,width,height);
        this.addChild(this.surfaceContainer);
        this.surfaceContainer.addChild(surface);
        const downMethod = (e) => {
            const event = this.processEvent(e);
            console.log(this);
            switch(this.mode){
                case ArtBoardModes.MOVE:{
                    break;
                }
                case ArtBoardModes.PEN:
                case ArtBoardModes.TEMPLATE:{
                    console.log('pen');
                    this.layerType = LayerTypes.PEN;
                    if(!this.editor){
                        // this.editor = new PointSetGroup({x: event.x, y: event.y});
                        this.editor = this.penDown(event.x, event.y, 200, 200);
                        this.shape = new VectorableGraphics();
                        this.shapeContainer.addChild(this.shape);
                        this.editor.onChange((points) => {
                            if(points.length > 1){
                                this.shape.clear();
                                this.shape.beginFill(0xffffff, .001);
                                this.shape.lineStyle(1, 0x000000, 1);
                                points.forEach((item, index) => {
                                    const coords = item.getAnchorPositions();
                                    if(index === 0){
                                        this.shape.moveTo(coords.x, coords.y);
                                    }
                                    const shouldCloseShape = index === points.length - 1 && this.editor.closed;
                                    const nextIndex = shouldCloseShape ? 0 : index + 1;
                                    const nextCoords = points[nextIndex] ? points[nextIndex].getAnchorPositions() : null;
                                    if(nextCoords){
                                        this.shape.bezierCurveTo(coords.anchors.after.x, coords.anchors.after.y, nextCoords.anchors.before.x, nextCoords.anchors.before.y, nextCoords.x, nextCoords.y)
                                    }
                                    this.surfaceContainer.interactive = !this.editor.closed;
                                    
                                });
                                this.shape.endFill();
                            }
                            if(this.changeHandler){
                                console.log('art board change');
                                this.changeHandler({ shape: this.shape, editor: this.editor });
                            }
                            
                        });
                        this.addChild(this.editor);
                    }
                    else if(!this.editor.closed){
                        this.editor.addPoint(event.x, event.y);
                    }
                    if(this.mode !== ArtBoardModes.PEN){
                        this.editor.changeHandler(this.editor.points);
                    }
                    break;
                }
                case ArtBoardModes.POLYGON:{
                    if(!shape){
                        
                    }
                    break;
                }
            }
        }
        this.addContent = downMethod;
        this.surfaceContainer.on('mousedown', downMethod);
        this.surfaceContainer.on('touchstart', downMethod);
        // this.on('mousemove', this.move);
        // this.on('touchmove', this.move);
        // this.on('mouseup', this.up);
        // this.on('mouseupoutside', this.up);
        // this.on('touchend', this.up);
        // this.on('touchendoutside', this.up);
    }
    
    setMode(mode){
        this.mode = mode;
    }
    shiftPoints(x, y){
        this.editor.points.forEach(item => {
            item.x += x;
            item.y += y;
        });
        this.editor.changeHandler(this.editor.points);
    }
    penDown(x, y){
        let group = null;
        switch(this.mode){
            case ArtBoardModes.PEN:{
                group = new PointSetGroup({ x, y });
                break;
            }
            case ArtBoardModes.TEMPLATE:{
                group = new PointSetGroup({ x, y, template: this.currentTemplate });
            }
        }
        return group;
        
    }
    setTemplate(template){
        this.currentTemplate = template;
    }
    onChange(handler){
        this.changeHandler = handler;
    }
}
export {ArtBoardModes, LayerTypes};