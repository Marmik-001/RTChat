import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signin = async (req, res) => {
  const { email, password, fullName, profilePic } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    const user = User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      profilePic,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res
        .status(201)
        .json({
          _id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          profilePic: newUser.profilePic,
        });

      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ message: "Internal server error" });
    
  }
};
export const signup = (req, res) => {
  res.send("signup");
};
export const signout = (req, res) => {
  res.send("signout");
};
