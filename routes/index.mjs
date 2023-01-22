import router from "./user.mjs"

const routeAPIDefiner = [
    ["/user", router]
]

const route = function (app) {
    for (const route of routeAPIDefiner) {
        app.use(`/api${route[0]}`, route[1]);
    }
};


export default route;