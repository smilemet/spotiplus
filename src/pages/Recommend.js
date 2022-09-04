/**
 * 데이터 입력 시 추천 곡을 출력하는 맞춤추천 페이지
 */
import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import SongList from "../components/SongList";

const RecommendContainer = styled.main`
  .inner {
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
  }

  .selection {
    max-width: 435px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    table-layout: fixed;
    text-align: center;

    & > div {
      p {
        font-size: 18px;
        font-weight: bold;
      }

      .selec-btn {
        margin: 0 auto;
        /* background-color: ${(props) => props.theme.gray}; */
        font-size: 90px;
        color: #eee;

        &:hover {
          color: ${(props) => props.theme.pointColor};
        }
      }
    }
  }

  .selection-info {
    width: 85%;
    margin: 5px auto 15px;
    table-layout: fixed;

    td {
      font-size: 15px;
      line-height: 35px;
    }

    td.input {
      font-size: 12px;
      padding-left: 20px;
      color: #999;
    }
  }

  .recomment-btn {
    ${(props) => props.theme.button}
    height: 40px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const Recommend = () => {
  return (
    <RecommendContainer>
      <div className="inner">
        <section>
          <div className="selection">
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
          </div>
          <table className="selection-info">
            <tbody>
              <tr>
                <td>트랙</td>
                <td colSpan={2} className="input">
                  +버튼을 눌러 입력해주세요.
                </td>
              </tr>
              <tr>
                <td>아티스트</td>
                <td colSpan={2} className="input">
                  +버튼을 눌러 입력해주세요.
                </td>
              </tr>
              <tr>
                <td>장르</td>
                <td colSpan={2} className="input">
                  +버튼을 눌러 입력해주세요.
                </td>
              </tr>
            </tbody>
          </table>
          <button className="recomment-btn">내 취향저격 음악 검색</button>
        </section>
        <section>
          <SongList />
        </section>
      </div>
    </RecommendContainer>
  );
};

export default Recommend;
