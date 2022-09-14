import React from "react";
import styled from "styled-components";

import spotifylogo from "../../assets/img/Spotify_Logo_RGB_Green.png";

const FooterContainer = styled.footer`
  padding: 20px 0;
  background-color: ${(props) => props.theme.gray}; /** 나중에 삭제 */
  text-align: center;
  /* position: fixed;
  bottom: 0; */

  img {
    width: 70px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="inner">
        <img src={spotifylogo} alt="스포티파이 로고" />
      </div>
    </FooterContainer>
  );
};

export default Footer;
