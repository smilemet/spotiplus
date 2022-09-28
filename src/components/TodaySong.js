import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TodaySongContainer = styled.div`
  ul {
    display: flex;

    li {
      width: ${(props) => props.theme.smallImgWidth} !important;
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

  .splide__arrow {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    font-size: 30px;
    opacity: 0.7;
    position: absolute;
    top: 65px;
    z-index: 10;

    span {
      position: absolute;
      top: 5%;
    }

    &.splide__arrow--prev {
      left: 0;

      span {
        left: 50%;
        transform: translate(-55%);
      }
    }

    &.splide__arrow--next {
      right: 0;
      span {
        left: 50%;
        transform: translate(-45%);
      }
    }
  }
`;

const TodaySong = (props) => {
  return (
    <TodaySongContainer>
      <Splide
        Splide
        options={{
          type: "slide",
          gap: "0.5rem",
          drag: "free",
          perPage: 3,
          pagination: false,
        }}
        hasTrack={false}
        aria-label="Global Top50"
        aria-busy="false"
      >
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev">
            <span>◀</span>
          </button>
          <button className="splide__arrow splide__arrow--next">
            <span>▶</span>
          </button>
        </div>
        <SplideTrack>
          {props.mainList ? (
            props.mainList.map((v, i) => {
              return (
                <SplideSlide>
                  <Link to={`/detail/${v.track.id}`} className="song-info">
                    <img
                      className="small-img"
                      src={v.track.album.images[0].url}
                      alt="이미지로딩중"
                      width="80px"
                    />
                    <p>{v.track.name}</p>
                  </Link>
                </SplideSlide>
              );
            })
          ) : (
            <></>
          )}
        </SplideTrack>
      </Splide>
    </TodaySongContainer>
  );
};

export default TodaySong;
