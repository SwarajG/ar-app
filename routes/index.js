"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
router.get('/', function (req, res) {
    var product = req.query.product;
    res.render('index', { product: product });
});
exports["default"] = router;
