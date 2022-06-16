// import { createProxyMiddleware } from "http-proxy-middleware"; //이렇게 하면 안되고
import Variable from "./component/Variable";
const { createProxyMiddleware } = require("http-proxy-middleware"); // 이렇게 하면 됨 무슨차이지?

module.exports = function(app) {
    app.use(
        Variable.RestSearchUrl,
        createProxyMiddleware({
            target: Variable.JiraUrl,
            changeOrigin: true,
        })
    );
};