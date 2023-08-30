import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createError from "../error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  try {
    // hashing password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("user has been created!");
  } catch (error) {
    next(error);
    //todo
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    // mencari user , jika salah return user not found
    if (!user) return next(createError(404, "User Not Found"));

    const isCorrect = bcrypt.compare(req.body.password, user.password);
    // mengcompare password jika salah return error
    if (!isCorrect) return next(createError(404, "wrong credential"));

    const { password, ...others } = user._doc;

    // untuk membuat token jwt menggunaakn sign
    const token = jwt.sign(others, process.env.JWT);

    res
      // untuk menyimpan token jwt mengngunakan cookie parser
      .cookie("access_token", token, {
        // make app more secure
        httpOnly: true,
      })
      .status(200)
      .json(others);
    // res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .cookie("access_token", "", {
        expires: new Date(0),
        httpOnly: true,
      })
      .send("Logout Succesfully");
  } catch (error) {
    next(error);
  }
};
