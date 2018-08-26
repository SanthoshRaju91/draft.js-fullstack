const Blog = require("./blogs.model");

const resolvers = {
  Query: {
    getBlogs: async () => {
      try {
        const blogs = await Blog.find({});
        return blogs;
      } catch (err) {
        throw err;
      }
    },

    getBlog: async (_, { id }) => {
      try {
        const blog = await Blog.findById(id);
        return blog;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createBlog: async (_, { title, content }) => {
      try {
        const newBlog = new Blog({
          title,
          content
        });

        await newBlog.save();

        return {
          success: true,
          message: "Saved"
        };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          message: "Error while saving to DB"
        };
      }
    }
  }
};

module.exports = resolvers;
