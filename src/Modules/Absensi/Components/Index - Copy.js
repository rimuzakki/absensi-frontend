import React, { Component } from 'react';
import QrReader from 'react-qr-reader'

class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }

  handleError = (err) => {
    console.error(err)
  }

  openImageDialog = () => {
    const { qrReader1 } = this.refs;
    qrReader1.openImageDialog();
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return (
      <div>
        <h1>Absensi</h1>
        <div>
          <QrReader
            ref="qrReader1"
            legacyMode
            delay={300}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <p>{this.state.result}</p>
        </div>
        <input type="button" value="Submit QR Code" onClick={this.openImageDialog} />
      </div>
      
    );
  }
}

export default Index;