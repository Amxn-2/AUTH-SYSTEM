import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
      const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: "7d"
      });


      res.cookie("token", token, {
            httpOnly: true, // prevents client side js from accessing the cookie
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
            sameSite: "strict", //prevent csrf attacks
            secure: process.env.NODE_ENV == "production",
      });
      return token;
}