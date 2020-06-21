import connectDb from '../../utils/connectDb';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import bcrypt from 'bcrypt';

connectDb();
export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).send('No user exist with that email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Password do not match');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).json(token);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server error');
  }
};
