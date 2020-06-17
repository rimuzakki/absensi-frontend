import React, { Component } from 'react';
import { Table, Button, Input, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import axios from 'axios';
import s from '../Master.module.scss';

const { Search } = Input;

class MasterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleView = () => {

  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  fetchUser = () => {
    this.setState({ isLoadingData: true });
    axios.get(`users/`)
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
  }

  viewTable = () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'fullname',
        key: 'fullname',
        sorter: (a, b) => a.fullname - b.fullname,
        sortDirections: ['descend'],
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Role',
        dataIndex: ['role', 'name'],
        key: 'role',
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
          <h3>Master Users</h3>
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
            Add User
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

export default MasterUser;