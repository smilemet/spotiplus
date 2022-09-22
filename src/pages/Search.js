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
      height: 300px;
    }
  }
`;

const Search = memo(() => {
  const [list, setList] = useState(null);
  const searchWhat = {
    params: {
      type: "track",
      limit: 20,
    },
  };

  return (
    <SearchContainer>
      <div className="inner">
        <section className="search">
          <SearchBox searchWhat={searchWhat} setList={setList} />
        </section>
        <section className="search-result">
          {list ? (
            list.length === 0 ? (
              <div className="no-data">검색 결과 없음</div>
            ) : (
              <SongList data={list.tracks.items} link={true} />
            )
          ) : (
            <div className="no-data">검색어를 입력하세요.</div>
          )}
        </section>
      </div>
    </SearchContainer>
  );
});

export default Search;
