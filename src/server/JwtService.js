import jwt from "jsonwebtoken";
export const genneralAccessToken = (payload) => {
  const access_Token = jwt.sign(
    {
      ...payload,
    },
    "access_token",
    { expiresIn: "30s" }
  );
  return access_Token;
};

export const genneralRefreshToken = (payload) => {
  const access_Token = jwt.sign(
    {
      ...payload,
    },
    "refresh_token",
    { expiresIn: "7d" }
  );
  return access_Token;
};
