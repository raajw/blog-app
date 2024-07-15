import mongoose from "mongoose";
import { Blog } from "../model/Blog.js";

const fetchListOfBlogs = async (req, res) => {
    let blogList
    try {
         blogList = await Blog.find();
        if (!blogList ) {
            return res.status(404).json({ message: "No blogs found" });
        }
        return res.status(200).json({ blogList });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json({ message: "Server error" });
    }
};

const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newlyCreateBlog = new Blog({
        title,
        description,
        date: currentDate
    });

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        
        await newlyCreateBlog.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ newlyCreateBlog });
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error('Error while adding new blog:', error);
        return res.status(500).json({ message: "Server error" });
    }
};

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error while deleting blog:', error);
        return res.status(500).json({ message: "Unable to delete" });
    }
};

const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    try {
        const currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });

        if (!currentBlogToUpdate) {
            return res.status(404).json({ message: 'Unable to update, blog not found' });
        }
        return res.status(200).json({ message: 'Blog updated successfully', blog: currentBlogToUpdate });
    } catch (error) {
        console.error('Error while updating blog:', error);
        return res.status(500).json({ message: "Something went wrong while updating" });
    }
};

export { fetchListOfBlogs, deleteBlog, addNewBlog, updateBlog };
