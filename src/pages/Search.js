/**
 * 곡 정보를 검색하는 페이지
 */
import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SongList from "../components/SongList";

const SearchContainer = styled.main`
  .inner {
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
  }

  .search {
    text-align: center;

    .search-box {
      padding: 10px 20px;
      margin: 0 auto 20px;
      max-width: 310px;
      height: 45px;
      display: flex;
      border: 1px solid #aaa;

      input {
        width: 100%;
        border: none;
        outline: none;
      }

      span {
        width: 25px;
        /* line-height: 37px; */
        margin-left: 10px;
        font-size: 22px;
      }
    }
  }

  .search-result {
    & > div {
      padding: 10px 0;
      text-align: center;
    }
  }
`;

const Search = () => {
  return (
    <SearchContainer>
      <div className="inner">
        <section className="search">
          <div className="search-box">
            <input type="search" placeholder="제목, 아티스트, 앨범명 검색" />
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
        </section>
        <section className="search-result">
          <div>데이터 없음</div>

          <SongList />
        </section>
      </div>
    </SearchContainer>
  );
};

export default Search;
