/**
 * 맞춤추천 페이지에서 팝업되는 검색창
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "./layout/Modal.js";
import SearchBox from "../components/SearchBox.js";
import SongList from "./SongList.js";
import ArtistList from "./ArtistList.js";

const SerchContainer = styled(Modal)`
  .modal {
    ${(props) => props.theme.centerModal}
    width: 70%;
    height: 80vh;
    padding: 0;
    position: relative;

    .modal-inner {
      width: 85%;
      height: 90%;
      margin: 0 auto;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .search {
    .title {
      padding-left: 20px;
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .no-data {
    padding: 20px 0;
  }
`;

const Search = (props) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    setList(null);
  }, [props.isOpen]);

  return (
    <SerchContainer {...props}>
      <div className="modal-inner">
        <section className="search">
          <p className="title">
            {props.searchInfo?.params.type === "track" ? (
              <>트랙 검색</>
            ) : props.searchInfo?.params.type === "artist" ? (
              <>아티스트 검색</>
            ) : (
              <>장르 선택</>
            )}
          </p>
          <SearchBox {...props} setList={setList} />
        </section>
        <section className="search-result">
          {list ? (
            <>
              {list.tracks ? (
                <SongList data={list.tracks.items} />
              ) : list.artists ? (
                <ArtistList data={list.artists.items} />
              ) : (
                <>데이터가 없습니다.</>
              )}
            </>
          ) : (
            <div className="no-data">
              {props.searchInfo?.params.type === "track" ? (
                <>곡 이름을 검색해보세요.</>
              ) : props.searchInfo?.params.type === "artist" ? (
                <>아티스트 이름을 검색해보세요.</>
              ) : (
                <>선호 장르를 선택해주세요.</>
              )}
            </div>
          )}
          <ArtistList />
        </section>
      </div>
    </SerchContainer>
  );
};

export default Search;
