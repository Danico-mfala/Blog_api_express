import { mongo } from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

// Get all the blogs
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

// Create Blog
export const createBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

//Update Blog
export const updataBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json("no such blog found");
  }
  return res.status(200).json({ blog });
};
//Get Blog By Id
export const getBlog = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(404).json("No Such BLOG Found");
  }
  return res.status(200).json({ blog });
};

//Delete blog by id
export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(404).json("Unable To Delete");
  }
  return res.status(200).json({ message: "successfully Delete" });
};
