//Here you will require route files and export them as used in previous labs.
import palindromeRoutes from './palindromeCheck.js';
import path from "path";

const constructorMethod = (app) => {
    app.use('/', palindromeRoutes);

    app.get('/', (req, res) => {
        res.sendFile(path.resolve('static/homepage.html'));
    });
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

export default constructorMethod;