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
    private static instance: RectangleAPI;
    static getInstance() {
        if (!RectangleAPI.instance) {
            RectangleAPI.instance = new RectangleAPI();
        }
        return RectangleAPI.instance;
    }

    /**
     * Create rectangle with 'rectangleId'
     * 
     * @param {number} rectangleId 
     * @returns {IRectangle} 
     * @memberof RectangleAPI
     */
    getRectById(rectangleId: number): IRectangle {
        let rect = new Rectangle(rectangleId);
        return rect;
    }
}

export { RectangleAPI }