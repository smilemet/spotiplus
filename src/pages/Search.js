/**
 * 곡 정보를 검색하는 페이지
 */
import React, { memo, useState } from "react";
import styled from "styled-components";

import SongList from "../components/SongList.js";
import SearchBox from "../components/SearchBox.js";

const SearchContainer = styled.main`
  .inner {
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
  }

  .search {
    text-align: center;
  }

  .search-result {
    & > div {
      padding: 10px 0;
      text-align: center;
    }

    .no-data {
      padding: 30px 0 50px;
    }
  }
`;

const Search = memo(() => {
  const [list, setList] = useState(null);
  const searchInfo = {
    params: {
      type: "album,artist,track",
      limit: 20,
    },
  };

  return (
    <SearchContainer>
      <div className="inner">
        <section className="search">
          <SearchBox searchInfo={searchInfo} setList={setList} />
        </section>
        <section className="search-result">
          {list ? <SongList data={list}></SongList> : <div className="no-data">데이터 없음</div>}
        </section>
      </div>
    </SearchContainer>
  );
});

export default Search;
