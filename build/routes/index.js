"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var language_1 = require("./language");
var product_1 = require("../const/product");
var data_1 = require("./__mock__/data");
var router = express_1.default.Router();
router.get('/', function (req, res) {
    var product = req.query.product;
    res.render('index', { product: product });
});
router.get('/product', function (req, res) {
    var _a = req.query.language, language = _a === void 0 ? 'en' : _a;
    res.render('product', {
        data: {
            menuList: product_1.menuList,
            language: language,
            languageText: language_1.languageText[language.toString()],
            productData: data_1.data,
        },
    });
});
exports.default = router;
