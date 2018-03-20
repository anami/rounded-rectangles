import { IRectangle } from '../common/rectangle.model';
import { RectangleAPI } from '../common/rectangleAPI';

describe('Rounded Rectangles test', () => {
    var application = RectangleAPI.getInstance();
    it('Test #1: check editing a rectangle', () => {
        var rect = application.getRectById(1);
        rect.setSize(100, 100);
        rect.setPosition(10, 10);
        rect.setCornerRadius(5);
        expect({
            id: 1,
            width: 100,
            height: 100,
            x: 10,
            y: 10,
            radius: 5
        }).toEqual(rect.toJSON());
    });

    it('Test #2: check editing a rectangle', () => {
        var rect = application.getRectById(2);
        rect.setSize(50, 100);
        rect.setPosition(1, 1);
        rect.setCornerRadius(15);
        expect({
            id: 2,
            width: 50,
            height: 100,
            x: 1,
            y: 1,
            radius: 15
        }).toEqual(rect.toJSON());
    });
});