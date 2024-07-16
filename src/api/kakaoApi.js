//CLIENT_ID : REST_API_KEY
//보안을 위해 .gitignore에 .env파일로 넣어두고 불러올 것

const CLIENT_ID = import.meta.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = import.meta.env.REACT_APP_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?
client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
