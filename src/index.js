import './index.css'
import * as PIXI from 'pixi.js';
import Polygon from './classes/Polygon';
import RegularPolygon from './classes/RegularPolygon';
import Draggable from './classes/Draggable';
import PointSet from './classes/PointSet';
import ArtBoardLayer from './classes/ArtBoardLayer';
import ShapeTemplate from './classes/ShapeTemplate';
import ArtBoardGroup from './classes/ArtBoardGroup';
window.onload = function() {
  console.log('loaded');
  const app = new PIXI.Application({
    view: document.querySelector('canvas'),
    width: 800,
    height: 600,
    transparent: true,
  });
  /*
  const shapeProperties = {fill: 0xcc0000, stroke: 0x000000, strokeWidth: 0, strokeOpacity: 0, fillOpacity: 1, radius: 30};
  const p = new Polygon([{x: 30, y: 20}, {x: 30, y: 200}, {x: 80, y: 200}, {x: 80, y: 70}], shapeProperties);
  app.stage.addChild(p);
  console.log(p.vectorize());

  const d1 = new Draggable();
  const r = new RegularPolygon(6, 150, shapeProperties);
  d1.addChild(r);
  d1.x = 250;
  d1.y = 250;
  app.stage.addChild(d1);
  console.log(r.vectorize());

  const r2 = new RegularPolygon(8, 30, shapeProperties);
  // app.stage.addChild(r2);
  // r2.x = 450;
  // r2.y = 250;

  const d2 = new Draggable();
  d2.x = 450;
  d2.y = 250;
  d2.addChild(r2)
  app.stage.addChild(d2);
  //*/

  // const ps = new PointSet();
  // ps.x = 100;
  // ps.y = 100;
  // app.stage.addChild(ps);
  // ps.onChange(data => {
  //   console.log(data);
  // });

  /*
  const artBoardLayer = new ArtBoardLayer({width: 800, height: 600});
  const squareTemplate = new ShapeTemplate();
  squareTemplate.addPoint({x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0});
  squareTemplate.addPoint({x: 100, y: 0}, {x: 0, y: 0}, {x: 0, y: 0});
  squareTemplate.addPoint({x: 100, y: 150}, {x: 0, y: 0}, {x: 0, y: 0});
  squareTemplate.addPoint({x: 0, y: 150}, {x: 0, y: 0}, {x: 0, y: 0});

  const circleTemplate = new ShapeTemplate();
  circleTemplate.addPoint({x: 50, y: 0}, {x: -25, y: 0}, {x: 25, y: 0});
  circleTemplate.addPoint({x: 100, y: 50}, {x: 0, y: -25}, {x: 0, y: 25});
  circleTemplate.addPoint({x: 50, y: 100}, {x: 25, y: 0}, {x: -25, y: 0});
  circleTemplate.addPoint({x: 0, y: 50}, {x: 0, y: 25}, {x: 0, y: -25});

  artBoardLayer.setTemplate(circleTemplate);
  app.stage.addChild(artBoardLayer);
  */

  const group = new ArtBoardGroup({width: 800, height: 600});
  app.stage.addChild(group);
  document.querySelector('#dupe').addEventListener('click', () => {
    group.duplicateArtBoard(group.activeArtBoard);
  })



}
