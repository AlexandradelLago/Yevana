var express = require('express');
const ensureLogin = require("connect-ensure-login");
var router = express.Router();
const controller = require("../controllers/users.controller");

router.get('/', controller.getUsers);
router.get('/:id',ensureLogin.ensureLoggedIn(),controller.getOne);
router.post('/new', controller.postUser);
router.patch('/edit/:id',ensureLogin.ensureLoggedIn(), controller.patchUser);
router.delete('/delete/:id', controller.deleteUser);


const passport = require("passport");

router.post('/signup', controller.signUp);
router.post('/login', passport.authenticate('local'), controller.login);
router.post('/logout', controller.logout);
router.get('/loggedin', controller.loggedin);




module.exports = router;

