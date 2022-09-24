const size = {
  mobile: "720px",
  desktop: "721px",
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  desktop: `(min-width: ${size.desktop})`,

  // 컬러
  pointColor: "#1ed760",
  pointColorDarker: "#1ba738",
  pointFontColor: "#fff",
  alertText: "#dd0000",

  // 임시 컬러
  gray: "#eee",

  // inner 안 max-width
  maxWidth: "670px",

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
    background-color: #1ed760;
    color: #fff;
    cursor: pointer;
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
  smallImgWidth: "80px",
};

export default theme;
