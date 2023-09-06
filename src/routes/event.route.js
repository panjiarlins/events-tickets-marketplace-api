const router = require('express').Router();
const { eventController } = require('../controllers');
const { eventMulter } = require('../middlewares/multers');
const { eventValidator } = require('../middlewares/validators');

router.get('/', eventController.getAllEvents);
router.get('/search', eventController.getEventsByCity);
router.get('/:id', eventValidator.getByEventId, eventController.getEventById);
router.get('/event-image/:imageName', eventController.getEventImageByImageName);
router.post(
  '/',
  eventMulter
    .eventImageUploader({
      destinationFolder: 'eventImages',
      prefix: 'eventImage',
    })
    .single('eventImage'),
  eventValidator.createEvent,
  eventController.createEvent
);
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
