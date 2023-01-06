import React, { useState } from "react";
import { Button, Modal } from "antd";

type propType = {
  title: string;
  buttonName: string;
  children: any;
  disabled?: boolean;
};

const ModalComponent: React.FC<propType> = ({
  title,
  buttonName,
  children,
  disabled,
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
        disabled={disabled}
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
