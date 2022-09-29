/**
 * 파라미터에 입력된 길이만큼 랜덤 문자열 출력
 * @param {Number} num    문자 길이
 * @returns {String}      랜덤으로 생성된 문자열
 */
export const generateRandomString = (num) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
