import Polygon from './Polygon';
import jt from 'jstrig';
export default class RegularPolygon extends Polygon{
    constructor(sides, radius, properties){
        super([...new Array(sides).keys()].map(item => {
            return {
                x: jt.orbit(0, radius, (360 / sides) * item, 'cos'),
                y: jt.orbit(0, radius, (360 / sides) * item, 'sin')
            }
        }), properties)
    }
}