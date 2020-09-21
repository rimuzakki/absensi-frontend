import React, { Component } from 'react';
import { Table, Button, DatePicker, Select } from 'antd';
import { SearchOutlined, PrinterOutlined } from '@ant-design/icons';
// import Moment from 'react-moment';
import moment from 'moment';
import cx from 'classnames';
import axios from 'axios';
import s from '../Master.module.scss';
import { connect } from 'react-redux';
import {setBreadcrumb} from '../../../Redux/Actions';
import Container from '../../../Layout/Container/Container';
// import qs from 'querystring';

const { Option } = Select;

class LaporanAbsensi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      dataPresences: [],
      dataEmployees: [],
      dateSearch: moment().format('YYYY-MM'),
      nikSearch: '',
    }
  }

  componentDidMount() {
    const monthNow = moment().format('YYYY-MM');

    this.fetchPresences(monthNow);
    this.props.setBreadcrumb('Report');
    this.fetchEmployees();
  }

  fetchPresences = (date, nik) => {
    console.log(date, nik)
    this.setState({ isLoadingData: true });

    // let query = qs.stringify({
    //   _where: [{ id_presence_contains: date }, { id_presence_contains: nik }],
    // });

    let query = '';
    if (date && nik) {
      query = `presences?_where[0][id_presence_contains]=${date}&_where[1][id_presence_contains]=${nik}`;
    } else {
      query = `presences/`
    }

    console.log('query', query)

    axios.get(query)
      .then(res => {
        // console.log('res', res.data);
        this.setState({
          dataPresences: res.data,
          isLoadingData: false,
        })
      })
      .catch(err => {
        this.setState({
          isLoadingData: false
        })
      })
  }

  fetchEmployees = () => {
    this.setState({ isLoadingData: true });
    axios.get(`employees/`)
      .then(res => {
        // console.log('res', res.data);
        this.setState({
          dataEmployees: res.data,
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

  handleDateChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      dateSearch: dateString
    })
    // this.fetchPresences(dateString);
  }

  handleNameChange = (value) => {
    console.log(`selected ${value}`);
    // this.fetchPresences('', value);
    this.setState({
      nikSearch: value
    })
  }

  handleSearchName = (val) => {
    console.log('search:', val);
  }

  viewTable = () => {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id_presence',
        key: 'id_presence'
      },
      {
        title: 'NIK',
        dataIndex: ['employee', 'nik'],
        key: 'nik'
      },
      {
        title: 'Date',
        dataIndex: 'presence_date',
        key: 'presence_date'
      },
      {
        title: 'Name',
        dataIndex: ['employee', 'fullname'],
        key: 'fullname',
        sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        sortDirections: ['descend', 'ascend'],
      },
      // {
      //   title: 'Division',
      //   dataIndex: ['employee', 'division'],
      //   key: 'division',
      // },
      {
        title: 'Start hour',
        dataIndex: 'time_in',
        key: 'starting_hours',
      },
      {
        title: 'Finish hour',
        dataIndex: 'time_out',
        key: 'finish_hours',
      },
      // {
      //   title: 'Duration of work hours',
      //   dataIndex: ['presences', 'work_minutes_duration'],
      //   key: 'work_minutes_duration'
      // }
    ];

    let uniqueId = 0;

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>January presences report </h3>
        </div>

        <Table 
          columns={columns} 
          dataSource={this.state.dataPresences} 
          rowKey={(record) => {
            if (!record.__uniqueId)
              record.__uniqueId = ++uniqueId;
            return record.__uniqueId;
          }}
        />
      </div>
    )
  }

  render() {
    const monthNow = moment();
    const { dataEmployees, dateSearch, nikSearch } = this.state;
    return (
      <Container>
        <div className={cx('f', s.topSection, s.topLaporan)}>
          <DatePicker 
            onChange={this.handleDateChange} 
            picker="month" 
            defaultValue={monthNow}
            style={{ marginRight: 12 }} 
          />
          <Select
            showSearch
            style={{ width: 200, marginRight: 12 }}
            placeholder="Select a employee"
            optionFilterProp="children"
            onChange={this.handleNameChange}
            onSearch={this.handleSearchName}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            { dataEmployees.map((c, i) => (
              <Option key={c.id} value={c.nik}>{c.fullname}</Option>
            ))}
          </Select>
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            onClick={() => this.fetchPresences(dateSearch, nikSearch)} 
          />
          <Button type="primary" icon={<PrinterOutlined />} />
        </div>
        {this.viewTable()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    breadcrumb: state.breadcrumb,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setBreadcrumb: () => {
//       dispatch(setBreadcrumb())
//     },
//   }
// }

export default connect(mapStateToProps, { setBreadcrumb })(LaporanAbsensi);