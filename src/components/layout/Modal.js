import React, { useRef } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;

  .modal {
    display: block;
    padding: 30px;
    min-width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: #fff;
    position: absolute;
    z-index: 100;
  }
`;

const Modal = ({ children, ...props }) => {
  const ref = useRef();

  // 모달 창 닫기
  const closeModal = (e) => {
    if (ref && !ref.current.contains(e.target)) {
      props.setIsOpen(false);
    }
  };

  return (
    <ModalContainer {...props} onClick={closeModal}>
      <div className="modal" ref={ref}>
        {children}
      </div>
    </ModalContainer>
  );
};

export default Modal;
