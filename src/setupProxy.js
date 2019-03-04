const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy(['/spa/api', '/api', '/camunda'], {
        target: 'http://spa.fplace-develop.moos.solutions',
        changeOrigin: true,
        logLevel: "debug",
    }));
};