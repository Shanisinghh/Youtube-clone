import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export async function userRegister(req, res) {
  try {
    const { username, email, password, avatar, channels } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email, and password are required" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
      channels,
    });
    return res.status(201).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "User registration failed", error: error.message });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });
    res.cookie("token", token)
    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "User login failed", error: error.message });
  }
}




   

// import { User } from "../models/user.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // Function to handle user registration
// export async function userRegister(req, res) {
//    const { username, email, password, avatar, channels } = req.body;
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   User.insertOne({ username, email, password: hashedPassword,avatar, channels  })
//     .then((user) => {
//       res.status(200).json({ message: "User registered successfully", user });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "User already exists" });
//     });
// }

// // Function to handle user login
// export function userLogin(req, res) {
//   const { email, password } = req.body;

//   User.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         bcrypt.compare(password, user.password).then((result) => {
//           if (result) {
//             const token = jwt.sign(
//               { email, password },
//              " process.env.SECRET_KEY",
//               { expiresIn: "1200m" }
//             );
//             res.cookie("token", token);
//             res.status(200).json({ message: "Login successful", user });
//           } else {
//             res.status(401).json({ message: "Invalid password" });
//           }
//         });
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Server error", error: err.message });
//     });
// }