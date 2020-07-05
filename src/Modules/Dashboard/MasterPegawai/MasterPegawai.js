import React, { Component } from 'react';
import { Table, Button, Input, Tooltip, Popconfirm, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import axios from 'axios';
import { connect } from 'react-redux';
import {setBreadcrumb} from '../../../Redux/Actions';
import EmployeeForm from './EmployeeForm';

import s from '../Master.module.scss';

const { Search } = Input;

class MasterPegawai extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
      searchData: [],
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
    this.props.setBreadcrumb('Employees');
    this.fetchEmployees();
  }

  fetchEmployees = () => {
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

  onCreate = (data) => {
    // console.log('onCreate', {data});
    this.setState({
      isLoadingData: true,
    })
    axios.post(`employees/` , data)
      .then(result => {
        message.success('employee created');
        this.fetchEmployees();
      }).catch(error => {
        message.error('Create employee not successfull')
      })
      this.setState({
        isLoadingData: false,
        modalVisible: false,
      })
  }

  onUpdate = (data) => {
    // console.log('onCreate', {data});
    const { dataId } = this.state;
    this.setState({
      isLoadingData: true,
    })
    axios.put(`employees/${dataId}` , data)
      .then(result => {
        // console.log('xxx', result);
        message.success('Employee edited');
        this.fetchEmployees();
      }).catch(error => {
        message.error('Edit employee not successfull')
      })
      this.setState({
        isLoadingData: false,
        modalVisible: false,
      })
  }

  handleOk = e => {
    // console.log(e);
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

  handleCreate = () => {
    this.setState({
      title: "Create new employee",
      modalVisible: true,
      dataId: '',
      status: 'create',
      modalKey: Math.random(),
    })
  }

  handleView = (data, status) => {
    this.setState({
      dataId: data,
      modalVisible: true,
      title: 'View Employee',
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
      title: 'Edit Employee',
      status, 
      modalKey: Math.random(),
    });
  }


  handleDelete = (data) => {
    // console.log(data)
    this.setState({ isLoadingData: true, currentPage: 1 });
    axios.delete(`employees/${data}`)
      .then(res => {
        this.setState({
          // data: res.data,
          isLoadingData: false,
        })
        this.fetchEmployees();
      })
      .catch(err => {
        this.setState({
          isLoadingData: false
        })
      })
  }

  handleSearch = (value) => {
    console.log('value', value)
    this.setState({ isLoadingData: true, currentPage: 1 });
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
      this.fetchEmployees();
    }
  }

  handlePaginationClick = (e) => {
    this.setState({
      currentPage: e,
      isLoadingData: false
    })
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
              <Button type="link" icon={<EyeOutlined />} onClick={() => this.handleView(record.id, 'view')} />
            </Tooltip>
            <Tooltip title="Edit">
              <Button type="link" icon={<EditOutlined />} onClick={(e) => this.handleEdit(e, record.id, 'edit')} />
            </Tooltip>
            <Tooltip title="Hapus">
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => this.handleDelete(record.id)}
                // onCancel={cancel}
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
          <h3>Master Employees</h3>
        </div>

        <Table 
          columns={columns} 
          dataSource={this.state.data} 
          loading={this.state.isLoadingData} 
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

        {this.state.modalVisible &&
          <EmployeeForm
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            modalKey={this.state.modalKey}
            visible={this.state.modalVisible}
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

const mapStateToProps = (state) => {
  return {
    breadcrumb: state.breadcrumb,
  }
}

export default connect(mapStateToProps, { setBreadcrumb })(MasterPegawai);