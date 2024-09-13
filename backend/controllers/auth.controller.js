import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendPasswordResetSuccessEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";


// Function for signup
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Validate input fields
    if (!email || !password || !name) {
      throw new Error("All fields are required.");
    }

    // Check if user already exists
    const userAlreadyExist = await User.findOne({ email });
    console.log(userAlreadyExist);
    if (userAlreadyExist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token and set it as a cookie
    generateTokenAndSetCookie(res, user._id);

    // Send verification email
    await sendVerificationEmail(user.email, user.verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc, // Include user data in the response
        password: undefined, // Remove password from the response
      },
    });

    console.log(user);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Function to verify email
// Function to verify email
export const verifyEmail = async (req, res) => {
  const { code } = req.body; // Make sure the client sends this in the request body
  try {
    // Find the user with the given verification token and check that the token is not expired
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }, // Token must be valid (not expired)
    });

    if (!user) {
      // Return error if the user is not found or the token is expired
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    // Update the user's verification status
    user.isVerified = true;
    user.verificationToken = undefined; // Clear verification token
    user.verificationTokenExpiresAt = undefined; // Clear token expiration
    await user.save(); // Save changes to the database

    // Send a welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Return a success response
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
    // Handle errors and return a response
    console.log("Error in verifyEmail:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: "Email not verified" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({ success: true, message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      }
     });
  } catch (error) {
    consoleole.log("Error in login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function for logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    //generate preset token

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({ success: true, message: "Password reset link sent successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, // Token must be valid (not expired)
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Update password
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    // Send password reset success email
    await sendPasswordResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {  
    console.log("Error in resetPassword:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if(!user){
      return res.status(400).json({ success: false, message: "User not found" })
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error)
    res.status(400).json({ success: false, message: error.message })
  }
}