import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

const createAdmin = async () => {
  try {
    const adminExists =
      await User.findOne({
        email: "admin@gmail.com"
      });

    if (adminExists) {
      console.log(
        "Admin already exists"
      );

      return;
    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await User.create({
      name: "Admin",

      email: "admin@gmail.com",

      password: hashedPassword,

      role: "admin",

      status: "active"
    });

    console.log(
      "Default admin created"
    );
  } catch (error) {
    console.error(error);
  }
};

export default createAdmin;