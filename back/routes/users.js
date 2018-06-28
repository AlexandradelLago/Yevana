var express = require('express');
var router = express.Router();
const controller = require("../controllers/users.controller");

router.get('/', controller.getUsers);
router.post('/new', controller.postUser);
router.patch('/edit/:id', controller.patchUser);
router.delete('/delete/:id', controller.deleteUser);

module.exports = router;