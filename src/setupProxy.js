const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/camunda', {
        target: 'http://spa.fplace-develop.moos.solutions',
        changeOrigin: true,
        logLevel: "debug",
    }));
    app.use(proxy(['/api', '/spa/api'], {
        target: 'http://agent.cherry-develop.moos.solutions',
        changeOrigin: true,
        logLevel: "debug",
    }));
};