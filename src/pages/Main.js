/**
 * 오늘의 추천곡을 표시하는 메인페이지
 */
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import styled from "styled-components";
import dayjs from "dayjs";

import imgPH from "../assets/img/img-placeholder.png";

const MainContainer = styled.main`
  padding: 0;

  @mixin small-img-width() {
    width: 80px;
  }

  img {
    &.big-img {
      width: 190px;
    }

    &.small-img {
      width: ${(props) => props.theme.smallImgWidth};
    }
  }

  .today-song {
    margin-bottom: 35px;
    text-align: center;

    img {
      margin-bottom: 15px;
    }

    p {
      &.title {
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 16px;
      }
      &.artist,
      &.release {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }

  .today-recommend {
    min-width: 0;
    overflow: hidden;

    & > h2 {
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 16px;
    }

    ul {
      display: flex;

      li {
        width: ${(props) => props.theme.smallImgWidth};
        margin-right: 10px;
        text-align: center;

        a {
          width: inherit;
          width: 100%;
        }

        p {
          width: inherit;
          font-size: 11px;
          margin: 5px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

const Main = memo(() => {
  // 로그인 없다면 오늘 차트 1~10위 곡 메인화면에 올리기
  // 로그인 되었다면 로그인 정보 가져오기
  // 가장 많이 들었던 곡 가져오기 -> 곡 장르 가져오기
  // 해당 장르 데이터 가져와서 무작위로 뿌림

  // 로그인 없음 :: 차트 1~10위 곡 메인화면에 뿌리기

  const URL = "https://api.spotify.com/v1/playlists";
  const gTop50_playlist = "/37i9dQZEVXbMDoHDwVN2tF";

  const { token } = useSelector((state) => state.token);
  const dev_token = process.env.REACT_APP_DEVTOKEN;
  const [top, setTop] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(URL + gTop50_playlist, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          Accept: "application/json",
          "Content-Type": "application/json",
        });
        setTop(data.tracks.items.splice(0, 1));
        setList(data.tracks.items);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dev_token]);

  console.log(list);

  return (
    <MainContainer>
      <div className="inner">
        <section className="today-song">
          {list ? (
            <>
              <img className="big-img" src={top[0].track.album.images[0].url} alt="앨범아트" />
              <div>
                <p className="title">{top[0].track.album.name}</p>
                <p className="artist">
                  {top[0].track.artists.length > 1
                    ? top[0].track.artists[0].name + " 외"
                    : top[0].track.artists[0].name}
                </p>
                <p className="release">
                  {dayjs(top[0].track.album.release_date).format("YY.MM.DD") + " 발매"}
                </p>
              </div>
            </>
          ) : (
            <>
              <img className="big-img" src={imgPH} alt="이미지로딩중" />
              <div>
                <p className="title">로그인해주세요</p>
                <p className="artist">아티스트 이름</p>
                <p className="release">발매년월일</p>
              </div>
            </>
          )}
        </section>
        <section className="today-recommend">
          <h2>이런 곡은 어때요?</h2>
          <div>
            <ul className="song-list">
              {list
                ? list.map((v, i) => {
                    return (
                      <>
                        <li key={i}>
                          <Link to="/detail" className="song-info">
                            <img
                              className="small-img"
                              src={v.track.album.images[0].url}
                              alt="이미지로딩중"
                              width="80px"
                            />
                            <p>{v.track.album.name}</p>
                          </Link>
                        </li>
                      </>
                    );
                  })
                : new Array(5).fill(0).map((v, i) => {
                    return (
                      <>
                        <li key={i}>
                          <Link to="/detail" className="song-info">
                            <img
                              className="small-img"
                              src={imgPH}
                              alt="이미지로딩중"
                              width="80px"
                            />
                            <p>곡제목</p>
                          </Link>
                        </li>
                      </>
                    );
                  })}
            </ul>
          </div>
        </section>
      </div>
    </MainContainer>
  );
});

export default Main;
