import React from 'react';
import Loadable from 'react-loadable';
import PageLoader from '../../Components/PageLoader';

const Absensi = Loadable({
  loader: () => import('../Absensi/Components/Index'),
  loading: PageLoader,
});

export default [
  {
    path: '/',
    component: () => (<Absensi />),
  },
]