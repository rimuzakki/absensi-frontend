import React, { Component } from 'react';
import { Table } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import s from './MasterPegawai.module.scss';

class MasterPegawai extends Component {

  handleView = () => {

  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  viewTable = () => {
    const columns = [
      {
        title: 'ID Pegawai',
        dataIndex: 'idPegawai',
        key: 'idPegawai',
        render: text => <a href="#" onClick={this.handleView}>{text}</a>,
      },
      {
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name - b.name,
        sortDirections: ['descend'],
      },
      {
        title: 'Jabatan',
        dataIndex: 'jabatan',
        key: 'jabatan',
      },
      {
        title: 'Jam kerja',
        dataIndex: 'jamKerja',
        key: 'jamKerja',
      },
      {
        title: 'No Telp',
        dataIndex: 'noTelp',
        key: 'noTelp',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span className={s.action}>
            <a href="#" onClick={this.handleView}><EyeOutlined /></a>
            <a href="#" onClick={this.handleEdit}><EditOutlined /></a>
            <a href="#" onClick={this.handleDelete}><DeleteOutlined /></a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '2',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '3',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '4',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '5',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '6',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '7',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '8',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
    ]

    return (
      <Table columns={columns} dataSource={data} />
    )
  }

  render() {
    return (
      this.viewTable()
    );
  }
}

export default MasterPegawai;