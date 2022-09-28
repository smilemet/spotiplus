/**
 * 곡 정보를 검색하는 페이지
 */
import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import SongList from "../components/SongList.js";
import SearchBox from "../components/SearchBox.js";
import { useSelector } from "react-redux";
import axios from "axios";

const SearchContainer = styled.main`
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
  const { token } = useSelector((state) => state.token);
  const [data, setData] = useState(null);
  const [list, setList] = useState(null);
  const [query, setQuery] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // SearchBox로 전달할 파라미터
  const searchWhat = {
    params: {
      type: "track",
      limit: 20,
    },
  };

  // data -> list 가공
  useEffect(() => {
    if (data) setList(data.tracks.items);
  }, [data]);

  // 추가 데이터 획득
  const searchData = useCallback(async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          ...searchWhat.params,
          q: query,
          offset: list.length,
        },
      });

      setList([...list, ...data.tracks.items]);
    } catch (err) {
      console.error(err);
    }

    setIsFetching(false);
  }, [token, query, searchWhat.params, list]);

  // 스크롤 하단 위치 시 새 데이터 획득 로직 구현
  useEffect(() => {
    const target = document.getElementsByTagName("main")[0];

    const handleScroll = () => {
      const { scrollTop, offsetHeight } = target;
      const max_scroll = target.scrollHeight - offsetHeight;

      if (scrollTop >= max_scroll) {
        setIsFetching(true);
      }
    };

    target.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 무한스크롤 실행
  useEffect(() => {
    if (isFetching) searchData();
  }, [isFetching]);

  return (
    <SearchContainer>
      <div className="inner">
        <section className="search">
          <SearchBox searchWhat={searchWhat} setData={setData} setQuery={setQuery} />
        </section>
        <section className="search-result">
          {data ? (
            data.length === 0 ? (
              <div className="no-data">검색 결과 없음</div>
            ) : (
              <SongList data={list} link={true} />
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
