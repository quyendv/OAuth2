import cookieSession from 'cookie-session';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import initRoutes from './src/routes/index.js';

/** Config before app initializing app */
config(); // or directly import 'dotenv/config'

/** Init app with base config */
const app = express();
const port = process.env.PORT || 8000;

/** app.use(middleware) */
app.use(passport.initialize()); // khởi tạo authentication module
app.use(passport.session()); // see more: https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045

app.use(
  cookieSession({
    name: 'session',
    keys: ['quin'],
    maxAge: 24 * 60 * 60 * 1000, // ms in a day
  }),
);

app.use(
  cors({
    // origin: [process.env.CLIENT_LOCAL, process.env.CLIENT_PRODUCT],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use(morgan('tiny'));

/** Sau khi qua cors rồi (chạy theo thứ tự) thì check tiếp.
 * - express.json() & express.urlencoded() chỉ dùng cho POST, PUT
 * - yêu cầu server accept | store data (object) được enclosed trong req.body
 */
app.use(express.json()); // convert data client gửi lên sang json
app.use(express.urlencoded({ extended: true })); // convert data sang json từ những dạng như array, object, ...

/** Routes */
initRoutes(app);

/** Run */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
