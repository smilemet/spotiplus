/**
 * 일정 기간 가장 많이 들은 곡을 메뉴판 이미지로 만들어주는 페이지
 */
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ReceiptPaper from "../components/ReceiptPaper";
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
  const [range, setRange] = useState("short_term");
  const [type, setType] = useState("tracks");
  const [data, setData] = useState(null);

  const rangeRef = useRef([]);
  const typeRef = useRef([]);

  const hash = window.location.href.indexOf("#");
  let query = 0;
  let searchURL = 0;

  if (hash !== -1) {
    query = window.location.href.substring(hash + 1);
    searchURL = new URLSearchParams(query);
  }

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

  // 페이지 마운트 후 기본값으로 영수증 생성
  useEffect(() => {
    if (searchURL) {
      (async () => {
        try {
          const { data } = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
              Authorization: `Bearer ${searchURL.get("access_token")}`,
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
  }, [type, range, hash, searchURL]);

  return (
    <ReceiptContainer>
      <div className="inner">
        {query ? (
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
              <ReceiptPaper data={data} />
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
