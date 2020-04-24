import React, { Component } from 'react';
import ReactiveQR from "reactive-qr";

class Index extends Component {
  render() {
    return (
      // <div>
      //   <ReactiveQR onCode={code => console.log(code)} />
      // </div>

      <div style={{ width: 300, border: "1px solid #f7f7f7" }}>
        <ReactiveQR onInit={console.log} onCode={console.log} />
      </div>
    );
  }
}

export default Index;