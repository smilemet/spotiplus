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

  button: `
    width: 100%;
    height: 35px;
    background-color: #1ed760;
    color: #fff;
  `,
};

export default theme;
