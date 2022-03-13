import * as PIXI from 'pixi.js';
import ArtBoardLayer, {ArtBoardModes} from './ArtBoardLayer';
export default class ArtBoardGroup extends PIXI.Container{
    constructor({width, height, mode}){
        super();
        this.changeHandler = null;
        this.artBoards = [];
        this.width = width;
        this.height = height;
        this.mode = mode;
        this.activeArtBoard = new ArtBoardLayer({width, height, mode});
        this.addChild(this.activeArtBoard);
        this.artBoards.push(this.activeArtBoard);
        this.activeArtBoard.onChange(() => {
            if(this.changeHandler){
                this.changeHandler(this.artBoards);
            }
        });
    }
    duplicateArtBoard(artBoard){
        const template = artBoard.editor.convertToTemplate();
        const board = this.addArtBoard();
        board.setMode(ArtBoardModes.TEMPLATE);
        board.setTemplate(template);
        board.addContent({x: 0, y: 0});
        return board;
    }
    addArtBoard(){
        const board = new ArtBoardLayer({width: this.width, height: this.height});
        this.addChild(board);
        this.artBoards.push(board);
        board.onChange(() => {
            if(this.changeHandler){
                this.changeHandler(this.artBoards);
            }
        });
        return board;
    }
    onChange(handler){
        this.changeHandler = handler;
    }
    setActiveArtBoard(index){
        if(this.artBoards[index]){
            this.activeArtBoard = this.artBoards[index];
        }
    }
}