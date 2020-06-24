import React, { Component } from 'react';
import { Table, Button, Input, Tooltip, message, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import axios from 'axios';
// import DivisionModalForm from './DivisionModalForm';
import DivisionForm from './DivisionForm';
// import _ from 'lodash';
import s from '../Master.module.scss';

const { Search } = Input;

class MasterJabatan extends Component {
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
    this.fetchDivisions();
  }

  fetchDivisions = () => {
    this.setState({ isLoadingData: true });
    axios.get(`divisions/`)
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreate = () => {
    this.setState({
      title: "Create new division",
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
      title: 'View Division',
      status, 
      modalKey: Math.random(),
    });
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

  handleEdit = (e, data, status) => {
    e.preventDefault();
    console.log('data', data)
    this.setState({
      dataId: data,
      modalVisible: true,
      title: 'Edit Division',
      status, 
      modalKey: Math.random(),
    });
  }

  handleDelete = (data) => {
    // console.log(data)
    this.setState({ isLoadingData: true, currentPage: 1 });
    axios.delete(`divisions/${data}`)
      .then(res => {
        this.setState({
          // data: res.data,
          isLoadingData: false,
        })
        this.fetchDivisions();
      })
      .catch(err => {
        this.setState({
          isLoadingData: false
        })
      })
  }

  handleSearch = (value) => {
    // console.log('value', value)
    this.setState({ isLoadingData: true, currentPage: 1 });
    if (value !== '') {
      axios.get(`divisions?division_name_contains=${value}`)
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
      this.fetchDivisions();
    }
  }

  handlePaginationClick = (e) => {
    this.setState({
      currentPage: e,
      isLoadingData: false
    })
  }

  onCreate = (data) => {
    // console.log('onCreate', {data});
    this.setState({
      isLoadingData: true,
    })
    axios.post(`divisions/` , data)
      .then(result => {
        // console.log('xxx', result);
        message.success('Division created');
        this.fetchDivisions();
      }).catch(error => {
        message.error('Create division not successfull')
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
    axios.put(`divisions/${dataId}` , data)
      .then(result => {
        // console.log('xxx', result);
        message.success('Division edited');
        this.fetchDivisions();
      }).catch(error => {
        message.error('Edit division not successfull')
      })
      this.setState({
        isLoadingData: false,
        modalVisible: false,
      })
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
        title: 'Work type',
        dataIndex: ['work_hours', 'work_type'],
        key: 'work_type',
      },
      {
        title: 'Start hour',
        dataIndex: ['work_hours', 'starting_hours'],
        key: 'starting_hours',
        render: text => <span>{text} WIB</span>,
      },
      {
        title: 'Finish hour',
        dataIndex: ['work_hours', 'finish_hours'],
        key: 'finish_hours',
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
          <h3>Master Divisions</h3>
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
            Add Division
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
          // <DivisionModalForm
          //   modalKey={this.state.modalKey}
          //   visible={this.state.modalVisible}
          //   onOk={this.handleOk}
          //   onCancel={this.handleCancel}
          //   loading={this.state.isLoadingData}
          //   title={this.state.title}
          //   data={this.state.dataId}
          //   status={this.state.status}
          // />
          <DivisionForm
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

export default MasterJabatan;