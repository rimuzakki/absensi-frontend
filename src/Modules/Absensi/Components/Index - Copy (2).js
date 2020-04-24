import React, { Component } from 'react';
import QrScanner from 'qr-scanner';
import QrScannerWorkerPath from '../../../../node_modules/qr-scanner/qr-scanner-worker.min.js';
QrScanner.WORKER_PATH = QrScannerWorkerPath;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camHasCamera: false,
    }
  }

  componentDidMount() {
    this.handleHasCamera();
  }

  setResult = (label, result) => {
    label.textContent = result;
    // camQrResultTimestamp.textContent = new Date().toString();
    label.style.color = 'teal';
    clearTimeout(label.highlightTimeout);
    label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
  }

  handleHasCamera = () => {
    // const { camHasCamera } = this.state;
    QrScanner.hasCamera()
      .then(hasCamera => {
        this.setState({
          camHasCamera: hasCamera,
        })
      })
  }

  // fileSelector = () => {
  //   document.addEventListener('change', event => {
  //     const file = fileSelector.files[0];
  //     if (!file) {
  //         return;
  //     }
  //     QrScanner.scanImage(file)
  //       .then(result => setResult(fileQrResult, result))
  //       .catch(e => setResult(fileQrResult, e || 'No QR code found.'));
  //   });
  // }
  

  render() {
    const { camHasCamera } = this.state;

    // const scanner = new QrScanner(video, result => setResult(camQrResult, result));
    // scanner.start();

    // const qrScanner = new QrScanner(this.videoElem, result => console.log('decoded qr code:', result));
    // qrScanner.start();

    fileSelector.addEventListener('change', event => {
      const file = fileSelector.files[0];
      if (!file) {
          return;
      }
      QrScanner.scanImage(file)
          .then(result => setResult(fileQrResult, result))
          .catch(e => setResult(fileQrResult, e || 'No QR code found.'));
    });

    return (
      <div>
        <h1>Scan from WebCam:</h1>
        <div>
          <b>Device has camera: </b>
          <span id="cam-has-camera">
            {camHasCamera ? 'ada' : 'tidak ada'}
          </span>
          <br />
          <video 
            muted playsInline id="qr-video"
            ref={ (videoElem) => { this.videoElem = videoElem } } 
          />
        </div>
      </div>
    );
  }
}

export default Index;