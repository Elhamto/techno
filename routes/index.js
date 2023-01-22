'use strict';

const routeAPIDefiner = [
    ["/user", require("./user")]
]

const route = function (app) {
    for (const route of routeAPIDefiner) {
        app.use(`/api${route[0]}`, route[1]);
    }
};


export default route;