import React, { Component } from 'react';
import { Table, Button, Input, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import s from '../Master.module.scss';

const { Search } = Input;

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
        title: 'No Telp',
        dataIndex: 'noTelp',
        key: 'noTelp',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span className={s.action}>
            <Tooltip title="Lihat">
              <a href="/#" onClick={this.handleView}><EyeOutlined /></a>
            </Tooltip>
            <Tooltip title="Edit">
              <a href="/#" onClick={this.handleEdit}><EditOutlined /></a>
            </Tooltip>
            <Tooltip title="Hapus">
              <a href="/#" onClick={this.handleDelete}><DeleteOutlined /></a>
            </Tooltip>
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
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Master Pegawai</h3>
        </div>

        <Table columns={columns} dataSource={data} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={cx('f f-btw', s.topSection)}>
          <Button type="primary" icon={<PlusOutlined />}>
            Tambah Pegawai
          </Button>
          <Search 
            placeholder="input search text" 
            onSearch={value => console.log(value)} 
            enterButton 
            style={{ width: 280 }}
          />
        </div>

        {this.viewTable()}
      </div>
    );
  }
}

export default MasterPegawai;