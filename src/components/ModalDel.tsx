import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'; 

interface ModalDelProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemToDeleteName: string | null;
  selectedItemsCount: number;
}

export const ModalDel: FC<ModalDelProps> = ({
  show,
  onClose,
  onConfirm,
  itemToDeleteName,
  selectedItemsCount,
}) => {
  const isDeletingSingleItem = itemToDeleteName !== null;
  const message = isDeletingSingleItem
    ? `Are you sure you want to delete "${itemToDeleteName}"?`
    : `Are you sure you want to delete ${selectedItemsCount} selected item(s)?`;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalDel.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemToDeleteName: PropTypes.string,
  selectedItemsCount: PropTypes.number.isRequired,
};

export default ModalDel;