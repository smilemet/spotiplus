/**
 * 특정 곡의 정보를 표시하는 상세페이지
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import dayjs from "dayjs";

import { getDetail, clearDetail } from "../slices/DetailSlice.js";
import imgPH from "../assets/img/img-placeholder.png";
import SongChart from "../components/SongChart.js";
import Loading from "../components/Loading.js";

const DetailComponent = styled.main`
  padding: 0;

  .song-detail {
    max-width: 700px;
    margin: 0 auto;
    padding-bottom: 20px;
    display: flex;
    border-bottom: 1px solid #ccc;

    img {
      width: 50%;
      vertical-align: middle;
    }

    & > div {
      margin-left: 30px;

      p {
        font-size: 14px;
        margin-top: 10px;

        &.title {
          font-size: 20px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 30px;
        }
      }
    }
  }

  .chart {
    padding: 30px 0;
    text-align: center;

    p {
      font-size: 16px;
    }

    & > div {
      margin: 0 auto;
      max-width: 100%;
    }
    img {
      width: 100%;
    }
  }
`;

const Detail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.token);
  const { track, audio } = useSelector((state) => state.detail); // 전역 state - 상세페이지 track별 정보 & audio analysis
  const dispatch = useDispatch();

  const { id } = useParams(); // url에서 곡 id 가져오기

  /** id에 따른 곡 상세 정보 가져오기 */
  useEffect(() => {
    if (token) dispatch(getDetail({ id, token, setIsLoading }));
    return () => dispatch(clearDetail());
  }, [dispatch, id, token]);

  return (
    <DetailComponent>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <div className="inner">
          <section className="song-detail">
            {track ? (
              <>
                <img src={track.album.images[0].url} alt="앨범 이미지" />
                <div>
                  <p className="title">{track.name}</p>
                  <p>
                    {track.artists.map((v, i) => {
                      return i === track.artists.length - 1 ? v.name : v.name + ", ";
                    })}
                  </p>
                  <p>{dayjs(track.album.release_date).format("YY.MM.DD")} 발매</p>
                </div>
              </>
            ) : (
              <>
                <img src={imgPH} alt="이미지로딩중" />
                <div>
                  <p className="title"> </p>
                  <p> </p>
                  <p> </p>
                </div>
              </>
            )}
          </section>
          <section className="chart">
            <div>
              <p>오디오 속성</p>
              {audio ? (
                <SongChart
                  data={audio}
                  dataKey={[
                    "acousticness",
                    "danceability",
                    "energy",
                    "instrumentalness",
                    "liveness",
                    "loudness",
                    "speechiness",
                    "valence",
                  ]}
                />
              ) : (
                <></>
              )}
            </div>
          </section>
          <section></section>
        </div>
      )}
    </DetailComponent>
  );
};

export default Detail;
