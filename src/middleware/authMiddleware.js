import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  //   console.log(req.headers.authorization.split(' ')[1]);
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "access_token", function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "Invalid authorization (expired)",
        satatus: "ERROR",
      });
    }

    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Invalid authorization (not admin)",
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
        message: "Tokens expire",
        satatus: "ERROR",
      });
    }
    console.log("user" , user);
    if (user?.isAdmin || user?.id === userid) {

      next();
    } else {
      return res.status(404).json({
        message: "The authorization",
        satatus: "ERROR",
      });
    }
  });
};

// export const authUserMiddleware = (req, res, next) => {
//   // console.log("req.headers", req.headers);
//   try {
//     const authorizationHeader = req.headers.authorization;
//     if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Invalid authorization header",
//         status: "ERROR",
//       });
//     }
//     const token = authorizationHeader.split(" ")[1];
//     const userId = req.params.id;
//     jwt.verify(token, "access_token", function (err, user) {
//       if (err) {
//         if (err instanceof jwt.JsonWebTokenError) {
//           return res.status(401).json({
//             message: "Invalid token",
//             status: "ERROR",
//           });
//         } else if (err instanceof jwt.TokenExpiredError) {
//           return res.status(401).json({
//             message: "Token expired",
//             status: "ERROR",
//           });
//         } else {
//           return res.status(401).json({
//             message: "Token verification failed",
//             status: "ERROR",
//           });
//         }
//       }
//       // console.log("user2:", JSON.stringify(user));
//       const userobj = JSON.stringify(user);
//       // console.log("user", userobj);
//       const parsedUser = JSON.parse(userobj);

//       if (parsedUser?.isAdmin || parsedUser?.id === userId) {
//         next();
//       } else {
//         return res.status(403).json({
//           message: "Unauthorized access",
//           status: "ERROR",
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error in authUserMiddleware:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       status: "ERROR",
//     });
//   }
// };
