import React, { Component } from 'react';
import jsQR from "jsqr";

class Index extends Component {
  render() {
    // const code = jsQR(imageData, '200px', '200px', attemptBoth);

    // if (code) {
    //   console.log("Found QR code", code);
    // }

    return (
      <div>
        {jsQR()}
      </div>
    );
  }
}

export default Index;