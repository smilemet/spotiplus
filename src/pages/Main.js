/**
 * 오늘의 추천곡을 표시하는 메인페이지
 */
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getList, setMainTop, setMainList } from "../slices/MainSlice.js";

import styled from "styled-components";
import dayjs from "dayjs";
import FadeLoader from "react-spinners/FadeLoader";

import imgPH from "../assets/img/img-placeholder.png";

const MainContainer = styled.main`
  padding: 0;

  @mixin small-img-width() {
    width: 80px;
  }

  .loading {
    display: ${(props) => (props.isLoading ? "block" : "none")};
    background-color: #ffffff;
    inset: 0 0 0 0;
    position: absolute;
    z-index: 99;
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

const spinnerCSS = {
  position: "absolute",
  top: "none",
  right: "none",
  left: "50%",
  bottom: "50%",
};

const Main = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.token);
  const { data, mainTop, mainList } = useSelector((state) => state.mainList);
  const dispatch = useDispatch();

  // 메인화면 실행 시 토큰 획득
  useEffect(() => {
    if (token) {
      dispatch(getList({ token, setIsLoading }));
    } else {
      dispatch(setMainTop(null));
      dispatch(setMainList(null));
    }
  }, [token, dispatch]);

  return (
    <MainContainer isLoading={isLoading}>
      <div className="loading">
        <FadeLoader color="#36d7b7" loading={isLoading} cssOverride={spinnerCSS} />
      </div>
      <div className="inner">
        <section className="today-song">
          {data ? (
            <Link to={`/detail/${mainTop.track.id}`}>
              <img className="big-img" src={mainTop.track.album.images[0].url} alt="앨범아트" />
              <div>
                <p className="title">{mainTop.track.name}</p>
                <p className="artist">
                  {mainTop.track.artists.length > 1
                    ? mainTop.track.artists[0].name + " 외"
                    : mainTop.track.artists[0].name}
                </p>
                <p className="release">
                  {dayjs(mainTop.track.album.release_date).format("YY.MM.DD") + " 발매"}
                </p>
              </div>
            </Link>
          ) : (
            <>
              <img className="big-img" src={imgPH} alt="이미지로딩중" />
              <div>
                <p className="title">------</p>
                <p className="artist">------</p>
                <p className="release">------</p>
              </div>
            </>
          )}
        </section>
        <section className="today-recommend">
          <h2>이런 곡은 어때요?</h2>
          <div>
            <ul className="song-list">
              {mainList
                ? mainList.map((v, i) => {
                    return (
                      <>
                        <li key={i}>
                          <Link to={`/detail/${v.track.id}`} className="song-info">
                            <img
                              className="small-img"
                              src={v.track.album.images[0].url}
                              alt="이미지로딩중"
                              width="80px"
                            />
                            <p>{v.track.name}</p>
                          </Link>
                        </li>
                      </>
                    );
                  })
                : new Array(7).fill(0).map((i) => {
                    return (
                      <>
                        <li key={i}>
                          <Link to="" className="song-info">
                            <img
                              className="small-img"
                              src={imgPH}
                              alt="이미지로딩중"
                              width="80px"
                            />
                            <p>-</p>
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
