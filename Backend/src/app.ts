import express from 'express';
import AppRouter from './routes';

const app = express();

if (app.get('env') !== 'production') {
  app.use(require('morgan')('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', AppRouter());

export default app;