/**
 * 맞춤추천 페이지에서 팝업되는 검색창
 */
import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./layout/Modal.js";
import SearchBox from "../components/SearchBox.js";
import SongList from "./SongList.js";

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
  console.log();

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
              <>장르 검색</>
            )}
          </p>
          <SearchBox {...props} />
        </section>
        <section className="search-result">
          {list ? (
            <SongList data={list}></SongList>
          ) : (
            <div className="no-data">
              {props.searchInfo?.params.type === "track" ? (
                <>곡 이름으로 검색해보세요!</>
              ) : props.searchInfo?.params.type === "artist" ? (
                <>아티스트 이름으로 검색해보세요!</>
              ) : (
                <>장르 이름으로 검색해보세요!</>
              )}
            </div>
          )}
        </section>
      </div>
    </SerchContainer>
  );
};

export default Search;
