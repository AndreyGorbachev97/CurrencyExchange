import React, { useState, useMemo } from "react";
import InputMask from "react-input-mask";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
  message,
  Input,
} from "antd";
import classes from "./FormAddCard.module.css";
import { sendCard } from "../../store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { moon } from "../../utils/moonAlgorithm";

const normFile = (e: any) => {
  console.log("Upload event:", e);
  // if (Array.isArray(e)) {
  //   return e;
  // }
  // return e?.fileList;
};

const FormAddCard: React.FC = () => {
  const { auth } = useAppSelector((state) => state.authReducer);
  const [fileList, setFileList] = useState(null);
  const dispatch = useAppDispatch();
  const onFinish = ({ cardNumber }: any) => {
    dispatch(
      sendCard({
        cardNumber: cardNumber.replaceAll(" ", ""),
        file: fileList,
        username: auth.username,
      })
    );
  };

  const validateFileType = (
    { type, name }: UploadFile,
    allowedTypes?: string
  ) => {
    if (!allowedTypes) {
      return true;
    }

    if (type) {
      return allowedTypes.includes(type);
    }
  };

  const uploadProps = useMemo(
    () => ({
      beforeUpload: (file: UploadFile) => {
        setFileList(file);
        return false;
      },
      // onRemove: (file: UploadFile) => {
      //   if (fileList.some((item: any) => item.uid === file.uid)) {
      //     setFileList((fileList: any) =>
      //       fileList.filter((item: any) => item.uid !== file.uid)
      //     );
      //     return true;
      //   }
      //   return false;
      // },
    }),
    [fileList]
  );

  return (
    <div className={classes.container}>
      <Form layout="vertical" name="validate_other" onFinish={onFinish}>
        <Form.Item
          label="Номер карты"
          name="cardNumber"
          rules={[
            { required: true, message: "Введите номер карты" },
            () => ({
              validator(_, value) {
                if (value.length > 19 && !moon(value.replaceAll(" ", ""))) {
                  return Promise.reject(new Error("Номер карты не валиден"));
                }
                if (value.length < 19) {
                  return Promise.reject(
                    new Error("Номер карты должен быть не менее 16 символов")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputMask
            mask="9999 9999 9999 999999"
            alwaysShowMask={true}
            maskPlaceholder=""
          >
            <Input placeholder="" />
          </InputMask>
          {/* <Input /> */}
        </Form.Item>

        <Form.Item
          label="Фото карты"
          rules={[{ required: true, message: "Приложите фото карты" }]}
        >
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              name="files"
              listType="picture-card"
              // showUploadList={false}
              // disabled={fileList}
              {...uploadProps}
              fileList={fileList}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Нажмите или перетащите фото с номером карты в эту область, чтобы
                загрузить
              </p>
              <p className="ant-upload-hint">
                Фото карты необходимо сделать на фоне лица.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Button
          className={classes.submitButton}
          type="primary"
          htmlType="submit"
        >
          Добавить карту
        </Button>
      </Form>
    </div>
  );
};

export default FormAddCard;
