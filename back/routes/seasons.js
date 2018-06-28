var express = require('express');
var router = express.Router();
const controller = require("../controllers/seasons.controller");

router.get('/', controller.getSeasons);
router.post('/', controller.postSeason);
router.patch('/:id', controller.patchSeason);
router.delete('/:id', controller.deleteSeason);

module.exports = router;