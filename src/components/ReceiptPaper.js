import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import paper from "../assets/img/paper.png";

const ReceiptContainer = styled.div`
  width: 320px;
  padding: 40px 20px;
  margin: 0 auto;
  background-image: url(${paper});

  p {
    ${(props) => props.theme.receiptFont}
    font-weight: bold;

    &.title {
      margin-bottom: 10px;
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      letter-spacing: 2px;
      ${(props) => props.theme.receiptTitle}
    }
  }

  table {
    width: 100%;
    margin: 5px 0;
    border: 1px solid #ccc;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 10px 20px;
  }
`;

const ReceiptPaper = (props) => {
  // const today = Date.now();

  return (
    <ReceiptContainer>
      <p className="title">Spotiplus</p>
      <p>판매일 : {today}</p>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>duration</th>
          </tr>
        </thead>
        <tbody>
          {props.data ? (
            props.data.items.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{v.name}</td>
                  <td>{dayjs(v.duration_ms).format("mm:ss")}</td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <div></div>
      <p>방문해주셔서 감사합니다.</p>
      <p>spotiplus.com</p>
    </ReceiptContainer>
  );
};

export default ReceiptPaper;
