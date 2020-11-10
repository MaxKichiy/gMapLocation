import express from 'express';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

export const router = express.Router();

const url =
  'mongodb+srv://Mark1:<password>@cluster0.hvfma.mongodb.net/locations?retryWrites=true&w=majority';

const client = new MongoClient(url);

router.post('/add-location', (req, res, next) => {
  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document
    db.collection('user-locations').insertOne(
      {
        address: req.body.address,
        coords: { lat: req.body.coordinates.lat, lng: req.body.coordinates.lng },
      },
      function (err, r) {
        console.log(r);
        res.json({ message: 'Stored location!', locId: r.insertedId });
      },
    );
  });
});
router.get('/location/:lid', (req, res, next) => {
  const locationId = req.params.lid;

  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document
    db.collection('user-locations').findOne(
      {
        _id: new mongodb.ObjectId(locationId),
      },

      function (err, doc) {
        if (!doc) {
          return res.status(404).json({ message: 'something went wrong' });
        }
        res.json({ address: doc.address, coordinates: doc.coords });
      },
    );
  });
});
