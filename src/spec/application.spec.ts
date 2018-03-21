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

    it('Test #2: get an existing rectangle', () => {
        var rect = application.getRectById(2);
        expect({
            id: 2,
            x: 150,
            y: 400,
            width: 250,
            height: 150,
            radius: 20
        }).toEqual(rect.toJSON());
    });
});