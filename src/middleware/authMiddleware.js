import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  //   console.log(req.headers.authorization.split(' ')[1]);
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "access_token", function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authorization",
        satatus: "ERROR",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authorization",
        satatus: "ERROR",
      });
    }
  });
};

export const authUserMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userid = req.params.id;
  jwt.verify(token, "access_token", function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authorization",
        satatus: "ERROR",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin || payload?.id === userid) {
      next();
    } else {
      return res.status(404).json({
        message: "The authorization",
        satatus: "ERROR",
      });
    }
  });
};
