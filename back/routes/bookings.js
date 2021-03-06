var express = require('express');
var router = express.Router();
const controller = require("../controllers/bookings.controller");

router.get('/', controller.getBookings);
router.get ('/:id',controller.getBooking);
router.get('/van/:_van',controller.getBookingsbyVan);
//router.put('/:id',controller.putBooking);
router.post('/', controller.postBooking);
router.patch('/:id', controller.patchBooking);
router.delete('/:id', controller.deleteBooking);

module.exports = router;