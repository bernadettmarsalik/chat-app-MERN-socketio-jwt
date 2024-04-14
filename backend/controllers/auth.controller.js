import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// ! SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Profile picture

    // Fetch the profile picture URL based on gender
    const profilePicURL = await fetchProfilePic(gender);

    // Create the new user object with the fetched profile picture URL
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: profilePicURL,
    });

    if (newUser) {
      // Generate JWT token and set cookie
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ! LOG IN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    ); //if undefined or no user (bcrypt miatt kell)
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ! LOG OUT
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchProfilePic = async (gender) => {
  try {
    // Define the base URL of the RandomUser.me API
    const baseURL = "https://randomuser.me/api/";

    // Construct the URL with the gender parameter
    const url = `${baseURL}?gender=${gender}`;

    // Make a GET request to the API
    const response = await fetch(url);
    const data = await response.json();

    return data.results[0].picture.thumbnail;
  } catch (error) {
    console.error("Error fetching profile picture:", error.message);
    throw error;
  }
};
