var express = require('express');
var router = express.Router();
const controller = require("../controllers/vans.controller");

router.get('/', controller.getVans);
router.post('/', controller.postVan);
router.patch('/:id', controller.patchVan);
router.delete('/:id', controller.deleteVan);

module.exports = router;// 