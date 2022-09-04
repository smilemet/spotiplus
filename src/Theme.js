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
  maxWidth: "530px",
};

export default theme;
