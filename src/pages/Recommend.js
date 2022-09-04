/**
 * 데이터 입력 시 추천 곡을 출력하는 맞춤추천 페이지
 */
import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

const RecommendContainer = styled.main`
  .inner {
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
  }

  .selection {
    width: 100%;
    display: table;
    table-layout: fixed;
    text-align: center;

    & > div {
      display: table-cell;

      p {
        font-size: 18px;
        font-weight: bold;
      }

      .selec-btn {
        margin: 0 auto;
        /* background-color: ${(props) => props.theme.gray}; */
        font-size: 80px;
        color: #eee;

        &:hover {
          color: ${(props) => props.theme.pointColor};
        }
      }
    }
  }
`;

const Recommend = () => {
  return (
    <RecommendContainer>
      <div className="inner">
        <section className="selection">
          <div>
            <p>트랙</p>
            <div className="selec-btn">
              <FontAwesomeIcon icon={faSquarePlus} />
            </div>
          </div>
          <div>
            <p>아티스트</p>
            <div className="selec-btn">
              <FontAwesomeIcon icon={faSquarePlus} />
            </div>
          </div>
          <div>
            <p>장르</p>
            <div className="selec-btn">
              <FontAwesomeIcon icon={faSquarePlus} />
            </div>
          </div>
        </section>
      </div>
    </RecommendContainer>
  );
};

export default Recommend;
