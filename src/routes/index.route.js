const siteRoute = require('./site.route');
const postRoute = require('./post.route');
const authRoute = require('./auth.route');


function route(app) {
    app.use('/auth', authRoute);
    app.use('/posts', postRoute);
    app.use('/', siteRoute);
}

module.exports = route;