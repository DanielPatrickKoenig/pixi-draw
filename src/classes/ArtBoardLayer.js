import * as PIXI from 'pixi.js';
import InteractiveContainer from './InteractiveContainer';
import PointSetGroup from './PointSetGroup';
const CreationTypes = {
    PEN: 1,
    POLYGON: 2
};
const ArtBoardModes = {
    MOVE: 0,
    PEN: 1,
    POLYGON: 2
};
const LayerTypes = {
    UNSET: 0,
    PEN: 1,
    POLYGON: 2
};
export default class ArtBoardLayer extends InteractiveContainer{
    constructor({width, height, mode}){
        super();
        this.mode = mode ? mode : ArtBoardModes.PEN;
        this.layerType = LayerTypes.UNSET;
        this.editor = null;
        this.shape = null;
        this.interactive = false;
        this.surfaceContainer = new InteractiveContainer();
        const surface = new PIXI.Graphics();
        surface.beginFill(0xcc0000);
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
                case ArtBoardModes.PEN:{
                    console.log('pen');
                    this.layerType = LayerTypes.PEN;
                    if(!this.editor){
                        this.editor = new PointSetGroup(event.x, event.y);
                        this.addChild(this.editor);
                    }
                    else{
                        this.editor.addPoint(event.x, event.y);
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
}