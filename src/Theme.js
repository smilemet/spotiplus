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

  // 임시 컬러
  gray: "#eee",

  // inner 안 max-width
  maxWidth: "670px",

  // 각종 버튼
  button: `
    width: 100%;
    height: 35px;
    background-color: #1ed760;
    color: #fff;
  `,

  // 메인페이지 앨범 이미지
  smallImgWidth: "80px",
};

export default theme;
