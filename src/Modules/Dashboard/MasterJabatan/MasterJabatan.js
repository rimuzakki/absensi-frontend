import React, { Component } from 'react';
import { Table, Button, Input, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import axios from 'axios';
import s from '../Master.module.scss';

const { Search } = Input;

class MasterJabatan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
    }
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  fetchEmployee = () => {
    this.setState({ isLoadingData: true });
    axios.get(`divisions/`)
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

  viewTable = () => {
    const columns = [
      {
        title: 'ID Division',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Division name',
        dataIndex: 'division_name',
        key: 'division_name',
        sorter: (a, b) => a.division_name.localeCompare(b.division_name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Start hour',
        dataIndex: ['work_hours', 'starting_hours'],
        key: 'starting_hour',
        render: text => <span>{text} WIB</span>,
      },
      {
        title: 'Finish hour',
        dataIndex: ['work_hours', 'finish_hours'],
        key: 'finish_hour',
        render: text => <span>{text} WIB</span>,
      },
      {
        title: 'Total hours',
        dataIndex: ['work_hours', 'total_hours'],
        key: 'total_hours',
        render: text => <span>{text} hours</span>,
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
          <h3>Master Divisions</h3>
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
            Add Division
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