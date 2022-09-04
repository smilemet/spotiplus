import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal.js";
import { Checkbox } from "react-bootstrap";

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
  .modal {
    padding: 40px 20px;
  }

  .sign-info {
    font-size: 16px;
    margin-bottom: 20px;

    span {
      color: #1ba738;
    }
  }

  .sign-btn {
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    background-color: #1ed760;
    color: #fff;
    border-radius: 5px;
  }

  .night-btn {
    position: absolute;
    bottom: 30px;
    right: 17px;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
                <NavLink to="/search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </NavLink>
              </span>
              <span className="menu-icon" onClick={handleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </span>
            </div>
          </div>

          <nav className="nav-bar">
            <ul>
              <li>
                <NavLink to="/search">
                  <div>
                    곡 검색
                    <div
                      className="under-bar"
                      style={{ display: location.pathname === "/search" ? "block" : "none" }}
                    />
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/recommend">
                  <div>
                    맞춤추천
                    <div
                      className="under-bar"
                      style={{ display: location.pathname === "/recommend" ? "block" : "none" }}
                    />
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/receipt">
                  <div>
                    영수증
                    <div
                      className="under-bar"
                      style={{ display: location.pathname === "/receipt" ? "block" : "none" }}
                    />
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </HeaderContainer>

      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} width="60%" height="100%">
        {/* 로그인 정보 없음 */}
        <div>
          <p className="sign-info">
            <span>로그인</span>해주세요.
          </p>
          <button className="sign-btn">로그인</button>
        </div>
        <div>
          <input type="checkbox" className="night-btn" />
        </div>
      </SignIn>
    </>
  );
};

export default Header;
