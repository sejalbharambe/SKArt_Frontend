import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { postArtwork } from "../Redux/Slices/ArtworkSlice";

const { Option } = Select;

const AddArtworkModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState(null);

  const categories = [
    "Portrait",
    "Landscape",
    "Abstract",
    "Modern Art",
    "Surrealism",
    "Realism",
    "Pop Art",
    "Impressionism"
  ];

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0].originFileObj);
      reader.onload = () => setPreview(reader.result);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (!fileList[0]) {
        return; // or show error
      }
      const payload = new FormData();
      payload.append("artName", values.artName);
      payload.append("artistName", values.artistName);
      payload.append("category", values.category);
      payload.append("imageFile", fileList[0].originFileObj);

      dispatch(postArtwork(payload))
        .unwrap()
        .then(() => {
          form.resetFields();
          setFileList([]);
          setPreview(null);
          onClose();
        })
        .catch(err => console.error(err));
    });
  };

  return (
    <Modal
      open={visible}
      title="Add Artwork"
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Upload"
    >
      <Form form={form} layout="vertical">
        {/* Image Upload */}
        <Form.Item label="Artwork Image" required>
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // prevent auto upload
            fileList={fileList}
            onChange={handleUploadChange}
            accept="image/*"
          >
            {fileList.length === 0 && <PlusOutlined style={{ fontSize: "32px" }} />}
          </Upload>
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: "100%", marginTop: 10, borderRadius: 4 }}
            />
          )}
        </Form.Item>

        {/* Art Name */}
        <Form.Item
          label="Art Name"
          name="artName"
          rules={[{ required: true, message: "Please enter artwork name" }]}
        >
          <Input />
        </Form.Item>

        {/* Artist Name */}
        <Form.Item
          label="Artist Name"
          name="artistName"
          rules={[{ required: true, message: "Please enter artist name" }]}
        >
          <Input />
        </Form.Item>

        {/* Category Dropdown */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            {categories.map(cat => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddArtworkModal;
