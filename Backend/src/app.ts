import express from 'express';
import AuthRouter from './routes/auth';

const app = express();

if (app.get('env') !== 'production') {
  app.use(require('morgan')('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', AuthRouter());

export default app;