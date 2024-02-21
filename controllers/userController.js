// Refactored from CS52: https://brunchlabs.notion.site/Schedule-7457e761c83f4b37bbbdca10e045b1d9?p=b2d5bb7f6ab3421ba2f96ae25c4761e9&pm=s

import { User } from '../models/userModel.js';
import jwt from 'jwt-simple';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
  }

export const signin = (user) => {
    // WORK: can make this more complex by throwing some error messages if the email doesn't exist/password is incorrect
    // Can also send a message to redirect to sign up page
    return { token: tokenForUser(user), user };
}

export const signup = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('You must provide email and password');
      }
      
      // See if a user with the given email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // If a user with email does exist, return an error
        throw new Error('Email is in use');
      }
      
      const user = new User();
      user.email = email;
      user.password = password;

      user._userId = '';
      user.fullName = '';
      user.bday = '';
      user.birthday = '';
      user.gender = '';
      user.pic = '';
      user.bio = '';
      user.workouts = [];

      await user.save();
      
      return tokenForUser(user);

}

// export async function createUser(request) {
//     const newUser = {
//         _userId: request.body._userId,
//         fullName: request.body.fullName,
//         bday: request.body.bday,
//     };

//     const user = await User.create(newUser);
//     return user;
// }

export async function getUser(id) {
    const user = await User.findById(id);
    return user;
}

export async function updateUser(request) {
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    return result;
}

export async function deleteUser(request) {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);
    return result;
}