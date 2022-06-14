// import { createProxyMiddleware } from "http-proxy-middleware"; //이렇게 하면 안되고
const { createProxyMiddleware } = require("http-proxy-middleware"); // 이렇게 하면 됨 무슨차이지?
module.exports = function(app) {
    app.use(
        '/rest/api/2/search',
        createProxyMiddleware({
            target: '',
            changeOrigin: true,
        })
    );
};