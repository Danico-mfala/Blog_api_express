import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updataBlog,
} from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.post("/add", createBlog);
blogRouter.put("/update/:id", updataBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
