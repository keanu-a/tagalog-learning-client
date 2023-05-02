const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const wordRoutes = require('./routes/word.js');
const phraseRoutes = require('./routes/phrase.js');
const lessonRoutes = require('./routes/lesson.js');

//* FOR IMPORTING DATA *//
const Word = require('./models/Word.js');
const Phrase = require('./models/Phrase.js');
const Lesson = require('./models/Lesson.js');
const { dataWord } = require('./data/word-data.js');
const { dataPhrase } = require('./data/phrase-data.js');
const { dataLesson } = require('./data/lesson-data.js');

//* CONFIGURATIONS *//
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

//* ROUTES *//
app.use('/api/v1/word', wordRoutes);
app.use('/api/v1/phrase', phraseRoutes);
app.use('/api/v1/lesson', lessonRoutes);

//* MONGOOSE AND SERVER SETUP *//
const port = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'tagalog-learning',
  })
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));

    // Inserting data, REMEMBER comment out
    // Word.insertMany(dataWord).then(() =>
    //   console.log('Words were added to the database!')
    // );
    // Phrase.insertMany(dataPhrase).then(() =>
    //   console.log('Phrases were added to the database!')
    // );
    // Lesson.insertMany(dataLesson).then(() =>
    //   console.log('Lessons were added to the database!')
    // );
  })
  .catch((error) => console.log(`${error} did not connect`));
