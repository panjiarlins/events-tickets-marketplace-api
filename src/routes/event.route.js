const router = require('express').Router();
const { eventController } = require('../controllers');
const { eventValidator } = require('../middlewares/validators');

router.get('/', eventController.getAllEvents);
router.get('/search', eventController.getEventByCity);
router.get('/:id', eventValidator.getByEventId, eventController.getEventById);
router.post('/', eventValidator.createEvent, eventController.createEvent);
router.delete(
  '/:id',
  eventValidator.deleteEventById,
  eventController.deleteEventById
);
router.patch(
  '/:id',
  eventValidator.editEvent,
  eventController.editEvent,
  eventController.getEventById
);

module.exports = router;
