/**
 * 데이터 입력 시 추천 곡을 출력하는 맞춤추천 페이지
 */
import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

import SongList from "../components/SongList.js";
import Search from "../components/SearchModal.js";
import axios from "axios";
import { useSelector } from "react-redux";

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
        font-size: 90px;
        color: #eee;
        cursor: pointer;

        &.filled,
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
    cursor: pointer;
  }

  .alert-text {
    text-align: center;
    color: ${(props) => props.theme.alertText};
  }

  .no-data {
    padding: 30px 0 40px;
    text-align: center;
  }
`;

const Recommend = memo(() => {
  const { token } = useSelector((state) => state.token);

  const [isOpen, setIsOpen] = useState(false);
  const [searchWhat, setSearchWhat] = useState(null); // 모달에 params 전달
  const [track, setTrack] = useState(null);
  const [artist, setArtist] = useState(null);
  const [genre, setGenre] = useState(null);

  const [query, setQuery] = useState({}); // 맞춤추천 검색어(곡&아티스트&장르)
  const [data, setData] = useState(null); // 맞춤추천 데이터
  const [isBlank, setIsBlank] = useState(null);

  // 트랙 검색
  const onSearch = useCallback((e) => {
    setIsOpen((isOpen) => !isOpen);
    setSearchWhat({
      params: {
        type: e.currentTarget.dataset.filter,
        limit: 50,
      },
    });
  });

  const onGetRecommend = useCallback(async () => {
    if (Object.values(query)?.length === 3) {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/recommendations", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: query,
        });
        setData(data);
      } catch (err) {
        console.error(err);
      }

      setIsBlank(null);
    } else {
      setIsBlank("검색어를 입력해주세요.");
    }
  });

  return (
    <>
      <RecommendContainer>
        <div className="inner">
          <section>
            <div className="selection">
              <div>
                <p>트랙</p>
                <div
                  className={track ? "selec-btn filled" : "selec-btn"}
                  data-filter="track"
                  onClick={onSearch}
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                </div>
              </div>
              <div>
                <p>아티스트</p>
                <div
                  className={artist ? "selec-btn filled" : "selec-btn"}
                  data-filter="artist"
                  onClick={onSearch}
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                </div>
              </div>
              <div>
                <p>장르</p>
                <div
                  className={genre ? "selec-btn filled" : "selec-btn"}
                  data-filter="genre"
                  onClick={onSearch}
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                </div>
              </div>
            </div>
            <table className="selection-info">
              <tbody>
                <tr>
                  <td>트랙</td>
                  <td colSpan={2} className="input">
                    {track || <>+버튼을 눌러 입력해주세요.</>}
                  </td>
                </tr>
                <tr>
                  <td>아티스트</td>
                  <td colSpan={2} className="input">
                    {artist || <>+버튼을 눌러 입력해주세요.</>}
                  </td>
                </tr>
                <tr>
                  <td>장르</td>
                  <td colSpan={2} className="input">
                    {genre || <>+버튼을 눌러 입력해주세요.</>}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="recomment-btn" onClick={onGetRecommend}>
              내 취향저격 음악 검색
            </button>
            <div className="alert-text">{isBlank}</div>
          </section>
          <section>
            {data ? (
              <SongList data={data.tracks} />
            ) : (
              <div className="no-data">검색 결과가 없습니다.</div>
            )}
          </section>
        </div>
      </RecommendContainer>
      <Search
        isOpen={isOpen}
        searchWhat={searchWhat}
        setIsOpen={setIsOpen}
        setTrack={setTrack}
        setArtist={setArtist}
        setGenre={setGenre}
        query={query}
        setQuery={setQuery}
      />
    </>
  );
});

export default Recommend;
