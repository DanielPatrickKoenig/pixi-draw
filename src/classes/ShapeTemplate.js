export default class ShapeTemplate{
    constructor(coords){
        this.coords = coords ? coords : [];
    }
    addPoint(point, before, after){
        this.coords.push({
            x: point.x,
            y: point.y,
            anchors: {
                before,
                after
            }
        });
    }
}