/**
 * 오늘의 추천곡을 표시하는 메인페이지
 */
import React from "react";
import styled from "styled-components";

import imgPH from "../assets/img/img-placeholder.png";

const MainContainer = styled.main`
  padding: 0;

  img {
    &.big-img {
      width: 190px;
    }

    &.small-img {
      width: 80px;
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
    & > h2 {
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 16px;
    }

    ul {
      display: flex;
      li {
        margin-right: 10px;
        text-align: center;
        p {
          font-size: 11px;
          margin: 5px 0;
        }
      }
    }
  }
`;

const Main = () => {
  // 로그인 없다면 오늘 차트 1~10위 곡 메인화면에 올리기
  // 로그인 되었다면 로그인 정보 가져오기
  // 가장 많이 들었던 곡 가져오기 -> 곡 장르 가져오기
  // 해당 장르 데이터 가져와서 무작위로 뿌림

  return (
    <MainContainer>
      <div className="inner">
        <section className="today-song">
          <img className="big-img" src={imgPH} alt="이미지로딩중" />
          <div>
            <p className="title">곡 제목</p>
            <p className="artist">아티스트 이름</p>
            <p className="release">발매년월일</p>
          </div>
        </section>
        <section className="today-recommend">
          <h2>이런 곡은 어때요?</h2>
          <div>
            <ul className="song-list">
              <li>
                <img className="small-img" src={imgPH} alt="이미지로딩중" />
                <p>곡제목</p>
              </li>

              <li>
                <img className="small-img" src={imgPH} alt="이미지로딩중" />
                <p>곡제목</p>
              </li>

              <li>
                <img className="small-img" src={imgPH} alt="이미지로딩중" />
                <p>곡제목</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </MainContainer>
  );
};

export default Main;
