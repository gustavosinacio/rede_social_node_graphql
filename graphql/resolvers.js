const uuid = require("uuid/v1");
const posts = [];

const resolvers = {
  Query: {
    posts: () => posts
  },

  Mutation: {
    addPost(parent, { post }) {
      const { description } = post;

      const newPost = {
        id: uuid(),
        picture: "/path",
        description,
        createdAt: new Date().toISOString(),
        claps: 0
      };

      posts.push(newPost);

      return newPost;
    },

    clap(parent, { postId }) {
      const index = posts.findIndex(element => element.id == postId);

      if (index !== -1) {
        posts[index].claps += 1;
        return posts[index];
      }

      return null;
    }
  }
};

module.exports = {
  resolvers
};
