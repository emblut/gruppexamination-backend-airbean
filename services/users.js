import User from '../models/user.js';

export async function checkIfUserExists(userId) {
  try {
    const userExists = await User.findOne({ userId });
    return !!userExists;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}
