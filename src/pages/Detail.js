import React from "react";
import styled from "styled-components";

const DetailComponent = styled.main`
  padding: 0;
`;

const Detail = () => {
  return (
    <DetailComponent>
      <div className="inner">내용</div>
    </DetailComponent>
  );
};

export default Detail;
