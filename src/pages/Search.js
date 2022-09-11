/**
 * 곡 정보를 검색하는 페이지
 */
import React, { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SongList from "../components/SongList";
import axios from "axios";
import { useSelector } from "react-redux";

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

const Search = memo(() => {
  // 돋보기 아이콘을 클릭하는 순간 데이터 전달 -> axios get요청 전달
  // 데이터가 돌아오면 list로 만들어서 뿌려줌

  const { token } = useSelector((state) => state.token);
  const [list, setList] = useState(null);

  const inputBox = useRef();

  // 기본 이벤트
  const onSearch = () => {
    if (!inputBox.current.value) return;
    (async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            q: inputBox.current.value,
            type: "album,artist,track",
            limit: 5,
          },
        });

        setList(data.tracks.items);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  // 엔터 시 이벤트
  const onEnterEvent = useCallback((e) => {
    if (e.key !== "Enter") return;
    onSearch();
  });

  return (
    <SearchContainer>
      <div className="inner">
        <section className="search">
          <div className="search-box">
            <input
              onKeyDown={onEnterEvent}
              type="search"
              placeholder="제목, 아티스트, 앨범명 검색"
              ref={inputBox}
            />
            <span>
              <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} />
            </span>
          </div>
        </section>
        <section className="search-result">
          {list ? <SongList data={list}></SongList> : <div>데이터 없음</div>}
        </section>
      </div>
    </SearchContainer>
  );
});

export default Search;
