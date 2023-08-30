import createError from "../error.js";
import Video from "../models/Video.model.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (req.user.id === video.userId) {
      const updatedVideo = Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      next(createError(403, "Bukan Video anda!"));
    }
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
