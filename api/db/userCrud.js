import {USER} from './db/db.js'



export async function createUser(email, username, password) {
  try {
    const newUser = await USER.create({ email, username, password });
    console.log("New user created:", newUser.toJSON());
    return newUser;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}
