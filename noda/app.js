import express from 'express';
import { router } from './routes/locations.js';
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(router);

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// app.use((req, res, next) => {
//   res.setHeader('Content-type', 'text/html');
//   next();
// });

// app.use((req, res, next) => {
//   const userName = req.body.username || 'Unknown User';
//   res.render('index', {
//     user: userName,
//   });
// });

app.listen(3331);
