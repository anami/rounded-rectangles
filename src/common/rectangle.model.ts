import { IRectangleActionPointer, RectangleActionPointer } from './index';

/**
 * Interface for Rectangle representation
 * 
 * @interface IRectangle
 */
interface IRectangle {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;

    /**
     * Set rectangle's size
     * 
     * @param {number} width 
     * @param {number} height 
     * @memberof IRectangle
     */
    setSize(width: number, height: number): void;

    /**
     * Set rectangle's position (left-top corver)
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof IRectangle
     */
    setPosition(x: number, y: number): void;

    /**
     * Set rectangle's corners radius
     * 
     * @param {number} radius 
     * @memberof IRectangle
     */
    setCornerRadius(radius: number): void;

    /**
     * Transform a rectangle object to JSON
     * 
     * @returns {string} 
     * @memberof IRectangle
     */
    toJSON(): string;
}


/**
 * Interface for extending IRectangle interface to manage rectangle's rendering and events
 * 
 * @interface IRectangleExtended
 * @extends {IRectangle}
 */
interface IRectangleExtended extends IRectangle {
    // A flag is the rectangle is selected
    drag: boolean;

    /**
     * Rendering the rectangle
     * 
     * @param {CanvasRenderingContext2D} canvas 
     * @memberof IRectangleExtended
     */
    render(canvas: CanvasRenderingContext2D): void;

    /**
     * Check is mouse event is happaned on the rectangle's corner points and center point
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean} 
     * @memberof IRectangleExtended
     */
    traceRay(x: number, y: number): boolean;

    /**
     * Check is mouse event is happaned on the rectangle
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof IRectangleExtended
     */
    onClick(x: number, y: number): void;


    /**
     * Clear the rectangle's selection
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof IRectangleExtended
     */
    releaseMouse(x: number, y: number): void;
}

/**
 * Rectangle class which implements all rectangle's logic
 * 
 * @class Rectangle
 * @implements {IRectangleExtended}
 */
class Rectangle implements IRectangleExtended {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    drag: boolean = false;
    cornerPoints: IRectangleActionPointer[] = [];

    constructor(id: number, x: number = 0, y: number = 0, width: number = 0, height: number = 0, radius: number = 0) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;

        const cornerPoinerRadius = 10;
        // creating and setting center point for moving the rectangle
        this.cornerPoints.push(new RectangleActionPointer(
            this.x + this.width / 2,
            this.y + this.height / 2,
            cornerPoinerRadius,
            (deltaX: number, deltaY: number) => {
                this.setPosition(this.x + deltaX, this.y + deltaY);
                this.cornerPoints.forEach((point) => {
                    point.x = point.x + deltaX;
                    point.y = point.y + deltaY;
                });
            }));

        // creating and setting left top point for changing rectangle's corners radius
        this.cornerPoints.push(new RectangleActionPointer(
            this.x + cornerPoinerRadius / 2,
            this.y + cornerPoinerRadius / 2,
            cornerPoinerRadius,
            (deltaX: number, deltaY: number) => {
                let deltaR = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (deltaX <= 0 && deltaY <= 0) {
                    this.changeRadius(Math.max(0, this.radius - deltaR));
                }
                if (deltaX >= 0 && deltaY >= 0) {
                    this.changeRadius(Math.min(Math.min(this.width, this.height) / 2, this.radius + deltaR));
                }
            }));

        // creating and setting ri top point for changing rectangle's corners radius
        this.cornerPoints.push(new RectangleActionPointer(
            this.x + this.width - cornerPoinerRadius / 2,
            this.y + cornerPoinerRadius / 2,
            cornerPoinerRadius,
            (deltaX: number, deltaY: number) => {
                let deltaR = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (deltaX >= 0 && deltaY <= 0) {
                    this.changeRadius(Math.max(0, this.radius - deltaR));
                }
                if (deltaX <= 0 && deltaY >= 0) {
                    this.changeRadius(Math.min(Math.min(this.width, this.height) / 2, this.radius + deltaR));
                }
            }));

        // creating and setting right bottom point for changing rectangle's corners radius
        this.cornerPoints.push(new RectangleActionPointer(
            this.x + this.width - cornerPoinerRadius / 2,
            this.y + this.height - cornerPoinerRadius / 2,
            cornerPoinerRadius,
            (deltaX: number, deltaY: number) => {
                let deltaR = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (deltaX >= 0 && deltaY >= 0) {
                    this.changeRadius(Math.max(0, this.radius - deltaR));
                }
                if (deltaX <= 0 && deltaY <= 0) {
                    this.changeRadius(Math.min(Math.min(this.width, this.height) / 2, this.radius + deltaR));
                }
            }));

        // creating and setting left bottom point for changing rectangle's corners radius
        this.cornerPoints.push(new RectangleActionPointer(
            this.x + cornerPoinerRadius / 2,
            this.y + this.height - cornerPoinerRadius / 2,
            cornerPoinerRadius,
            (deltaX: number, deltaY: number) => {
                let deltaR = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (deltaX <= 0 && deltaY >= 0) {
                    this.changeRadius(Math.max(0, this.radius - deltaR));
                }
                if (deltaX >= 0 && deltaY <= 0) {
                    this.changeRadius(Math.min(Math.min(this.width, this.height) / 2, this.radius + deltaR));
                }
            }));
    }


    /**
     * Render a rounded rectangle
     * 
     * @param {CanvasRenderingContext2D} canvas 
     * @memberof Rectangle
     */
    render(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.moveTo(this.x + this.radius, this.y);
        canvas.lineTo(this.x + this.width - this.radius, this.y);
        canvas.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.radius);
        canvas.lineTo(this.x + this.width, this.y + this.height - this.radius);
        canvas.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - this.radius, this.y + this.height);
        canvas.lineTo(this.x + this.radius, this.y + this.height);
        canvas.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - this.radius);
        canvas.lineTo(this.x, this.y + this.radius);
        canvas.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
        canvas.fillStyle = 'purple';
        canvas.fill();
        canvas.lineWidth = 5;
        canvas.strokeStyle = 'black';
        canvas.stroke();

        // rendering rectangle's points for moving it and changing its radius
        this.cornerPoints.filter((point) => point.visibility === true).forEach(point => {
            canvas.beginPath();
            canvas.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
            canvas.fillStyle = 'aqua';
            canvas.fill();
            canvas.lineWidth = 2;
            canvas.strokeStyle = 'black';
            canvas.stroke();
        });
    }


    /**
     * Set rectangle's corners radios
     * 
     * @param {number} radius 
     * @memberof Rectangle
     */
    changeRadius(radius: number) {
        this.radius = radius;
    }


    /**
     * Check is mouse event is happaned on the rectangle's corner points and center point
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean} 
     * @memberof Rectangle
     */
    traceRay(x: number, y: number): boolean {
        let result = (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height);
        this.cornerPoints.forEach(point => {
            point.visibility = result || point.drag;
            point.onMouseMove(x, y);
        });
        return result;
    }

    /**
     * Check is mouse event is happaned on the rectangle
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof Rectangle
     */
    onClick(x: number, y: number): void {
        for (let i = 0; i < this.cornerPoints.length; i++) {
            const point = this.cornerPoints[i];
            if (Math.sqrt((point.x - x) * (point.x - x) + (point.y - y) * (point.y - y)) <= point.radius) {
                point.drag = true;
                this.drag = true;
                point.dragStartX = x;
                point.dragStartY = y;
                break;
            }
        }
    }

    /**
     * Clear the rectangle's selection
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof Rectangle
     */
    releaseMouse(x: number, y: number): void {
        this.drag = false;
        this.cornerPoints.forEach(point => { point.drag = false; });
    }

    /**
     * Set rectangle's size
     * 
     * @param {number} width 
     * @param {number} height 
     * @memberof Rectangle
     */
    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    /**
     * Set rectangle's position (left-top corver)
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof Rectangle
     */
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }


    /**
     * Set rectangle's corners radius
     * 
     * @param {number} radius 
     * @memberof Rectangle
     */
    setCornerRadius(radius: number): void {
        this.radius = radius;
    }

    /**
     * Transform a rectangle object to JSON
     * 
     * @returns {*} 
     * @memberof Rectangle
     */
    toJSON(): any {
        return {
            id: this.id,
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y,
            radius: this.radius
        };
    }
}

export { Rectangle, IRectangle, IRectangleExtended }
