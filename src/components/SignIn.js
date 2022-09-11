import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { setToken, setIsLogIn, getToken } from "../slices/TokenSlice.js";

import Modal from "./layout/Modal.js";

const SignInContainer = styled(Modal)`
  .modal {
    padding: 40px 20px;
  }

  .sign-info {
    font-size: 16px;
    margin-bottom: 20px;

    span {
      color: ${(props) => props.theme.pointColorDarker};
    }
  }

  .sign-btn {
    ${(props) => props.theme.button}
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .night-btn {
    position: absolute;
    bottom: 30px;
    right: 17px;
  }
`;

const SignIn = (...props) => {
  const { token, expire, isLogIn } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // 로그인
  const logIn = useCallback(() => {
    dispatch(getToken());
  }, [dispatch]);

  // 로그아웃
  const logOut = useCallback(() => {
    let clear = { value: null, expire: null };
    dispatch(setToken(clear));

    localStorage.clear("spotify_token");
  });

  // 발급 토큰 있으면 세팅
  useEffect(() => {
    let isToken = localStorage.getItem("spotify_token");
    if (isToken) {
      let parseToken = JSON.parse(isToken);
      dispatch(setToken(parseToken));
    }
  }, [token]);

  return (
    <SignInContainer {...props}>
      {token && expire >= Date.now() ? (
        <>
          <div>
            <p className="sign-info">
              <span>로그인</span>되었습니다.
            </p>
            <button className="sign-btn" onClick={logOut}>
              로그아웃
            </button>
          </div>
          <div>
            <input type="checkbox" className="night-btn" />
          </div>
        </>
      ) : (
        <>
          {/* 로그인 정보 없음 */}
          <div>
            <p className="sign-info">
              <span>로그인</span>해주세요.
            </p>
            <button className="sign-btn" onClick={logIn}>
              로그인
            </button>
          </div>
          <div>
            <input type="checkbox" className="night-btn" />
          </div>
        </>
      )}
    </SignInContainer>
  );
};

export default SignIn;
