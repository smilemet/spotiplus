import React from "react";
import styled from "styled-components";

import spotifylogo from "../../assets/img/Spotify_Logo_RGB_Green.png";

const FooterContainer = styled.footer`
  width: 100vw;
  padding: 10px 0;
  text-align: center;
  background-color: #fff;

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 0 auto;
  }

  img {
    width: 70px;
    margin: 10px;
    vertical-align: middle;
  }

  p {
    font-size: 12px;
    color: #ddd;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="inner">
        <hr />
        <img src={spotifylogo} alt="스포티파이 로고" />
        <p>
          <a href="https://github.com/smilemet/spotiplus">Github</a>
        </p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
