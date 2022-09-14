/**
 * 경고창으로 쓸지말지
 */
import React from "react";
import styled from "styled-components";

import Modal from "./layout/Modal";

const AlertContainer = styled(Modal)`
  .modal {
    ${(props) => props.theme.centerModal}
    min-width: 300px;
    max-width: 700px;
    height: 100px;
  }
`;

const Alert = (props) => {
  return (
    <AlertContainer {...props}>
      <p>검색어를 입력해주세요.</p>
    </AlertContainer>
  );
};

export default Alert;
