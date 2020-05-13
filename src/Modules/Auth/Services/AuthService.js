import React from 'react';
import { Modal } from 'antd';
import {
  LogoutOutlined
} from '@ant-design/icons';
const { confirm } = Modal;

export function logout() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
  window.location.href = '/';
}

export function confirmLogout(params) {
  params.stopPropagation();
  confirm({
    title: 'Are you sure want to logout?',
    okText: 'Logout',
    okType: 'danger',
    cancelText: 'Cancel',
    content: '',
    icon: <LogoutOutlined />,
    onOk() {
      logout();
    }
  })
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user')) === "authenticated";
  }
}