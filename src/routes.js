import Loadable from 'react-loadable';
import Loading from 'components/loading';

const Dashboard = Loadable({
  loader: () => import('./views/home'),
  loading: Loading,
});
const MyProfile = Loadable({
  loader: () => import('./views/my-profile'),
  loading: Loading,
})

const TruckManagement = Loadable({
  loader: () => import('views/truck-management'),
  loading: Loading,
})


const routes = [
  {path: '/dashboard', name: 'Trang chủ', component: Dashboard},
  {path: '/me', name: 'Trang cá nhân', component: MyProfile},
  {path: '/truck-management', name: 'Quản lý xe tải', component: TruckManagement},
];

export default routes;
