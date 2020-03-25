import React from 'react';
import Loadable from 'react-loadable';
import PageLoader from '../../Components/PageLoader';

const Index = Loadable({
  loader: () => import('../Dashboard/Components/Index'),
  loading: PageLoader,
});

const MasterJabatan = Loadable({
  loader: () => import('../Dashboard/Components/MasterJabatan'),
  loading: PageLoader,
});

const MasterPegawai = Loadable({
  loader: () => import('../Dashboard/Components/MasterPegawai'),
  loading: PageLoader,
});

const MasterUser = Loadable({
  loader: () => import('../Dashboard/Components/MasterUser'),
  loading: PageLoader,
});

const LaporanAbsensi = Loadable({
  loader: () => import('../Dashboard/Components/LaporanAbsensi'),
  loading: PageLoader,
});

export default [
  {
    path: '/dashboard',
    exact: true,
    component: () => (<Index />),
  },
  {
    path: '/dashboard/master/jabatan/',
    component: () => (<MasterJabatan />),
  },
  {
    path: '/dashboard/master/pegawai/',
    component: () => (<MasterPegawai />),
  },
  {
    path: '/dashboard/master/user/',
    component: () => (<MasterUser />),
  },
  {
    path: '/dashboard/report',
    component: () => (<LaporanAbsensi />),
  },
]
