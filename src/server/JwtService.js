import jwt from "jsonwebtoken";
export const genneralAccessToken = (payload) => {
  const access_Token = jwt.sign(
    {
      ...payload,
    },
    "access_token",
    { expiresIn: "1d" }
  );
  return access_Token;
};

export const genneralRefreshToken = (payload) => {
  const access_Token = jwt.sign(
    {
      ...payload,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );
  return access_Token;
};
export const refreshTokenSV = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, "refresh_token", async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "The authentication",
          });
        }
        const { payload } = user;
        const access_token = await genneralAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin,
        });
        if (refreshTokenSV) {
          resolve({
            status: "OK",
            message: "The SUSSCESS",
            access_token,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
