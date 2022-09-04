/**
 * 특정 곡의 정보를 표시하는 상세페이지
 */
import React from "react";
import styled from "styled-components";

import imgPH from "../assets/img/img-placeholder.png";

const DetailComponent = styled.main`
  padding: 0;

  .song-detail {
    max-width: 570px;
    margin: 0 auto;
    padding-bottom: 20px;
    display: flex;
    border-bottom: 1px solid #ccc;

    img {
      width: 50%;
      vertical-align: middle;
    }

    & > div {
      margin-left: 30px;

      p {
        font-size: 14px;
        margin-top: 10px;

        &.title {
          font-size: 20px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 30px;
        }
      }
    }
  }

  .chart {
    & > div {
      margin: 0 auto;
      max-width: 80%;
    }
    img {
      width: 100%;
    }
  }
`;

const Detail = () => {
  return (
    <DetailComponent>
      <div className="inner">
        <section className="song-detail">
          <img src={imgPH} alt="이미지로딩중" />
          <div>
            <p className="title">곡 제목 제목 제목 제목</p>
            <p>아티스트</p>
            <p>발매년월일</p>
          </div>
        </section>
        <section className="chart">
          <div>
            <img src={imgPH} alt="이미지로딩중" />
            여기에 차트
          </div>
        </section>
        <section></section>
      </div>
    </DetailComponent>
  );
};

export default Detail;
