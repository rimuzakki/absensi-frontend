import React, { Component } from 'react';
import { Table, Button, DatePicker } from 'antd';
import { SearchOutlined, PrinterOutlined } from '@ant-design/icons';
import cx from 'classnames';
import s from '../Master.module.scss';


class LaporanAbsensi extends Component {

  handleView = () => {

  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  handleDateChange = (date, dateString) => {
    console.log(date, dateString);
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
        title: 'Durasi kerja',
        dataIndex: 'durasiKerja',
        key: 'durasiKerja',
      },
      {
        title: 'Kekuranan jam kerja',
        dataIndex: 'kekuranganJamKerja',
        key: 'kekuranganJamKerja',
      },
    ];

    const data = [
      {
        key: '1',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
      {
        key: '2',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
      {
        key: '3',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
      {
        key: '4',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
      {
        key: '5',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
      {
        key: '6',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
      {
        key: '7',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
      {
        key: '8',
        idPegawai: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        durasiKerja: '40 Jam',
        kekuranganJamKerja: '0 Jam',
      },
    ]

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Laporan Absensi bulan Januari</h3>
        </div>

        <Table columns={columns} dataSource={data} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={cx('f', s.topSection, s.topLaporan)}>
          <DatePicker onChange={this.handleDateChange} picker="month" style={{ marginRight: 12 }}  />
          <Button type="primary" icon={<SearchOutlined />} />
          <Button type="primary" icon={<PrinterOutlined />} />
        </div>
        {this.viewTable()}
      </div>
    );
  }
}

export default LaporanAbsensi;