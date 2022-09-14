/**
 * 데이터 입력 시 추천 곡을 출력하는 맞춤추천 페이지
 */
import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

import SongList from "../components/SongList.js";
import Search from "../components/SearchModal.js";

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

const Recommend = memo(() => {
  // 트랙, 아티스트, 장르 각각의 상태를 담을 state만들기
  // 모달창 팝업 -> 데이터 입력 시 아래에 트랙 출력 (실시간업데이트 onChange)
  // 해당 데이터를 props로 state에 옮겨줌
  // 데이터가 담기면 innerHtml에 넣어주기
  // 검색 버튼 클릭 시 해당 데이터를 API로 전달
  // 가져온 데이터를 songList로 출력

  // const ref = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [searchInfo, setSearchInfo] = useState(null);
  const [data, setData] = useState(null);

  const [collection, setCollection] = useState(null);
  const [track, setTrack] = useState(null);
  const [artist, setArtist] = useState(null);
  const [genre, setGenre] = useState(null);

  // 트랙 검색
  const onSearchTrack = useCallback((e) => {
    setIsOpen((isOpen) => !isOpen);
    setSearchInfo({
      params: {
        type: "track",
        limit: 50,
      },
    });
    setCollection("track");
  });

  // 아티스트 검색
  const onSearchArtist = useCallback((e) => {
    setIsOpen((isOpen) => !isOpen);
    setSearchInfo({
      params: {
        type: "artist",
        limit: 50,
      },
    });
    setCollection("artist");
  });

  // 장르 검색
  const onSearchGenre = useCallback((e) => {
    setIsOpen((isOpen) => !isOpen);
    setSearchInfo({
      params: {
        type: "genre",
        limit: 50,
      },
    });
    setCollection("genre");
  });

  // 검색창 조작
  const onSetKeyword = useCallback((section) => {});

  return (
    <>
      <RecommendContainer>
        <div className="inner">
          <section>
            <div className="selection">
              <div>
                <p>트랙</p>
                <div className="selec-btn" onClick={onSearchTrack}>
                  <FontAwesomeIcon icon={faSquarePlus} />
                </div>
              </div>
              <div>
                <p>아티스트</p>
                <div className="selec-btn" onClick={onSearchArtist}>
                  <FontAwesomeIcon icon={faSquarePlus} />
                </div>
              </div>
              <div>
                <p>장르</p>
                <div className="selec-btn" onClick={onSearchGenre}>
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
            <button className="recomment-btn">내 취향저격 음악 검색</button>
          </section>
          <section>
            <SongList data={data} />
          </section>
        </div>
      </RecommendContainer>
      <Search
        isOpen={isOpen}
        searchInfo={searchInfo}
        setIsOpen={setIsOpen}
        setData={setData}
        setTrack={setTrack}
        setArtist={setArtist}
        setGenre={setGenre}
        collection={collection}
      />
    </>
  );
});

export default Recommend;
