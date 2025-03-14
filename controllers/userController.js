import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, authType: 'email' });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await googleClient.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
        const { email, given_name, family_name, sub } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ firstName: given_name, lastName: family_name, email, googleId: sub, authType: 'google' });
            await user.save();
        }

        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token: jwtToken, user });
    } catch (error) {
        res.status(500).json({ message: 'Google authentication failed', error });
    }
};

export const assignHospital = async (req, res) => {
    try {
        const { userId, hospitalId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.hospitalId = hospitalId;
        await user.save();

        res.status(200).json({ message: 'User assigned to hospital successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};