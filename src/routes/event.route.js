const router = require('express').Router();
const eventController = require('../controllers/event.controller');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.delete('/:id', eventController.deleteEventById);
router.patch('/:id', eventController.editEvent, eventController.getEventById);

module.exports = router;
