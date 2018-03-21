import { IRectangle, Rectangle } from './index';

/**
 * Interface for singleton API class
 * 
 * @interface IRectangleAPI
 */
interface IRectangleAPI {
    getRectById(rectangleId: number): IRectangle;

}

/**
 * Singleton class for testing purposes API
 * 
 * @class RectangleAPI
 * @implements {IRectangleAPI}
 */
class RectangleAPI implements IRectangleAPI {
    rectanglesData = [{
        id: 0,
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        radius: 10
    },
    {
        id: 1,
        x: 400,
        y: 150,
        width: 300,
        height: 100,
        radius: 30
    },
    {
        id: 2,
        x: 150,
        y: 400,
        width: 250,
        height: 150,
        radius: 20
    }
    ];
    rectangles: IRectangle[] = [];
    private static instance: RectangleAPI;
    static getInstance() {
        if (!RectangleAPI.instance) {
            RectangleAPI.instance = new RectangleAPI();
        }
        // converting input data to Rectangle objects list
        RectangleAPI.instance.rectanglesData.forEach(rect => {
            RectangleAPI.instance.rectangles.push(new Rectangle(
                rect.id,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                rect.radius
            ));
        });
        return RectangleAPI.instance;
    }

    /**
     * Get rectangle with 'rectangleId'
     * 
     * @param {number} rectangleId 
     * @returns {IRectangle} 
     * @memberof RectangleAPI
     */
    getRectById(rectangleId: number): IRectangle {
        let rect = this.rectangles.filter(rect => rect.id === rectangleId)[0];
        return rect;
    }
}

export { RectangleAPI }