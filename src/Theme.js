const variable = {
  mobile: "900px",
  desktop: "901px",

  pointColor: "#1ed760",
  pointColorDarker: "#1ba738",
  pointFontColor: "#fff",
  alertText: "#dd0000",
};

const theme = {
  mobile: `(max-width: ${variable.mobile})`,
  desktop: `(min-width: ${variable.desktop})`,

  // 컬러
  pointColor: "#1ed760",
  pointColorDarker: "#1ba738",
  pointFontColor: "#fff",
  alertText: "#dd0000",

  // 임시 컬러
  gray: "#eee",

  // inner 안 max-width
  maxWidth: "900px",

  // 영수증 폰트
  receiptTitle: `
    font-family: "Happiness-Sans-Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Bold.woff2")
      format("woff2");
  `,

  receiptFont: `
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
  `,

  // 각종 버튼
  button: `
    width: 100%;
    height: 35px;
    background-color: ${variable.pointColor};
    color: #fff;
    cursor: pointer;
  `,

  // 반짝이는 버튼
  shine: `
    border: 1px solid ${variable.pointColor};
    box-shadow: 0 0 3px ${variable.pointColor};
    background-color: $fff;
    color: ${variable.pointColor};
  `,

  // 모달창
  centerModal: `
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  `,

  // 메인페이지 앨범 이미지
  bigImgWidth: "250px",
  smallImgWidth: "120px",
};

export default theme;
