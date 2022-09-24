import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import spotifylogo from "../../assets/img/Spotify_Logo_RGB_Green.png";

const FooterContainer = styled.footer`
  position: absolute;
  width: 100vw;
  bottom: 0;
  padding: 20px 0;
  text-align: center;

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
        <img src={spotifylogo} alt="스포티파이 로고" />
        <p>
          <Link to="https://github.com/smilemet/spotiplus">Github</Link>
        </p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
