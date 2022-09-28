import React, { useCallback } from "react";
import { Link } from "react-router-dom";
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

      &.no-data {
        display: block;
        text-align: center;
      }

      .song-info {
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

const SongList = (props) => {
  const onSetName = useCallback(
    (e) => {
      const target = e.currentTarget;

      if (props.setTrack) {
        props.setTrack(target.dataset.track);
        props.setQuery({
          ...props.query,
          seed_tracks: target.dataset.id,
        });
      }

      if (props.setIsOpen) {
        props.setIsOpen(false);
      }
    },
    [props]
  );

  return (
    <SongListContainer>
      <ul>
        {props.data ? (
          props.data.length !== 0 ? (
            props.data.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className="song-info"
                    data-track={item.name}
                    data-id={item.id}
                    to={props.link ? `/detail/${item.id}` : ""}
                    onClick={onSetName}
                  >
                    <span>{index + 1}</span>
                    <img
                      className="small-img"
                      src={item.album.images[0].url || imgPH}
                      alt="곡 관련 이미지"
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>
                        {item.artists.map((v, i) => {
                          return i === item.artists.length - 1 ? v.name : v.name + ", ";
                        })}
                      </p>
                    </div>
                  </Link>
                  <Link className="play-btn" to="spotify 듣기 주소">
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="no-data">검색 결과가 없습니다.</li>
          )
        ) : (
          <li className="no-data">검색어를 입력하세요.</li>
        )}
      </ul>
    </SongListContainer>
  );
};

export default SongList;
