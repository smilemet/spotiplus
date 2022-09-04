import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import imgPH from "../assets/img/img-placeholder.png";

const SearchContainer = styled.main`
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

    ul {
      border-top: 1px solid #888;
      border-bottom: 1px solid #888;

      li {
        display: flex;
        padding: 10px 20px;

        .song-info {
          display: flex;
          max-width: 100%;
          min-width: 0;

          & > span {
            margin-right: 10px;
            line-height: 60px;
            font-size: 20px;
          }

          & > img {
            width: 60px;
            margin-right: 10px;
          }

          & > div {
            flex-shrink: 2;
            flex-grow: 0;
            width: calc();
            padding: 10px 10px 0 0;
            min-width: 0;

            p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            p:first-of-type {
              font-size: 16px;
              margin-bottom: 7px;
            }
          }
        }

        .play-btn {
          flex-shrink: 0;
          display: block;
          width: 40px;
          line-height: 60px;
          font-size: 40px;
          text-align: center;
        }
      }
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

          <ul>
            <li>
              <NavLink className="song-info" to="/detail">
                <span>1</span>
                <img className="small-img" src={imgPH} alt="이미지로딩중" />
                <div>
                  <p>곡 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목 제목</p>
                  <p>아티스트</p>
                </div>
              </NavLink>
              <NavLink className="play-btn" to="spotify 듣기 주소">
                <FontAwesomeIcon icon={faCirclePlay} />
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
    </SearchContainer>
  );
};

export default Search;
