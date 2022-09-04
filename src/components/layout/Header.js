import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal.js";

const HeaderContainer = styled.header`
  padding: 35px 0 30px;

  .title-bar {
    padding-bottom: 10px;
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

    li {
      display: block;
      height: 35px;
      width: 100%;
      line-height: 32px;
      text-align: center;
      /* background-color: #23477330; */

      &:hover {
        background-color: #eee;
      }
    }

    a {
      display: block;
      width: 100%;
      padding: 0 11%;

      & > div {
        display: inline-block;

        .under-bar {
          height: 3px;
          background-color: #1ed760;
          border-radius: 2px;
        }
      }
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
  const [tab1Active, setTap1Active] = useState(false);
  const [tab2Active, setTap2Active] = useState(false);
  const [tab3Active, setTap3Active] = useState(false);

  // 탭 하단 언더바 표시
  const handleTab1 = () => {
    setTap1Active((tab1Active) => true);
    setTap2Active((tab2Active) => false);
    setTap3Active((tab3Active) => false);
  };

  const handleTab2 = () => {
    setTap1Active((tab1Active) => false);
    setTap2Active((tab2Active) => true);
    setTap3Active((tab3Active) => false);
  };

  const handleTab3 = () => {
    setTap1Active((tab1Active) => false);
    setTap2Active((tab2Active) => false);
    setTap3Active((tab3Active) => true);
  };

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
              <li onClick={handleTab1}>
                <NavLink to="/">
                  <div>
                    곡 검색
                    <div className="under-bar" style={{ display: tab1Active ? "block" : "none" }} />
                  </div>
                </NavLink>
              </li>
              <li onClick={handleTab2}>
                <NavLink to="/">
                  <div>
                    맞춤추천
                    <div className="under-bar" style={{ display: tab2Active ? "block" : "none" }} />
                  </div>
                </NavLink>
              </li>
              <li onClick={handleTab3}>
                <NavLink to="/">
                  <div>
                    영수증
                    <div className="under-bar" style={{ display: tab3Active ? "block" : "none" }} />
                  </div>
                </NavLink>
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
