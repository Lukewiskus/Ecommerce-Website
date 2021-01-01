import React from 'react';
import './styles.scss';

const EditProductModal = ({ hideEditProductModal, toggleEditProductModal, children }) => {
  if (hideEditProductModal) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleEditProductModal()} />,
    <div className="modalWrap">
      <div className="modal">
        {children}
      </div>
    </div>
  ];
}

export default EditProductModal;