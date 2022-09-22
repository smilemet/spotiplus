/**
 * 맞춤추천 페이지에서 팝업되는 검색창
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "./layout/Modal.js";
import SearchBox from "../components/SearchBox.js";
import SongList from "./SongList.js";
import ArtistList from "./ArtistList.js";
import { useSelector } from "react-redux";
import axios from "axios";

const SearchContainer = styled(Modal)`
  .modal {
    ${(props) => props.theme.centerModal}
    width: 70%;
    height: 80vh;
    padding: 0;
    position: relative;

    .modal-inner {
      width: 85%;
      height: 90%;
      margin: 0 auto;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .search {
    .title {
      padding-left: 20px;
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .search-result {
    .genre {
      p {
        margin-bottom: 20px;
      }

      span {
        /* border: 1px solid ${(props) => props.theme.pointColor}; */
        /* padding: 0 10px; */
        white-space: wrap;
        margin: 0 10px;
        line-height: 2;
      }
    }
  }

  .no-data {
    padding: 20px 0;
  }
`;

const Search = (props) => {
  const { token } = useSelector((state) => state.token);
  const [list, setList] = useState(null);

  useEffect(() => {
    setList(null);
  }, [props.isOpen]);

  useEffect(() => {
    if (props.searchWhat?.params.type === "genre") {
      (async () => {
        try {
          const { data } = await axios.get(
            "https://api.spotify.com/v1/recommendations/available-genre-seeds",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              params: {
                grant_type: "client_credentials",
              },
            }
          );
          setList(data);
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [props.searchWhat]);

  return (
    <SearchContainer {...props}>
      <div className="modal-inner">
        <section className="search">
          <p className="title">
            {props.searchWhat?.params.type === "track" ? (
              <>트랙 검색</>
            ) : props.searchWhat?.params.type === "artist" ? (
              <>아티스트 검색</>
            ) : (
              <>장르 선택</>
            )}
          </p>
          <SearchBox {...props} setList={setList} />
        </section>
        <section className="search-result">
          {list ? (
            <>
              {list.tracks ? (
                <SongList
                  data={list.tracks}
                  setIsOpen={props.setIsOpen}
                  setTrack={props.setTrack}
                  setQuery={props.setQuery}
                  query={props.query}
                />
              ) : list.artists ? (
                <ArtistList
                  data={list.artists}
                  setIsOpen={props.setIsOpen}
                  setArtist={props.setArtist}
                  setQuery={props.setQuery}
                  query={props.query}
                />
              ) : (
                <div className="genre">
                  <p>선호 장르를 선택해주세요.</p>
                  <div>
                    {list?.genres.map((v, i) => {
                      return <span key={i}>{v}</span>;
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="no-data">
              {props.searchWhat?.params.type === "track" ? (
                <>곡 이름을 검색해보세요.</>
              ) : props.searchWhat?.params.type === "artist" ? (
                <>아티스트 이름을 검색해보세요.</>
              ) : (
                <>선호 장르를 선택해주세요.</>
              )}
            </div>
          )}
        </section>
      </div>
    </SearchContainer>
  );
};

export default Search;
