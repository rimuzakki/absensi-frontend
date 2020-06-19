import React, { Component } from 'react';
import { Table, Button, Input, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import axios from 'axios';
import UserForm from './UserForm';
import s from '../Master.module.scss';

const { Search } = Input;

class MasterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
      modalVisible: false,
      title: '',
      status: '',
      dataId: '',
      modalKey: Math.random(),
      currentPage: 1,
      pageSize: 8,
      total: 8,
      search: '',
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleView = (data, status) => {
    this.setState({
      dataId: data,
      modalVisible: true,
      title: 'View Division',
      status, 
      modalKey: Math.random(),
    });
  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  handleOk = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

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
            <Button type="link" icon={<EyeOutlined />} onClick={() => this.handleView(record.id, 'view')} />
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

    let uniqueId = 0;

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Master Users</h3>
        </div>

        <Table 
          columns={columns} 
          dataSource={this.state.data} 
          rowKey={(record) => {
            if (!record.__uniqueId)
              record.__uniqueId = ++uniqueId;
            return record.__uniqueId;
          }}
          pagination={{ 
            position: 'bottom', 
            current: this.state.currentPage, 
            pageSize: this.state.pageSize, 
            // total: this.state.total, 
            onChange: this.handlePaginationClick
          }}  
        />
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

        {this.state.modalVisible &&
          <UserForm
            modalKey={this.state.modalKey}
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            loading={this.state.isLoadingData}
            title={this.state.title}
            data={this.state.dataId}
            status={this.state.status}
            onCreate={this.onCreate}
            onUpdate={this.onUpdate}
          />
        }
      </div>
    );
  }
}

export default MasterUser;