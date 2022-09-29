/**
 * 오늘의 추천곡을 표시하는 메인페이지
 */
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getList, setMainTop, setMainList } from "../slices/MainSlice.js";

import styled from "styled-components";
import dayjs from "dayjs";

import imgPH from "../assets/img/img-placeholder.png";
import Loading from "../components/Loading.js";
import TodaySong from "../components/TodaySong.js";

const MainContainer = styled.main`
  img {
    &.big-img {
      width: ${(props) => props.theme.bigImgWidth};
    }

    &.small-img {
      width: ${(props) => props.theme.smallImgWidth};
    }
  }

  .today-song {
    margin-bottom: 35px;
    text-align: center;

    div {
      margin: 0 auto;
      width: ${(props) => props.theme.bigImgWidth};
    }

    img {
      margin-bottom: 15px;
    }

    p {
      margin: 0 auto;

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
    position: relative;

    & > h2 {
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 16px;
    }
  }
`;

const Main = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.token);
  const { data, mainTop, mainList } = useSelector((state) => state.mainList); // 전역 state - 메인페이지 track 정보
  const dispatch = useDispatch();

  /** 메인화면 실행 시 곡 리스트 가져오기 */
  useEffect(() => {
    if (data) return;
    if (token) {
      dispatch(getList({ token, setIsLoading }));
    } else {
      dispatch(setMainTop(null));
      dispatch(setMainList(null));
    }
  }, [token, dispatch]);

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <div className="inner">
          <section className="today-song">
            {data ? (
              <div>
                <Link to={`/detail/${mainTop.track.id}`}>
                  <img className="big-img" src={mainTop.track.album.images[0].url} alt="앨범아트" />
                  <p className="title">{mainTop.track.name}</p>
                  <p className="artist">
                    {mainTop.track.artists.length > 1
                      ? mainTop.track.artists[0].name + " 외"
                      : mainTop.track.artists[0].name}
                  </p>
                  <p className="release">
                    {dayjs(mainTop.track.album.release_date).format("YY.MM.DD") + " 발매"}
                  </p>
                </Link>
              </div>
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
            <TodaySong mainList={mainList} />
          </section>
        </div>
      )}
    </MainContainer>
  );
});

export default Main;
