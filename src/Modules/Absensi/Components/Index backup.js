import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Radio, Input, Button, Form, Card, message } from 'antd';
import QrReader from "react-qr-reader";
// import QrReader from 'react-qr-scanner';
import Moment from 'react-moment';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import s from './Absensi.module.scss';
import cx from 'classnames';
import _ from 'lodash';
import axios from 'axios';
import beep from '../../../beep.mp3';
import error from '../../../error.mp3'
import { ClockCircleTwoTone } from '@ant-design/icons';

const { Header, Content } = Layout;

const audio = new Audio(beep);
const audioFalse = new Audio(error);

class Index extends Component {
  constructor() {
    super();
    this.state = {
      result: "No result",
      videoSrc: null,
      radioValue: 1,
      isLoading: false,
      dataEmployee: [],
      dataPresence: [],
      playBeep: false,
      playFalse: false,
      cooldown: false,
    };
  }

  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          video: true
        },
        function(localMediaStream) {
          // this.setState({ videoSrc: window.URL.createObjectURL(localMediaStream) });
        },
        function(err) {
          alert("The following error occurred when trying to access the camera: " + err);
        }
      );
    } else {
      alert("Sorry, browser does not support camera access");
    }
    audio.addEventListener('ended', () => this.setState({ playBeep: false }));
    audioFalse.addEventListener('ended', () => this.setState({ playFalse: false }));
  }

  componentWillUnmount() {
    audio.removeEventListener('ended', () => this.setState({ playBeep: false }));  
    audioFalse.removeEventListener('ended', () => this.setState({ playFalse: false }));  
  }

  getEmployee = (nik, callback = null) => {
    this.setState({
      isLoading: true,
    })
    axios.get(`employees?nik=${nik}`)
      .then(res => {
        console.log('res', res.data);
        if (res.data.length > 0) {
          this.setState({
            dataEmployee: res.data,
            isLoading: false,
            playBeep: true,
          })
          console.log('state', this.state.dataEmployee)
          this.state.playBeep ? audio.play() : audio.pause();
          callback();
        } else {
          this.setState({
            dataEmployee: 'notfound',
            isLoading: false,
            playFalse: true,
          })
          this.state.playFalse ? audioFalse.play() : audioFalse.pause();
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        console.error(err);
      })
  }

  handleScan = (data) => {
    const { cooldown } = this.state; 
    if (cooldown === false && data) {
      this.setState({
        result: data,
        // playBeep: true,
      });
      // this.state.playBeep ? audio.play() : audio.pause();
      console.log('resultScan', data);
      let nik = '';
      if (data.idEmployee) {
        nik = data.idEmployee;
      } else {
        nik = data;
      }
      this.getEmployee(nik, () => {
        this.onFinishForm(nik);
      });
    }
  };

  handleError = err => {
    console.error(err);
  };

  openImageDialog = () => {
    // this.refs.qrReader1.openImageDialog()
    this.videoStream.openImageDialog();
  }

  // onChangeRadio = (e) => {
  //   console.log('radio checked', e.target.value);
  //   this.setState({
  //     radioValue: e.target.value,
  //   });
  // };

  onFinishForm = (values) => {
    const { 
            // radioValue, 
            dataEmployee 
          } = this.state;
  
    const dateIn = moment().format('YYYY-MM-DD');
    const nik = values;
    const idPresence = _.join([dateIn, nik], '-');
    // const isWorking = radioValue === 1;
    // const isFinish = radioValue === 0;
    const timeNow = moment('10:00', 'HH:mm');
    const timeNowStr = moment(timeNow).format("HH:mm:ss");
    // const timeOut = radioValue === 0 ? moment() : null;
    // const timeOutStr = moment(timeOut).format("HH:mm");

    console.log('timeNow', timeNow);

    // const idHelper = dataEmployee[0].id;

    const employeeStartHour = dataEmployee[0].division.work_hours.starting_hours;
    const startHour = moment(employeeStartHour, 'HH:mm');

    const diffTime = moment.duration(timeNow.diff(startHour));
    const hoursLate = diffTime.hours();
    const minutesLate = diffTime.minutes();
    const lateTime = _.join([hoursLate, minutesLate], ':');
    const lateTimeStr = moment(lateTime, 'HH:mm').format('HH:mm');
    console.log('lateTime', lateTimeStr);

    const totalMinutesLate = diffTime.asMinutes();
    const toHours = moment(totalMinutesLate).minutes('HH:mm');
    console.log('telat menit', totalMinutesLate, toHours);

    const minutesDuration = diffTime.asMinutes() - 60;
    console.log('workDuration', minutesDuration);

    const dataPost = {
      "id_presence": idPresence,
      "presence_date": dateIn,
      "time_in": timeNowStr,
      "employee": nik,
    }

    // let dataPost = {};
    // if (radioValue === 1) {
    //   dataPost = {
    //     "id_presence": idPresence,
    //     // "is_working": isWorking,
    //     "presence_date": dateIn,
    //     "time_in": timeNowStr,
    //     // "time_out": null,
    //     // "minutes_late": totalMinutesLate,
    //     // "work_minutes_duration": 0,
    //     // "status": null,
    //     // "is_finish": isFinish,
    //     "employee": nik,
    //   }
    // } else {
    //   dataPost = {
    //     // "id_presence": idPresence,
    //     // "is_working": isWorking,
    //     // "presence_date": dateIn,
    //     // "time_in": timeNowStr,
    //     "time_out": timeNowStr,
    //     // "minutes_late": totalMinutesLate,
    //     "work_minutes_duration": minutesDuration,
    //     // "status": null,
    //     "is_finish": isFinish,
    //     // "employee": {
    //     //   "nik": nik,
    //     // }
    //   }
    // }
    console.log('dataPost', dataPost);

    if (radioValue === 1) {
      this.setState({
        isLoading: true,
      })
      axios.post(`presences/`, dataPost)
        .then(result => {
          console.log('result', result);
          this.setState({
            dataPresence: dataPost,
            cooldown: true,
          })
        }).catch(error => {
          message.error('Check in not successfull')
        })
        this.setState({
          isLoading: false,
        })
        setTimeout(() => {
          this.setState({
            dataPresence: [],
            dataEmployee: [],
            cooldown: false,
          })
        }, 2500);

    } else {

      this.setState({
        isLoading: true,
      })
      axios.put(`presences/${nik}` , dataPost)
        .then(result => {
          console.log('result', result);
          this.getEmployee(nik);
          this.setState({
            dataPresence: dataPost,
            cooldown: true,
          })
        }).catch(error => {
          message.error('Check out not successfull')
        })
        this.setState({
          isLoading: false,
        })
        setTimeout(() => {
          this.setState({
            dataPresence: [],
            dataEmployee: [],
            cooldown: false,
          })
        }, 2500);
    }
  }

  render() {
    const { dataEmployee, dataPresence, radioValue } = this.state;
    return (
      <Layout className={s.layout}>
        <Header className={s.header}>
          <div className={s.logo}>Data Driven Systems</div>
          <Menu mode="horizontal" className={s.menu}>
            <Menu.Item key="1">
              <Link to='/login'>
                <UserOutlined />
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div className={s.contentLayout}>
            <Row>
              <Col md={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
                <div className={s.absenArea}>
                  <div className={cx('f', s.dateTimeBox)}>
                    <Moment
                      className={s.date}
                      format="D MMMM YYYY"
                    />
                    <Moment 
                      className={s.time}
                      interval={1000} 
                      format="HH:mm:ss"
                    />
                  </div>
                  {/* <div className={s.buttonInOut}>
                    <Radio.Group 
                      // defaultValue="a" 
                      buttonStyle="solid" 
                      className={s.radioButton}
                      onChange={this.onChangeRadio} 
                      value={this.state.radioValue}
                    >
                      <Radio.Button value={1}>Masuk</Radio.Button>
                      <Radio.Button value={0}>Keluar</Radio.Button>
                    </Radio.Group>
                  </div> */}
                  <div className={s.qrBox}>
                    <h1>Silahkan scan QR Code anda</h1>
                    <QrReader 
                      className={s.qrVideo}
                      delay={500}
                      onError={this.handleError}
                      onScan={this.handleScan}
                      style={{ width: 240 }}
                      ref={ (videoStream) => { this.videoStream = videoStream } }
                      // legacyMode
                    />
                    <p>atau masukkan PIN secara manual</p>

                    <Form name="absenForm" className={s.formManual} onFinish={this.handleScan}>
                    <Form.Item
                      name="idEmployee"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your ID!',
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Masukkan PIN anda" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" size="large" htmlType="submit">
                        Enter
                      </Button>
                    </Form.Item>
                    </Form>
                    {/* <input type="button" value="Submit QR Code" onClick={() => this.openImageDialog()} /> */}
                    
                  </div>
                </div>
              </Col>
              <Col md={{ span: 10, offset: 1 }} xl={{ span: 12, offset: 2 }}>
                <div className={s.infoArea}>
                  <h1>
                    {radioValue === 1 ? 'Masuk' : 'Keluar'}
                  </h1>
                  <div className={s.photoUser}>
                    <UserOutlined />
                  </div>
                  {dataEmployee.length > 0 && dataEmployee !== 'notfound' ?
                  <Card className={s.card} bordered={false}>
                    <p className={s.clockIn}>
                      {dataPresence.time_in ?
                        <React.Fragment>
                        <ClockCircleTwoTone style={{ marginRight: 8 }} /> 
                        {moment(dataPresence.time_in, 'HH:mm').format('HH:mm')}
                        </React.Fragment>
                      : null }
                    </p>
                
                    { dataEmployee.map((c, i) => (
                      <div key={i} className={s.dataIn}>
                        <h3 className={s.pin}>{c.nik}</h3>
                        <h1>{c.fullname}</h1>
                        <small>{c.division.division_name}</small>
                      </div>
                    ))}
                    </Card>
                  : null }
                  { dataEmployee === 'notfound' ? 
                    <h1>Employee not found</h1>
                  : null }
                  { dataEmployee.length === 0 ?
                    <h1>Data belum tersedia</h1>   
                  : null
                  }
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Index;