/**
 * Interface for rectangle's mouse actions (drag/move) pointers
 * 
 * @interface IRectangleActionPointer
 */
interface IRectangleActionPointer {
    x: number;
    y: number;
    radius: number;
    visibility: boolean;
    drag: boolean;
    dragStartX: number;
    dragStartY: number;

    /**
     * Deligate action to unify rectangle's drag/move actions
     * 
     * @memberof IRectangleActionPointer
     */
    callback: (x: number, y: number) => void;

    /**
     * Mouse move handler
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof IRectangleActionPointer
     */
    onMouseMove(x: number, y: number): void;
}

/**
 * Class for rectangle's action pointer
 * 
 * @class RectangleActionPointer
 * @implements {IRectangleActionPointer}
 */
class RectangleActionPointer implements IRectangleActionPointer {
    visibility: boolean = false;
    drag: boolean = false;
    dragStartX: number = 0;
    dragStartY: number = 0;
    constructor(public x: number, public y: number, public radius: number, public callback: (x: number, y: number) => void) { }

    /**
     * Mouse move handler
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof RectangleActionPointer
     */
    onMouseMove(x: number, y: number): void {
        let deltaX: number = x - this.dragStartX,
            deltaY: number = y - this.dragStartY;

        if (this.drag) {
            this.callback(deltaX, deltaY);
            this.dragStartX = x;
            this.dragStartY = y;
        }
    }
}

export { IRectangleActionPointer, RectangleActionPointer }