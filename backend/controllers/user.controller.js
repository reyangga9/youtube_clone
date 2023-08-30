import createError from "../error.js";
import User from "../models/user.model.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user._id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only access only your account!"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user._id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete only your account!"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;
    // console.log(user);
    res.json(others);
  } catch (error) {
    res.json(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscribtion succesfull");
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscribtion succesfull");
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  res.json("Its Succesfull");
};
