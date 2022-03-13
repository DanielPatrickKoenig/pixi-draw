import ArtBoardGroup from './ArtBoardGroup';
export default class Timeline extends ArtBoardGroup{
    constructor({width, height, mode, frameCount}){
        super({width, height, mode});
        this.frameCount = frameCount;
        this.frames = [{frame: 0, board: this.activeArtBoard}];
        this.activeFrame = this.frames[0];
    }
    setActiveArtBoard(index){
        super.setActiveArtBoard(index);
        this.hideInactiveFrames();
    }
    hideInactiveFrames(){
        this.artBoards.forEach(item => {
            item.visible = false;
        });
        this.activeArtBoard.visible = true;
    }
    getArtBoardIndexByFrame(frame){
        const targetFrame = this.frames.find(item => item.frame === frame);
        return this.artBoards
            .map((item, index) => ({board: item, index: index}))
            .find(item => targetFrame.board.artBoardID === item.board.artBoardID)
            .index;
    }
    addFrame(frame){
        this.frames.push({frame, board: this.addArtBoard()});
        this.hideInactiveFrames();
    }
    duplicateFrame(sourceFrame, targetFrame){
        const sourceIndex = this.getArtBoardIndexByFrame(sourceFrame);
        const sourceArtBoard = this.artBoards[sourceIndex];
        const duplicate = this.duplicateArtBoard(sourceArtBoard);
        this.frames.push({frame: targetFrame, board: duplicate});
        this.hideInactiveFrames();
    }
    setActiveFrame(frameIndex){
        this.activeFrame = frameIndex;
        const boardIndex = this.getArtBoardIndexByFrame(frameIndex);
        this.setActiveArtBoard(boardIndex);
    }
}