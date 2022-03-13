import * as PIXI from 'pixi.js';
import ArtBoardLayer, {ArtBoardModes} from './ArtBoardLayer';
export default class ArtBoardGroup extends PIXI.Container{
    constructor({width, height, mode}){
        super();
        this.artBoards = [];
        this.width = width;
        this.height = height;
        this.activeArtBoard = new ArtBoardLayer({width, height, mode});
        this.addChild(this.activeArtBoard);
        this.artBoards.push(this.activeArtBoard);
    }
    duplicateArtBoard(artBoard){
        const template = artBoard.editor.convertToTemplate();
        const board = new ArtBoardLayer({width: this.width, height: this.height});
        this.addChild(board);
        this.artBoards.push(board);
        board.setMode(ArtBoardModes.TEMPLATE);
        board.setTemplate(template);
        board.addContent({x: 0, y: 0});
    }
}