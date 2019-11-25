const uuid = require('uuid/v1');
const posts = [];
const storage = require('../config/storage');

const resolvers = {
  Query: {
    posts: () => posts,
  },

  Mutation: {
    async addPost(parent, { post }) {
      const { description, picture } = post;
      const { mimetype, createReadStream } = await picture;

      const { path } = await storage.upload(createReadStream(), mimetype);
      const newPost = {
        id: uuid(),
        picture: path,
        description,
        createdAt: new Date().toISOString(),
        claps: 0,
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
    },
  },
};

module.exports = {
  resolvers,
};
