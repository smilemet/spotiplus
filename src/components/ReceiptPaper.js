import React, { forwardRef, useEffect, useState } from "react";
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
      margin-bottom: 20px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      ${(props) => props.theme.receiptTitle}
    }
  }

  table {
    width: 100%;
    margin: 5px 0;
    border-top: 1px dotted #000;
    border-bottom: 1px dotted #000;
    table-layout: fixed;
    text-align: left;
  }

  th,
  td {
    padding: 10px 10px;
  }

  th,
  tbody {
    border-bottom: 1px dotted #000;
  }

  th {
    font-weight: bold;
  }
`;

const ReceiptPaper = forwardRef((props, ref) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(dayjs(Date.now()).format("YYYY-MM-DD"));
  }, []);

  return (
    <ReceiptContainer ref={ref}>
      <p className="title">Spotiplus</p>
      <p>판매일 : {date}</p>
      <table>
        {props.data ? (
          props.type === "tracks" ? (
            <>
              <thead>
                <tr>
                  <th colSpan={2}>Title</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {props.data ? (
                  props.data.items.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td colSpan={2}>{v.name}</td>
                        <td>{dayjs(v.duration_ms).format("mm:ss")}</td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>합계</td>
                  <td>{props.data.items.length}</td>
                </tr>
              </tfoot>
            </>
          ) : (
            <>
              <thead>
                <tr>
                  <th colSpan={2}>Artist</th>
                  <th>Followers</th>
                </tr>
              </thead>
              <tbody>
                {props.data ? (
                  props.data.items.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td colSpan={2}>{v.name}</td>
                        <td>
                          {v.followers?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>합계</td>
                  <td>{props.data.items.length}</td>
                </tr>
              </tfoot>
            </>
          )
        ) : (
          <></>
        )}
      </table>
      <p>방문해주셔서 감사합니다.</p>
      <p>spotiplus.com</p>
    </ReceiptContainer>
  );
});

export default ReceiptPaper;
