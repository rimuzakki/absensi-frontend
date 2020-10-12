import React from 'react';
import { Modal, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import s from '../Master.module.scss';
import QRCode from "react-qr-code";
import _ from 'lodash';

export default function ModalIdCard(props) {
  const { data } = props;
  const division = _.get(data, 'division.division_name');

  console.log('id', division)
  return (
    <Modal
      key={props.modalKey}
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={props.onOk}
      footer={
        [
          <Button key="back" onClick={props.onCancel}>
            Close
          </Button>,
          <Button type="primary" key="print" icon={<PrinterOutlined />} onClick={() => window.print()}>
            Print
          </Button>
        ]
      }
    >
      <div className={s.idCard}>
        <h3>{data.nik}</h3>
        <h4>{data.fullname}</h4>
        <h4>{division}</h4>
        <div className={s.qrCode}>
          <QRCode value={data.nik} />
        </div>
      </div>
    </Modal>
  )
}