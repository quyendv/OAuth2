import authRouter from './auth.route.js';

const initRoutes = (app) => {
  // app.use(path, otherRouter);
  app.use('/auth', authRouter);

  app.use('/', (req, res) => {
    res.send('Server on root route | Path not found');
  });
};

export default initRoutes;
