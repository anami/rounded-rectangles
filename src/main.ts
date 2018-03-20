import { Rectangle, IRectangle } from './common/index';
import { RoundedRectangleApplication } from './public/roundedRectangleApplication';

var rectanglesData = [{
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

const rect = new RoundedRectangleApplication();
var rectangles: IRectangle[] = [];
rectanglesData.forEach(element => {
    rect.addRectangle(
        element.id,
        element.x,
        element.y,
        element.width,
        element.height,
        element.radius
    );
});
