import VectorableGraphics from './VectorableGraphics';
import jt from 'jstrig';
export default class Polygon extends VectorableGraphics{
    constructor(points, { fill, stroke, strokeWidth, fillOpacity, strokeOpacity, radius }){
        super();
        this.points = points;
        this.props = {
            fill,
            stroke,
            strokeWidth,
            strokeOpacity,
            fillOpacity,
            radius
        };
        // console.log(jt.distance({x: 100, y: 100}, {x: 200, y: 300}))
        this.curveEnd = this.getCurveEnd(0, 1);
        this.renderShape();
        
    }
    renderShape(){
        this.redraw();
        // this.clear();
        // this.beginFill(this.props.fill,this.props.fillOpacity);
        // this.lineStyle(this.props.strokeWidth,this.props.stroke,this.props.strokeOpacity);
        // this.drawRect(0, 0, 200, 400);
        // this.endFill();
    }
    redraw(){
        const anchorJump = .75;
        this.clear();
        this.beginFill(this.props.fill,this.props.fillOpacity);
        this.lineStyle(this.props.strokeWidth,this.props.stroke,this.props.strokeOpacity);
        this.moveTo(this.curveEnd.x,this.curveEnd.y);

        let curveEndOld = null;
        let halfCurve = null;
        let nextPoint = null;
        let arch1 = null;
        let anchor1 = null;
        let arch2 = null;
        let anchor2 = null;
        let archTop = null;
        for(let i = 1; i < this.points.length; i++) {
            curveEndOld = this.curveEnd;
            this.curveEnd = this.getCurveEnd(i,i-1);
            halfCurve = {x:curveEndOld.x+((this.curveEnd.x-curveEndOld.x)/2), y:curveEndOld.y+((this.curveEnd.y-curveEndOld.y)/2)};
            this.quadraticCurveTo(curveEndOld.x,curveEndOld.y,halfCurve.x,halfCurve.y);
            this.quadraticCurveTo(this.curveEnd.x,this.curveEnd.y,this.curveEnd.x,this.curveEnd.y);
            if(i<this.points.length-1){
                nextPoint = i+1;
            }
            else{
                nextPoint = 0;
            }
            arch1 = {x:this.points[i].x+((this.curveEnd.x-this.points[i].x)/2), y:this.points[i].y+((this.curveEnd.y-this.points[i].y)/2)};
			anchor1 = {x:this.points[i].x+(((this.curveEnd.x-this.points[i].x)/2)*anchorJump), y:this.points[i].y+(((this.curveEnd.y-this.points[i].y)/2)*anchorJump)};
            this.curveEnd = this.getCurveEnd(i,nextPoint);

            arch2 = {x:this.points[i].x+((this.curveEnd.x-this.points[i].x)/2), y:this.points[i].y+((this.curveEnd.y-this.points[i].y)/2)};
            anchor2 = {x:this.points[i].x+(((this.curveEnd.x-this.points[i].x)/2)*anchorJump), y:this.points[i].y+(((this.curveEnd.y-this.points[i].y)/2)*anchorJump)};
            archTop = {x:arch1.x+((arch2.x-arch1.x)/2), y:arch1.y+((arch2.y-arch1.y)/2)};

            this.quadraticCurveTo(arch1.x,arch1.y,archTop.x,archTop.y);
			this.quadraticCurveTo(arch2.x,arch2.y,this.curveEnd.x,this.curveEnd.y);
        };
        this.finalizeCurve(this.curveEnd);
    }
    finalizeCurve(_ce){
        const _curveEndOld = _ce;
        let _curveEnd = this.getCurveEnd(0,this.points.length-1);
        const _halfCurve = {x:_curveEndOld.x+((_curveEnd.x-_curveEndOld.x)/2), y:_curveEndOld.y+((_curveEnd.y-_curveEndOld.y)/2)};
        this.quadraticCurveTo(_curveEndOld.x,_curveEndOld.y,_halfCurve.x,_halfCurve.y);
        this.quadraticCurveTo(_curveEnd.x,_curveEnd.y,_curveEnd.x,_curveEnd.y);
        const _arch1 = {x:this.points[0].x+((_curveEnd.x-this.points[0].x)/2), y:this.points[0].y+((_curveEnd.y-this.points[0].y)/2)};
        _curveEnd = this.getCurveEnd(0,1);
        const _arch2 = {x:this.points[0].x+((_curveEnd.x-this.points[0].x)/2), y:this.points[0].y+((_curveEnd.y-this.points[0].y)/2)};
        const _archTop = {x:_arch1.x+((_arch2.x-_arch1.x)/2), y:_arch1.y+((_arch2.y-_arch1.y)/2)};
        this.quadraticCurveTo(_arch1.x,_arch1.y,_archTop.x,_archTop.y);
        this.quadraticCurveTo(_arch2.x,_arch2.y,_curveEnd.x,_curveEnd.y);
        this.endFill();
    }
    getCurveEnd(a, b){
        let tmpRad = this.props.radius;
        const radStartDistance = jt.distance(this.points[a],this.points[b]);
        if(tmpRad>radStartDistance/2){
            tmpRad = radStartDistance/2;
        }
        var radStartAngle = jt.angle(this.points[a],this.points[b]);
        return {
            x: jt.orbit(this.points[a].x, tmpRad, radStartAngle, "cos"),
            y: jt.orbit(this.points[a].y, tmpRad, radStartAngle, "sin"),
            radius: tmpRad
        };
    }
}