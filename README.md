# Rounded Rectangles application
This is a small single page application that allows for editing of rectangles with rounded corners.
The application accepts the list with rectangles data that is available as a global variable called rectanglesData. It draws those rectangles on HTML5 Canvas and allows for basic editing capabilities:
1. Editing corner radius by dragging corner handle (all of the corners simultaneously by dragging one corner handle). 
2. Moving rectangles around by dragging them

The application allows for accessing particular rectangle object by its id with API.

## Technologies
The application uses the following technologies:
 - Webpack 2
 - TypeScript 2 compilation
 - ts-lint
 - Webpack 2 Development Server
 - Karma and Jasmine test execution
 - HTML5 Canvas

 ## Architecture
 The application uses HTML5 Canvas to render rectangles and redraw them on mouse events. HTML5 Canvas is used for performance reasons, because of if there are a lot of rectangles, HTML5 Canvas will be much more efficient than using DOM elements.

 **RoundedRectangleApplication** class is used for managing HTML5 Canvas and rendering rectangles on it. It handles mouse events and calls **Rectangle** class methods to modify rectangle's state and render its new state.

 **Rectangle** class implements rectangle's structure, rectangle's state modifiers and rendering features. **Rectangle** class has a collection of **RectangleActionPointer**. The collection represents action points, which are shown on rectangle's mouse hover and allow to move a rectangle or change its radius.

 The application uses **RectangleAPI** class for tests purposes. It has singleton design pattern, because of it should be only one in the application. **RectangleAPI** class has its own collection of rectangles and a method to choose the particular one. There are two tests in _"src\spec\application.spec.ts"_ file.

 ## Using
### Prerequisites
Install packages using Terminal

`npm install`

### Run
Run the application using Terminal

`npm run start`

### Tests

Run tests using Terminal

`npm run test`