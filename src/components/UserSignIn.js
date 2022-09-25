import styled from "styled-components";
import { generateRandomString } from "./module/RandomString.js";

const client_id = process.env.REACT_APP_CLIENT_ID;
const scope = "user-top-read";
const redirect_uri = process.env.REACT_APP_REDIRECT_URL + "/receipt";
const state = generateRandomString(16);

let URL = "https://accounts.spotify.com/authorize";
URL += "?response_type=token";
URL += "&client_id=" + encodeURIComponent(client_id);
URL += "&scope=" + encodeURIComponent(scope);
URL += "&redirect_uri=" + encodeURIComponent(redirect_uri);
URL += "&state=" + encodeURIComponent(state);

const UserSignInContainer = styled.div`
  .singIn {
    ${(props) => props.theme.button}
    width: 250px;
  }
`;

const UserSignIn = () => {
  const login = () => {
    window.location.href = URL;
  };

  return (
    <UserSignInContainer>
      <button className="singIn" onClick={login}>
        로그인하세요
      </button>
    </UserSignInContainer>
  );
};

export default UserSignIn;
