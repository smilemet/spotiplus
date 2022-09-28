import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBoxContainer = styled.div`
  margin-bottom: 20px;
  .search-box {
    padding: 10px 20px;
    margin: 0 auto 5px;
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
      margin-left: 10px;
      font-size: 22px;
      cursor: pointer;
    }
  }

  .alert-text {
    color: ${(props) => props.theme.alertText};
  }
`;

const SearchBox = (props) => {
  const { token } = useSelector((state) => state.token);
  const [isBlank, setIsBlank] = useState("");
  const inputBox = useRef();

  // 검색 이벤트
  const onSearch = useCallback(() => {
    // 검색어 없으면 경고문구
    if (!inputBox.current.value.trim("")) {
      setIsBlank("검색어를 입력해주세요.");
      return;
    } else {
      setIsBlank("");
    }

    (async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            ...props.searchWhat.params,
            q: inputBox.current.value,
          },
        });

        // 곡 리스트 정보
        if (props.setData) {
          props.setData(data);
        }

        // 무한스크롤 쿼리값
        if (props.setQuery) {
          props.setQuery(inputBox.current.value);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [props, token]);

  // 엔터 시 검색
  const onEnterEvent = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      onSearch();
    },
    [onSearch]
  );

  // 모달 껐다 킬 때 검색어 초기화
  useEffect(() => {
    inputBox.current.value = "";
  }, [props.isOpen]);

  return (
    <>
      <SearchBoxContainer>
        <div className="search-box">
          <input onKeyDown={onEnterEvent} type="search" placeholder="검색어 입력" ref={inputBox} />
          <span>
            <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} />
          </span>
        </div>
        <div className="alert-text">{isBlank}</div>
      </SearchBoxContainer>
    </>
  );
};

export default SearchBox;
