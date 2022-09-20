import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import imgPH from "../assets/img/img-placeholder.png";

const ArtistListContainer = styled.div`
  ul {
    border-top: 1px solid #888;
    border-bottom: 1px solid #888;

    li {
      display: flex;
      padding: 10px 20px;

      .artist-info {
        display: flex;
        max-width: 100%;
        min-width: 0;
        flex-grow: 1;

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
          padding: 10px 10px 0 0;
          min-width: 0;

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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

const ArtistList = (props) => {
  console.log(props.link);
  return (
    <ArtistListContainer>
      <ul>
        {props.data ? (
          props.data.map((item, index) => {
            return (
              <li key={index}>
                <NavLink className="artist-info" to={props.link ? props.link : ""}>
                  <span>{index + 1}</span>
                  <img className="small-img" src={item.images[0].url} alt="이미지로딩중" />
                  <div>
                    <p>{item.name}</p>
                    <p>아티스트</p>
                  </div>
                </NavLink>
              </li>
            );
          })
        ) : (
          <li>
            <NavLink className="artist-info" to="/detail">
              <img className="small-img" src={imgPH} alt="이미지로딩중" />
              <div>
                <p>아티스트명</p>
                <p>아티스트</p>
              </div>
            </NavLink>
          </li>
        )}
      </ul>
    </ArtistListContainer>
  );
};

export default ArtistList;
