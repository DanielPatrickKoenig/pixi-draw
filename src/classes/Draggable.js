import InteractiveContainer from './InteractiveContainer';
export default class Draggable extends InteractiveContainer{
    constructor(dragTarget, supressMobile){
        super();
        this.dragging = false;
        this.offset = { x: 0, y: 0 };
        this.dragTarget = dragTarget ? dragTarget : this;
        this.startHandler = null;
        this.moveHandler = null;
        this.endHandler = null;
        this.on('mousedown', this.startDrag);
        if(!supressMobile){
            this.on('touchstart', this.startDrag);
        }
        this.on('mousemove', this.doDrag);
        if(!supressMobile){
            this.on('touchmove', this.doDrag);
        }
        this.on('mouseup', this.endDrag);
        this.on('mouseupoutside', this.endDrag);
        if(!supressMobile){
            this.on('touchend', this.endDrag);
            this.on('touchendoutside', this.endDrag);
        }
    }
    startDrag(e){
        this.dragging = true;
        const event = this.processEvent(e);
        this.offset = { x: event.x - this.dragTarget.x, y: event.y - this.dragTarget.y };
        if(this.startHandler){
            this.startHandler(this.dragTarget.x, this.dragTarget.y);
        }
    }
    doDrag(e){
        if(this.dragging){
            const event = this.processEvent(e);
            this.dragTarget.x = event.x - this.offset.x;
            this.dragTarget.y = event.y - this.offset.y;
            if(this.moveHandler){
                this.moveHandler(this.dragTarget.x, this.dragTarget.y);
            }
        }
    }
    endDrag(){
        this.dragging = false;
        if(this.endHandler){
            this.endHandler(this.dragTarget.x, this.dragTarget.y);
        }
    }
    onStart(handler){
        this.startHandler = handler;
    }
    onMove(handler){
        this.moveHandler = handler;
    }
    onEnd(handler){
        this.endHandler = handler;
    }

}
