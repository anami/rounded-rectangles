#Rounded Rectangles application
This is a small single page application that allows for editing of rectangles with rounded corners.
The application accepts the list with rectangles data that is available as a global variable called rectanglesData. It draws those rectangles and allows for basic editing capabilities:
1. Editing corner radius by dragging corner handle (all of the corners simultaneously by dragging one corner handle). 
2. Moving rectangles around by dragging them

The application allows for accessing particular rectangle object by its id with API.

##Technologies
The application uses the following technologies:
 - Webpack 2
 - TypeScript 2 compilation
 - ts-lint
 - Webpack 2 Development Server
 - Karma and Jasmine test execution
 - HTML5 Canvas