/**
 * 받아온 data를 바탕으로 곡 리스트 출력
 */
import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import imgPH from "../assets/img/img-placeholder.png";
import { useState } from "react";

const SongListContainer = styled.div`
  ul {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

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
          min-width: 25px;
          margin-right: 10px;
          line-height: 60px;
          font-size: 18px;
        }

        & > img {
          width: 60px;
          height: 60px;
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
        color: #eee;
        font-size: 40px;
        text-align: center;
        cursor: pointer;

        &.active,
        &:hover {
          color: #000;
        }
      }
    }
  }
`;

const SongList = (props) => {
  const [playingId, setPlayingId] = useState("");

  /** 추천 페이지 - 곡 선택 시 상위 컴포넌트의 state에 값 전달 & 검색 쿼리 업데이트 */
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

  /** 곡 미리듣기 재생버튼 클릭 이벤트 */
  const onPlayMusic = useCallback(
    (e) => {
      let target = e.currentTarget;
      let audio = target.querySelector("audio");

      if (playingId && target.dataset.id !== playingId) {
        // 기존 곡 재생 중에 다른 곡 재생버튼 클릭
        Array.from(document.querySelectorAll(".play-btn")).forEach((v) => {
          v.classList.remove("active");
        });

        Array.from(document.querySelectorAll("audio")).forEach((v) => {
          v.pause();
          v.currentTime = 0;
        });

        let playPromise = audio.play();
        if (playPromise !== undefined) playPromise.then((_) => {}).catch((error) => {});

        setPlayingId(target.dataset.id);
      } else if (playingId !== "") {
        // 재생 중인 그 곡 정지
        audio.pause();
        audio.currentTime = 0;
        setPlayingId("");
      } else {
        // 기존 재생 없음 & 새로 재생
        let playPromise = audio.play();
        if (playPromise !== undefined) playPromise.then((_) => {}).catch((error) => {});

        setPlayingId(target.dataset.id);
      }

      target.classList.toggle("active");
    },
    [playingId]
  );

  // 새로 검색할 때 기존 재생버튼 없애기
  useEffect(() => {
    Array.from(document.querySelectorAll(".play-btn")).forEach((v) => {
      v.classList.remove("active");
    });
  }, [props.data]);

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
                    data-id={item.id}
                    data-track={item.name}
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
                  <div className="play-btn" data-id={item.id} onClick={onPlayMusic}>
                    <audio src={item.preview_url} />
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </div>
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
