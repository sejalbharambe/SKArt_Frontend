import React, { useState } from "react";
import { Modal, Image, Row, Col } from "antd";
import ProfileImages from "./ProfileImages";

const SelectProfileImage = ({ visible, onClose, onSelect }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title="Choose Profile Image"
    >
      <Row gutter={[16, 16]}>
        {ProfileImages.map((img, idx) => (
          <Col span={8} key={idx}>
            <Image
              src={img}
              preview={false}
              onClick={() => onSelect(img)}
              style={{
                borderRadius: "50%",
                cursor: "pointer",
                border: "2px solid #ffb6c1",
              }}
            />
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default SelectProfileImage;
