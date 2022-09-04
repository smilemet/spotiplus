/**
 * 일정 기간 가장 많이 들은 곡을 메뉴판으로 만들어주는 페이지
 */
import React, { useState } from "react";
import styled from "styled-components";

const ReceiptContainer = styled.main`
  .inner {
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
  }

  .term {
    h2 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .select-bar {
      display: table;
      table-layout: fixed;
      width: 100%;
      height: 40px;
      margin: 0 auto;
      text-align: center;

      p {
        display: table-cell;
        background-color: ${(props) => props.theme.gray};
        line-height: 40px;

        &.active {
          background-color: ${(props) => props.theme.pointColor};
          color: ${(props) => props.theme.pointFontColor};
        }
      }
    }
  }

  .menu-img {
    padding: 20px 0;
    text-align: center;
  }

  .download {
    text-align: center;

    button {
      width: 100%;
      height: 40px;
      font-weight: bold;
      background-color: ${(props) => props.theme.pointColor};
      color: ${(props) => props.theme.pointFontColor};
    }
  }
`;

const Receipt = () => {
  const [select, setSelect] = useState("");

  const handleTab = (e) => {
    setSelect(e.target.dataset.tab);
  };

  return (
    <ReceiptContainer>
      <div className="inner">
        <div className="term">
          <h2>기간 설정</h2>
          <div className="select-bar">
            <p onClick={handleTab} className={select === "1" ? "active" : "none"} data-tab="1">
              최근 1년
            </p>
            <p onClick={handleTab} className={select === "2" ? "active" : "none"} data-tab="2">
              최근 6개월
            </p>
            <p onClick={handleTab} className={select === "3" ? "active" : "none"} data-tab="3">
              최근 1개월
            </p>
          </div>
        </div>
        <div className="menu-img">여기에 이미지</div>
        <div className="download">
          <button>다운로드</button>
        </div>
      </div>
    </ReceiptContainer>
  );
};

export default Receipt;
