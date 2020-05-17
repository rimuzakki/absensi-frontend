import React, { Component } from 'react';
import { Table, Button, Input, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import axios from 'axios';

import s from '../Master.module.scss';

const { Search } = Input;

class MasterPegawai extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
      searchData: [],
    }
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  fetchEmployee = () => {
    this.setState({ isLoadingData: true });
    axios.get(`employees/`)
      .then(res => {
        console.log('res', res.data);
        this.setState({
          data: res.data,
          isLoadingData: false,
        })
      })
      .catch(err => {
        this.setState({
          isLoadingData: false
        })
      })
  }

  handleView = () => {

  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  handleSearch = (value) => {
    console.log('value', value)
    this.setState({ isLoadingData: true });
    if (value !== '') {
      axios.get(`employees?fullname_contains=${value}`)
        .then(res => {
          // console.log('res', res.data);
          this.setState({
            data: res.data,
            isLoadingData: false,
          })
        })
        .catch(err => {
          this.setState({
            isLoadingData: false
          })
        })
    } else {
      this.fetchEmployee();
    }
  }

  viewTable = () => {
    const columns = [
      {
        title: 'NIK',
        dataIndex: 'nik',
        key: 'nik'
      },
      {
        title: 'Name',
        dataIndex: 'fullname',
        key: 'fullname',
        sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Division',
        dataIndex: ['division', 'division_name'],
        key: 'division',
      },
      {
        title: 'Starting hour',
        dataIndex: ['division', 'work_hours', 'starting_hours'],
        key: 'starting_hours',
        render: text => <span>{text} WIB</span>,
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
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

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Master Employees</h3>
        </div>

        <Table columns={columns} dataSource={this.state.data} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={cx('f f-btw', s.topSection)}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Employee
          </Button>
          <Search 
            placeholder="input search text" 
            onSearch={(value) => this.handleSearch(value)} 
            enterButton 
            allowClear
            style={{ width: 280 }}
          />
        </div>

        {this.viewTable()}
      </div>
    );
  }
}

export default MasterPegawai;