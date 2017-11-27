const router = require('express').Router();
const Itinerary = require('../models/itinerary');

// prettier-ignore
router
  .get('/:id', function(req, res, next) {
    Itinerary.findById(req.params.id, {include: [{ all: true, nested: true }]})
    .then(function(itinerary) {
      res.json(itinerary);
    });
  });

router.post('/', function(req, res, next) {
  console.log(req.body)
  // Itinerary.create(req.body).then(function(itinerary) {
  //   res.json(itinerary);
  // });
});

module.exports = router;
