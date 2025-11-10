import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, InputNumber, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { postArtwork } from "../Redux/Slices/ArtworkSlice";

const { Option } = Select;
const { TextArea } = Input;

const AddArtworkModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState(null);

  // ✅ get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.userId);

  const categories = [
    "Fine Arts",
    "Craft and Design",
    "Digital And Media Art",
    "Cultural/Traditional Art",
    "Decorative/LifeStyle Art",
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
        return;
      }

      const payload = new FormData();
      payload.append("artName", values.artName);
      payload.append("artistName", user?.artistSignature || ""); // ✅ auto from localStorage
      payload.append("category", values.category);
      payload.append("size", values.size);
      payload.append("paintedOn", values.paintedOn);
      payload.append("price", values.price);
      payload.append("sold", values.sold);
      payload.append("description", values.description); // ✅ added description
      payload.append("userId", user?.userId); // ✅ from localStorage
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
            beforeUpload={() => false}
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

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter artwork description" }]}
        >
          <TextArea rows={3} placeholder="Describe your artwork" />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            {categories.map(cat => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Size */}
        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: "Please enter size (e.g., 12x18 inches)" }]}
        >
          <Input placeholder="e.g. 12x18 inches" />
        </Form.Item>

        {/* Painted On */}
        <Form.Item
          label="Painted On"
          name="paintedOn"
          rules={[{ required: true, message: "Please specify what it’s painted on (e.g., canvas, paper)" }]}
        >
          <Input placeholder="e.g. Canvas, Paper" />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price (₹)"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter price" />
        </Form.Item>

        {/* Sold Status */}
        <Form.Item
          label="Sold"
          name="sold"
          valuePropName="checked"
          tooltip="Toggle if the artwork is already sold"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddArtworkModal;
