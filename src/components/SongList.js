import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import imgPH from "../assets/img/img-placeholder.png";

const SongListContainer = styled.div`
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
            text-align: left;
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
`;

const SongList = () => {
  return (
    <SongListContainer>
      <ul>
        <li>
          <NavLink className="song-info" to="/detail">
            {/* <NavLink className="song-info" to={"/detail/" + {id}}> */}
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
    </SongListContainer>
  );
};

export default SongList;
