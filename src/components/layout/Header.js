import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal.js";

const HeaderContainer = styled.header`
  padding: 40px 0 30px;
  background-color: #eeeeee70;

  .title-bar {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h1 {
      font-size: 24px;
      font-weight: bold;
    }

    .menu {
      span {
        margin-right: 20px;
        font-size: 20px;
      }
      span:last-of-type {
        margin-right: 0;
      }
    }
  }

  .nav-bar {
    ul {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
  }
`;

const SignIn = styled(Modal)`
  .sign-btn {
    width: 100%;
    height: 35px;
    background-color: #1ed760;
    color: #fff;
    border-radius: 5px;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 클릭 시 메뉴 모달창 팝업
  const handleMenu = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <HeaderContainer>
        <div className="inner">
          <div className="title-bar">
            <Link to="/">
              <h1>Spotiplus</h1>
            </Link>
            <div className="menu">
              <span className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <span className="menu-icon" onClick={handleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </span>
            </div>
          </div>

          <nav className="nav-bar">
            <ul>
              <li>
                <NavLink to="/">곡 검색</NavLink>
              </li>
              <li>
                <NavLink to="/">맞춤추천</NavLink>
              </li>
              <li>
                <NavLink to="/">영수증</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </HeaderContainer>

      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} width="100%" height="150px">
        {/* 로그인 정보 없음 */}
        <div>
          <p>
            <span>로그인</span>해주세요.
          </p>
          <span>switch</span>
        </div>
        <div>
          <button className="sign-btn">로그인</button>
        </div>
      </SignIn>
    </>
  );
};

export default Header;
