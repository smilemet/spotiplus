/**
 * 데이터 수신에 지연이 발생할 경우 로딩 이미지를 출력
 */
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: ${(props) => (props.isLoading ? "block" : "none")};
  inset: 0 0 0 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 99;
`;

const spinnerCSS = {
  position: "absolute",
  top: "none",
  right: "none",
  left: "50%",
  bottom: "50%",
};

const Loading = (props) => {
  return (
    <LoadingContainer {...props}>
      <FadeLoader color="#36d7b7" loading={props.isLoading} cssOverride={spinnerCSS} />
    </LoadingContainer>
  );
};

export default Loading;
