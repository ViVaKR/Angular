export interface IGoogleUser {
    email: string;
    firstName: string;
    lastName: string;
    idToken: string;
    name: string;
    id: string;
    photoUrl: string;
    provider: string;
}

export interface IGoogleUserDetail {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    nbf: number;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    iat: number;
    exp: number;
    jti: string;
}

/*
{
  "iss": "https://accounts.google.com",
  "azp": "client-id",
  "aud": "client-id",
  "sub": "117798414214275105367",
  "email": "kimburmjun@gmail.com",
  "email_verified": true,
  "nbf": 1724335110,
  "name": "김범준 (BJ)",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocLmjthSTO5Ysy3rM-xPZi_XXD-NV_HXmyN6DQ8s5IdJPbi5z1AJ=s96-c",
  "given_name": "범준",
  "family_name": "김",
  "iat": 1724335410,
  "exp": 1724339010,
  "jti": "301bc44bec0f23d71fee00bb459efeebf18846cd"
}

*/
