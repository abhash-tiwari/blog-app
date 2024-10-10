import Blog from "../models/blog.model.js";

export const createBlogs = async (req, res) => {
  try {
    const { title, content, location ,subheading } = req.body;
    const author = req.user.id;

    const newBlog = new Blog({
      title,
      content,
      author,
      location,
      subheading,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating blog post" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", "username email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching blog post" });
  }
};