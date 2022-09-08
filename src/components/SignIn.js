import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { getToken, setToken, setIsLogIn } from "../slices/SignSlice.js";

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
  // const [token]
  const { token, isLogIn } = useSelector((state) => state.sign);
  const dispatch = useDispatch();

  // 토큰 상태관리
  useEffect(() => {
    // dispatch(setToken(token));
  }, [token]);

  // 로그인 클릭
  const logIn = useCallback(() => {
    dispatch(getToken());
    console.log(token);
  }, [dispatch]);

  return (
    <SignInContainer {...props}>
      {token ? (
        <>
          <div>
            <p className="sign-info">
              <span>로그인</span>되었습니다.
            </p>
            <button className="sign-btn" onClick={logIn}>
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
