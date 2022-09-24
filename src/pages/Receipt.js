/**
 * 일정 기간 가장 많이 들은 곡을 메뉴판 이미지로 만들어주는 페이지
 */
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import paper from "../assets/img/paper.png";
import UserSignIn from "../components/UserSignIn.js";

const ReceiptContainer = styled.main`
  .inner {
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
  }

  .no-usertoken {
    text-align: center;
    padding-top: 20px;
  }

  .range,
  .type {
    h2 {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .select-bar {
      display: table;
      table-layout: fixed;
      width: 100%;
      height: 30px;
      margin: 0 auto;
      text-align: center;

      p {
        display: table-cell;
        background-color: ${(props) => props.theme.gray};
        line-height: 3;

        &.active {
          background-color: ${(props) => props.theme.pointColor};
          color: ${(props) => props.theme.pointFontColor};
        }
      }
    }
  }

  .type {
    margin-top: 15px;
  }

  .receipt-img {
    padding: 20px 0;

    .receipt {
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
    }
  }

  .download {
    text-align: center;

    button {
      ${(props) => props.theme.button}
      height: 40px;
      font-weight: bold;
    }
  }
`;

const Receipt = () => {
  const { token } = useSelector((state) => state.token);
  const [userToken, setUserToken] = useState(null);
  const rangeRef = useRef([]);
  const typeRef = useRef([]);

  const [range, setRange] = useState("short_term");
  const [type, setType] = useState("tracks");
  const [data, setData] = useState(null);
  const hash = window.location.href.indexOf("#");

  // 페이지 마운트 후 해시태그 가져오기
  useEffect(() => {
    if (hash > 0) {
      const query = window.location.href.substring(hash + 1);
      const searchURL = new URLSearchParams(query);

      setUserToken(searchURL.get("access_token"));
    }
  }, []);

  // 기간 설정
  const onSetRange = useCallback((e) => {
    const target = e.currentTarget;

    rangeRef.current.forEach((v) => (v.className = ""));
    target.className = "active";
    setRange(target.dataset.range);
  }, []);

  // 타입 설정
  const onSetType = useCallback((e) => {
    const target = e.currentTarget;

    typeRef.current.forEach((v) => (v.className = ""));
    target.className = "active";
    setType(target.dataset.type);
  }, []);

  useEffect(() => {
    if (hash > 0) {
      (async () => {
        try {
          const { data } = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            params: {
              limit: 10,
              time_range: range,
            },
          });

          setData(data);
        } catch (err) {
          console.error(err.response);
        }
      })();
    }
    console.log("hello");
  }, [type, range, userToken]);

  return (
    <ReceiptContainer>
      <div className="inner">
        {userToken ? (
          <>
            <div className="range">
              <div className="select-bar">
                <p
                  onClick={onSetRange}
                  className="active"
                  ref={(el) => (rangeRef.current[0] = el)}
                  data-range="short_term"
                >
                  최근 1개월
                </p>
                <p
                  onClick={onSetRange}
                  ref={(el) => (rangeRef.current[1] = el)}
                  data-range="medium_term"
                >
                  최근 6개월
                </p>
                <p
                  onClick={onSetRange}
                  ref={(el) => (rangeRef.current[2] = el)}
                  data-range="long_term"
                >
                  최근 1년
                </p>
              </div>
            </div>
            <div className="type">
              <div className="select-bar">
                <p
                  onClick={onSetType}
                  className="active"
                  ref={(el) => (typeRef.current[0] = el)}
                  data-type="tracks"
                >
                  곡 제목
                </p>
                <p onClick={onSetType} ref={(el) => (typeRef.current[1] = el)} data-type="artists">
                  아티스트
                </p>
              </div>
            </div>
            <div className="receipt-img">
              <div className="receipt">
                <p className="title">Spotiplus</p>
                <p>판매일 : 오늘 날짜</p>
                <table>
                  <thead>
                    <tr>
                      <th>hello</th>
                      <th>hello</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>hello</td>
                      <td>hello</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="download">
              <button>다운로드</button>
            </div>
          </>
        ) : (
          <div className="no-usertoken">
            <UserSignIn />
          </div>
        )}
      </div>
    </ReceiptContainer>
  );
};

export default Receipt;
