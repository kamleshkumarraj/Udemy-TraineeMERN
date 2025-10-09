// first we write code for register the user on our website.

import { asyncErrorHandler } from "../errors/asyncErrorHandler.js";
import fs from 'fs/promises'
import {v4 as uuid} from 'uuid'
import bcrypt from 'bcrypt'

// now we write code for register the user.
export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const {firstName, lastName, email, password, address} = req.body;

  if(!firstName || !lastName || !email || !password || !address) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }
  const _id = uuid(); // unique id generate for each user.
  // now we hash the password before saving to the file.
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {_id, firstName, lastName, email, password : hashedPassword, address};

   // first we read the existing data from the file.
   const userDataContent = JSON.parse(await fs.readFile('../../public/data/users/users.json', 'utf-8')) || []

   userDataContent.push(userData);

    // now we write the data to the file.
    await fs.writeFile('../../public/data/users/users.json', JSON.stringify(userDataContent));

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: userData
    });

})

// now we write code for login the user

