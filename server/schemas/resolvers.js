const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    searchBooks: async (parent, { query }) => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        // Extract relevant book data from the API response
        const books = data.items.map(item => ({
          authors: item.volumeInfo.authors || [],
          description: item.volumeInfo.description || '',
          bookId: item.id,
          image: item.volumeInfo.imageLinks?.thumbnail || '',
          link: item.volumeInfo.infoLink || '',
          title: item.volumeInfo.title || '',
        }));

        return books;
      } catch (error) {
        throw new Error('Error searching for books');
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d', 
      });

      return { token, user };
    },
    saveBook: async (parent, { authors,description,bookId,image,link,title }, context) => {
      if (context.user) {
        

       const user= await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: {authors,description,bookId,image,link,title} } }
        );

        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedBooks: {
                bookId: bookId,
                
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
