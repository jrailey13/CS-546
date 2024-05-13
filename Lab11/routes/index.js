//Here you will require route files and export the constructor method as shown in lecture code
// and worked in previous labs.

import routes from './routesApi.js';
import path from "path";

const constructorMethod = (app) => {
    app.use('/', routes);

    app.get('/', (req, res) => {
        res.sendFile(path.resolve('static/webpage.html'));
    });
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

export default constructorMethod;