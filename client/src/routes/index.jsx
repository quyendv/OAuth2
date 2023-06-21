import AuthLayout from '~/components/layouts/AuthLayout';
import routesConfigs from '~/configs/routes.config';
import HomePage from '~/page/Home';
import Signin from '~/page/Signin';
import Signup from '~/page/Signup';

const routes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: routesConfigs.signin,
    element: <Signin />,
    layout: AuthLayout,
  },
  {
    path: routesConfigs.signin,
    element: <Signup />,
    layout: AuthLayout,
  },
];

export default routes;
