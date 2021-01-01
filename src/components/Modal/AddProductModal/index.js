  
import React from 'react';
import './styles.scss';

const AddProductModal = ({ hideProductModal, toggleProductModal, children }) => {
  if (hideProductModal) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleProductModal()} />,
    <div className="modalWrap">
      <div className="modal">
        {children}
      </div>
    </div>
  ];
}

export default AddProductModal;