import React, { Component } from 'react';
import { Table, Button, Input, Tooltip, message, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import axios from 'axios';
import UserForm from './UserForm';
import CreateUserForm from './CreateUserForm';
import s from '../Master.module.scss';

const { Search } = Input;

class MasterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
      modalVisible: false,
      modalCreateVisible: false,
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

  handleCreate = () => {
    this.setState({
      title: "Create new user",
      modalCreateVisible: true,
      // dataId: '',
      status: 'create',
      modalKey: Math.random(),
    })
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

  handleEdit = (e, data, status) => {
    e.preventDefault();
    console.log('data', data)
    this.setState({
      dataId: data,
      modalVisible: true,
      title: 'Edit User',
      status, 
      modalKey: Math.random(),
      currentPage: 1,
      pageSize: 8,
      total: 8,
      search: '',
    });
  }

  handleDelete = (data) => {
    console.log(data)
    this.setState({ isLoadingData: true, currentPage: 1 });
    axios.delete(`users/${data}`)
      .then(res => {
        this.setState({
          // data: res.data,
          isLoadingData: false,
        })
        this.fetchUser();
      })
      .catch(err => {
        this.setState({
          isLoadingData: false
        })
      })
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
      modalCreateVisible: false,
    });
  };

  handlePaginationClick = (e) => {
    this.setState({
      currentPage: e,
      isLoadingData: false
    })
  }

  handleSearch = (value) => {
    // console.log('value', value)
    this.setState({ isLoadingData: true, currentPage: 1 });
    if (value !== '') {
      axios.get(`users?username_contains=${value}`)
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
      this.fetchUser();
    }
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

  onCreate = (data) => {
    // console.log('onCreate', {data});
    this.setState({
      isLoadingData: true,
    })
    axios.post(`auth/local/register` , data)
      .then(result => {
        message.success('User created');
        this.fetchUser();
      }).catch(error => {
        message.error('Create user not successfull')
      })
      this.setState({
        isLoadingData: false,
        modalCreateVisible: false,
      })
  }

  onUpdate = (data) => {
    // console.log('onCreate', {data});
    const { dataId } = this.state;
    this.setState({
      isLoadingData: true,
    })
    axios.put(`users/${dataId}` , data)
      .then(result => {
        // console.log('xxx', result);
        message.success('User edited');
        this.fetchUser();
      }).catch(error => {
        message.error('Edit user not successfull')
      })
      this.setState({
        isLoadingData: false,
        modalVisible: false,
      })
  }

  viewTable = () => {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username - b.username,
        sortDirections: ['descend'],
      },
      {
        title: 'Full name',
        dataIndex: 'fullname',
        key: 'fullname',
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
              <Button type="link" icon={<EditOutlined />} onClick={(e) => this.handleEdit(e, record.id, 'edit')} />
            </Tooltip>
            <Tooltip title="Hapus">
            <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => this.handleDelete(record.id)}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button type="link" icon={<DeleteOutlined />} />
              </Popconfirm>
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
          <Button type="primary" icon={<PlusOutlined />} onClick={this.handleCreate}>
            Add User
          </Button>
          <Search 
            name="search"
            placeholder="input search text" 
            onSearch={(value) => this.handleSearch(value)} 
            onChange={this.handleChange}
            enterButton 
            allowClear
            style={{ width: 280 }}
          />
        </div>
        {this.viewTable()}

        {this.state.modalVisible &&
          <UserForm
            modalKey={this.state.modalKey}
            visible={this.state.modalVisible}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            loading={this.state.isLoadingData}
            title={this.state.title}
            data={this.state.dataId}
            status={this.state.status}
            // onCreate={this.onCreate}
            onUpdate={this.onUpdate}
          />
        }

        {this.state.modalCreateVisible &&
          <CreateUserForm
            modalKey={this.state.modalKey}
            visible={this.state.modalCreateVisible}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            loading={this.state.isLoadingData}
            title={this.state.title}
            // data={this.state.dataId}
            status={this.state.status}
            onCreate={this.onCreate}
            // onUpdate={this.onUpdate}
          />
        }

      </div>
    );
  }
}

export default MasterUser;