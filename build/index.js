"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var HTTPS_PORT = process.env.PORT || 3000;
var HTTP_PORT = process.env.PORT || 8080;
var privateKey = fs_1.default.readFileSync('key.pem');
var certificate = fs_1.default.readFileSync('cert.pem');
var credentials = { key: privateKey, cert: certificate };
// static files
app.use(express_1.default.static('public'));
// Set Templating engine
console.log(path_1.default.join(__dirname, '../src/views/'));
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path_1.default.join(__dirname, '../src/views/'));
app.set('view engine', 'ejs');
app.use(routes_1.default);
var httpServer = http_1.default.createServer(app);
var httpsServer = https_1.default.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, function () {
    console.log("HTTPS Application is running on port ".concat(HTTPS_PORT, "."));
});
httpServer.listen(HTTP_PORT, function () {
    console.log("HTTP Application is running on port ".concat(HTTP_PORT, "."));
});
