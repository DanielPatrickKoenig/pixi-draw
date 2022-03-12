import * as PIXI from 'pixi.js';
export default class VectorableGraphics extends PIXI.Graphics {
    constructor(){
        super();
        this.directives = [];
    }
    addDirective(prefix, values){
        this.directives.push(`${prefix} ${values.join(' ')}`);
    }
    clear(){
        
        this.directives = [];
        super.clear();
    }
    moveTo(x, y){
        this.addDirective('M', [x, y]);
        super.moveTo(x, y);

    }
    lineTo(x, y){
        this.addDirective('L', [x, y]);
        super.lineTo(x, y);

    }
    quadraticCurveTo(cx, cy, dx, dy){
        this.addDirective('Q', [cx, cy, dx, dy]);
        super.quadraticCurveTo(cx, cy, dx, dy);

    }
    bezierCurveTo(c1x, c1y, c2x, c2y, dx, dy){
        this.addDirective('C', [c1x, c1y, c2x, c2y, dx, dy]);
        super.bezierCurveTo(c1x, c1y, c2x, c2y, dx, dy);
    }
    endFill(){
        this.addDirective('Z', []);
        super.endFill();
    }
    vectorize(){
        return this.directives.join('');
    }
}