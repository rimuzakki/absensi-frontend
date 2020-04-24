import React, { Component } from 'react';
import { Layout, Menu, Row, Col, Radio, Input, Button } from 'antd';
import QrReader from "react-qr-reader";
// import QrReader from 'react-qr-scanner';
import Moment from 'react-moment';
import { UserOutlined } from '@ant-design/icons';
import s from './Absensi.module.scss';
import cx from 'classnames';

const { Header, Content } = Layout;

class Index extends Component {
  constructor() {
    super();
    this.state = {
      result: "No result",
      videoSrc: null,
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
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
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

  render() {
    return (
      <Layout className={s.layout}>
        <Header className={s.header}>
          <div className={s.logo}>Data Driven Systems</div>
          <Menu mode="horizontal" className={s.menu}>
            <Menu.Item key="1"><UserOutlined /></Menu.Item>
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
                  <div className={s.buttonInOut}>
                    <Radio.Group defaultValue="a" buttonStyle="solid" className={s.radioButton}>
                      <Radio.Button value="a">Masuk</Radio.Button>
                      <Radio.Button value="b">Keluar</Radio.Button>
                    </Radio.Group>
                  </div>
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
                    <form className={s.formManual}>
                      <Input size="large" placeholder="Masukkan PIN anda" />
                      <Button type="primary" size="large" htmlType="submit">
                        Enter
                      </Button>
                    </form>
                    {/* <input type="button" value="Submit QR Code" onClick={() => this.openImageDialog()} /> */}
                  </div>
                </div>
              </Col>
              <Col md={{ span: 10, offset: 1 }} xl={{ span: 12, offset: 2 }}>
                <div className={s.infoArea}>
                  <h1>Masuk</h1>
                  <div className={s.photoUser}>
                    <UserOutlined />
                  </div>
                  <p className={s.clockIn}>
                    07.32
                  </p>
                  <div className={s.dataIn}>
                    <span>{this.state.result}</span>
                    <span className={s.pin}>30047</span>
                    <span>Rifqon Muzakki</span>
                    <small>System Development</small>
                  </div>
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