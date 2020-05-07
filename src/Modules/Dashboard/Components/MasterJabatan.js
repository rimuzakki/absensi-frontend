import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import s from './Master.module.scss';

const { Search } = Input;

class MasterJabatan extends Component {

  handleView = () => {

  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  viewTable = () => {
    const columns = [
      {
        title: 'ID Jabatan',
        dataIndex: 'idJabatan',
        key: 'idJabatan',
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
            <a href="/#" onClick={this.handleView}><EyeOutlined /></a>
            <a href="/#" onClick={this.handleEdit}><EditOutlined /></a>
            <a href="/#" onClick={this.handleDelete}><DeleteOutlined /></a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '2',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '3',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '4',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '5',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '6',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '7',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
      {
        key: '8',
        idJabatan: '1234561',
        name: 'Rifqon Muzakki',
        jabatan: 'Programmer',
        jamKerja: '08.00 - 17.00',
        noTelp: '085111111111',
      },
    ]

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Master Jabatan</h3>
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
            Tambah Jabatan
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

export default MasterJabatan;