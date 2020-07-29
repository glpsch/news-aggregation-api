const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const allowList = ['http://api.news-exploring.ga', 'http://news-exploring.ga', 'https://api.news-exploring.ga', 'https://news-exploring.ga', 'http://localhost:8080', 'http://localhost'];

const corsOptions = {
  origin: (origin, callback) => {
    // todo: remove later
    console.log('CORS:', JSON.stringify({ origin }));
    if (allowList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const { errors } = require('celebrate');
const { PORT, DATABASE_URL } = require('./config');
const routes = require('./routes');
const limiter = require('./middlewares/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-500-handler');

const app = express();
app.listen(PORT);

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(routes);
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);
