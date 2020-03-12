import React from 'react';
import { Spin } from 'antd';

class PageLoader extends React.Component {
  render() {
    // return <Skeleton active />;
    return (
      <div className="f f-ctr mdl" style={{ position: 'fixed', height: '100vh', width: '100vw', left: 0, top: 0 }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }
}

export default PageLoader;
