import cookieSession from 'cookie-session';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import './src/configs/passport.config.js'; // || import passportSetup from '...' -> using dotenv/config in that file
import initRoutes from './src/routes/index.js';

/** Config before app initializing app */
config(); // or directly import 'dotenv/config'

/** Init app with base config */
const app = express();
const port = process.env.PORT || 8000;

/** app.use(middleware) */
// Khởi tạo session support để sử dụng các phiên đăng nhập -> tương tự express-session nhưng cải tiến thêm cookie
app.use(
  cookieSession({
    name: 'session',
    keys: ['quin'], // FIXME: using secret key
    maxAge: 24 * 60 * 60 * 1000, // ms in a day
  }),
);

// app.use(passport.initialize()); // khởi tạo authentication module. Từ v0.6.x là không cần thiết nữa, require for version < v0.4.x
// app.use(passport.session()); // see more: https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045 -> same middleware verifyToken -> using as verifySession (call serializeUser & deserializeUser)

/**
 * Khắc phục tạm thời lỗi "req.session.regenerate is not a function" khi dùng session: https://github.com/jaredhanson/passport/issues/904#issuecomment-1307558283
 * -> register regenerate & save after the cookieSession middleware initialization
 */
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(
  cors({
    origin: [process.env.CLIENT_LOCAL, process.env.CLIENT_PRODUCT],
    credentials: true, // Determines whether the request contains authentication information (e.g., cookies, HTTP authentication) or not. In this case, credentials are set to true, allowing the request to include authentication information.
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
