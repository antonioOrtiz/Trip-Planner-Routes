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
  var hashId;
  var restaurants = req.body.attractions.filter(function(item) {
    return item.category === 'restaurants';
  });
  var hotels = req.body.attractions.filter(function(item) {
    return item.category === 'hotels';
  });
  // var activities = req.body.attractions.filter(function(item) {
  //   return item.category === 'activities';
  // });
  console.log('restaurants', restaurants);
  Itinerary.create({})
    .then(function(itinerary) {
      hashId = itinerary.id;
      // var restaurant = req.body.attractions[0];
      // return itinerary.addRestaurant(restaurant.id);
      var restaurantArray = restaurants.map(function(restaurant) {
        return itinerary.addRestaurant(restaurant.id);
      });
      var hotelArray = hotels.map(function(hotel) {
        return itinerary.addHotel(hotel.id);
      });
      //   var activitiesArray = activities.map(function(activity) {
      //   return itinerary.addActivit(activity.id);
      // });

      return Promise.all([...restaurantArray, ...hotelArray]);
    })
    .then(function(foo) {
      // console.log('hashId', hashId);
      // console.log('foo', foo);

      res.json({ hash: hashId });
    });
});

module.exports = router;
