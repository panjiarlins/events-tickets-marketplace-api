const router = require('express').Router();
const { eventController } = require('../controllers');
const { eventAuth } = require('../middlewares/auth');
const { eventMulter } = require('../middlewares/multers');
const { eventValidator } = require('../middlewares/validators');

// GET all events
router.get('/', eventController.getAllEvents);

// GET eventImage by imageName
router.get('/event-image/:imageName', eventController.getEventImageByImageName);

// GET events by city
router.get('/search', eventController.getEventsByCity);

// GET event by eventId
router.get('/:id', eventValidator.getByEventId, eventController.getEventById);

// POST new event
router.post(
  '/',
  eventMulter.eventImageUploader().single('eventImage'),
  eventAuth.authCreateEvent,
  eventValidator.createEvent,
  eventController.createEvent
);

// PATCH event by eventId
router.patch(
  '/:id',
  eventValidator.editEvent,
  eventAuth.authEventByIdParams,
  eventController.editEvent,
  eventController.getEventById
);

// DELETE event by eventId
router.delete(
  '/:id',
  eventValidator.deleteEventById,
  eventAuth.authEventByIdParams,
  eventController.deleteEventById
);

module.exports = router;
