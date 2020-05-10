import React, { Component } from 'react';
import { Table} from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
// import cx from 'classnames';
import s from '../Master.module.scss';


class Index extends Component {
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
        render: text => <a href="/#" onClick={this.handleView}>{text}</a>,
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
        title: 'Jam Masuk',
        dataIndex: 'jamMasuk',
        key: 'jamMasuk',
      },
      {
        title: 'Keterangan',
        dataIndex: 'keterangan',
        key: 'keterangan',
      },
    ];

    const data = [
      {
        key: '1',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
      {
        key: '2',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
      {
        key: '3',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
      {
        key: '4',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
      {
        key: '5',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
      {
        key: '6',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
      {
        key: '7',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
      {
        key: '8',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        jamMasuk: '08.00',
        keterangan: 'Sudah Presensi'
      },
    ]

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Presensi hari ini</h3>
        </div>

        <Table columns={columns} dataSource={data} scroll={{ y: 380 }} />
      </div>
    )
  }

  viewCard = () => {
    return (
      <div className={s.cardSection}>
        <div className={s.card}>
          <h3><CheckCircleOutlined /> Sudah Presensi</h3>
          <p>10 <small>orang</small></p>
        </div>

        <div className={s.card}>
          <h3><ClockCircleOutlined /> Belum Presensi</h3>
          <p>5 <small>orang</small></p>
        </div>

        <div className={s.card}>
          <h3><ExclamationCircleOutlined /> Terlambat</h3>
          <p>2 <small>orang</small></p>
        </div>

        <div className={s.card}>
          <h3><PlusCircleOutlined /> Total Pegawai</h3>
          <p>15 <small>orang</small></p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.viewCard()}
        {this.viewTable()}
      </div>
    );
  }
}

export default Index;