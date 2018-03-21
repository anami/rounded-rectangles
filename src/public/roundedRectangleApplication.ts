import { IRectangleExtended, Rectangle } from '../common/index';


/**
 * Interface for circles at rectangle's corners and rectangle's center to drag
 * 
 * @interface IRoundedRectangleApplication
 */
interface IRoundedRectangleApplication {

    /**
     * 
     * Add a rectange to the rectangles' list
     * @param {number} id 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} radius 
     * @memberof IRoundedRectangleApplication
     */
    addRectangle(id: number, x: number, y: number, width: number, height: number, radius: number): void;


    /**
     * Remove a rectangle with 'rectangleId' from the rectangles' list
     * 
     * @param {number} rectangleId 
     * @memberof IRoundedRectangleApplication
     */
    removeRectangle(rectangleId: number): void;
}


/**
 * The Main class for managing HTML5 Canvas to render rectangles
 * 
 * @class RoundedRectangleApplication
 * @implements {IRoundedRectangleApplication}
 */
class RoundedRectangleApplication implements IRoundedRectangleApplication {
    private canvasElement: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private rectangles: IRectangleExtended[] = [];
    canvasWidth: number;
    canvasHeight: number;

    constructor(canvasId: string = 'canvas') {
        // getting HTML5 canvas DOM element
        this.canvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        // setting HTML5 canvas DOM element size
        this.canvasElement.width = document.body.clientWidth;
        this.canvasElement.height = document.body.clientHeight;
        // getting Canvas 2d context
        this.canvasContext = this.canvasElement.getContext('2d');

        // changing Canvas's size on window resize
        window.addEventListener('resize', () => {
            this.canvasWidth = this.canvasElement.width = document.body.clientWidth;
            this.canvasHeight = this.canvasElement.height = document.body.clientHeight;
            this.render();
        });

        // attach mousemove event
        document.addEventListener('mousemove', (event: MouseEvent) => {
            this.onMouseMove(event.offsetX, event.offsetY);
        });
        // attach touchmove event
        document.addEventListener('touchmove', (event: TouchEvent) => {
            this.onMouseMove(event.touches[0].pageX, event.touches[0].pageY);
        });

        // attach mousedown event
        document.addEventListener('mousedown', (event: MouseEvent) => {
            this.onMouseDown(event.offsetX, event.offsetY);
        });
        // attach touchstart event
        document.addEventListener('touchstart', (event: TouchEvent) => {
            this.onMouseDown(event.touches[0].pageX, event.touches[0].pageY);
        });

        // attach mouseup event
        document.addEventListener('mouseup', (event: MouseEvent) => {
            this.onMouseUp(event.offsetX, event.offsetY);
        });
        // attach touchend event
        document.addEventListener('touchend', (event: TouchEvent) => {
            this.onMouseUp(event.touches[0].pageX, event.touches[0].pageY);
        });

        // setting canvas object size
        this.canvasWidth = this.canvasElement.offsetWidth;
        this.canvasHeight = this.canvasElement.offsetHeight;
    }


    /**
     * Render rectangles on Canvas
     * 
     * @private
     * @memberof RoundedRectangleApplication
     */
    private render() {
        this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.rectangles.sort(rect => {
            return (rect.drag) ? 1 : 0;
        }).forEach((rect) => {
            console.log(rect.drag);
            rect.render(this.canvasContext);
        });
    }


    /**
     * Mousemove event handler
     * 
     * @private
     * @param {number} x 
     * @param {number} y 
     * @memberof RoundedRectangleApplication
     */
    private onMouseMove(x: number, y: number) {
        let movingRectagles = this.rectangles.filter(rect => rect.drag);
        if (movingRectagles.length === 0) {
            movingRectagles = this.rectangles;
        }

        for (let i = 0; i < movingRectagles.length; i++) {
            movingRectagles[i].traceRay(x, y);
        }
        this.render();
    }

    /**
     * Mouseup event handler to reset the selected rectangle
     * 
     * @private
     * @param {number} x 
     * @param {number} y 
     * @memberof RoundedRectangleApplication
     */
    private onMouseUp(x: number, y: number) {
        for (let i = 0; i < this.rectangles.length; i++) {
            this.rectangles[i].releaseMouse(x, y);
        }
        this.render();
    }

    /**
     * Mousedown event handler to determine which rectangle is clicked on
     * 
     * @private
     * @param {number} x 
     * @param {number} y 
     * @memberof RoundedRectangleApplication
     */
    private onMouseDown(x: number, y: number) {
        for (let i = 0; i < this.rectangles.length; i++) {
            if (this.rectangles[i].traceRay(x, y)) {
                this.rectangles[i].onClick(x, y);
                break;
            }
        }
    }


    /**
     * Add a rectangle into the rectangles' collection
     * 
     * @param {number} id 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} radius 
     * @memberof RoundedRectangleApplication
     */
    addRectangle(id: number, x: number, y: number, width: number, height: number, radius: number) {
        let newRectangle = new Rectangle(id, x, y, width, height, radius);
        this.rectangles.push(newRectangle);
        this.render();
    }


    /**
     * Remove a rectangle from the rectangles' collection by 'rectangleId'
     * 
     * @param {number} rectangleId 
     * @memberof RoundedRectangleApplication
     */
    removeRectangle(rectangleId: number) {
        this.rectangles = this.rectangles.filter(rect => rect.id !== rectangleId);
    }
}

export { RoundedRectangleApplication }