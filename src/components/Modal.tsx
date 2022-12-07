import React, { useState } from "react";
// import "antd/dist/antd.css";
// import "./index.css";
import { Button, Modal } from "antd";

type propType = {
  title: string;
  buttonName: string;
  children: any;
};

const ModalComponent: React.FC<propType> = ({
  title,
  buttonName,
  children,
}: propType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{ marginBottom: "8px" }}
        block
        size="large"
        type="primary"
        onClick={showModal}
      >
        {buttonName}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        {React.cloneElement(children, { handleCancel })}
      </Modal>
    </>
  );
};

export default ModalComponent;