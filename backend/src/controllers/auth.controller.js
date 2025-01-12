import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { email, password, fullName, profilePic } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    const user = await User.findOne({ email }); // Added await here
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      profilePic,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });

      // res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Creadentials" });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Creadentials" });

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in signin", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const signout = (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).json({ message: "Signout success" });
  } catch (error) {
    console.log("error in signout", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateProfile = async (req, res) => {
    const {profilePic} = req.body;
    try {
        const userId = req.user._id;
        if(!profilePic) {
            return res.status(400).json({message: "Please provide profilePic"});
        }
        const uploadResponse =  await cloudinary.uploader.upload(profilePic)
        const updatedUser  = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url} , {new: true}); 


        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            profilePic: updatedUser.profilePic,
        })
    } catch (error) {
        log("error in updateProfile", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}


export const checkAuth = (req, res) => {

    
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}