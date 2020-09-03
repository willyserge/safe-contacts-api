import _ from 'lodash';
import User from '../models/user';
import generateToken from '../utils';


const Auth = {
  async signup(req, res, next) {
    const {
      firstname, lastname, username, email, password
    } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({ error: { message: 'email already exists' } });
    }
    user = await User.findOne({ username });
    if (user) {
      return res.status(409).send({ error: { message: 'username taken' } });
    }
    const newUser = new User({
      firstname, lastname, email, username, password
    });

    try {
      await newUser.save();
      const token = generateToken(newUser);
      return res.status(201).json({
        message: 'user created successfully',
        token,
        user: _.pick(newUser, ['_id', 'firstname', 'email', 'username'])
      });
    } catch (error) {
      return next(new Error(error));
    }
  },

  async signin(req, res, next) {
    const { email, password, username } = req.body;
    const user = await User.findOne({ email }) || await User.findOne({ username });
    if (!user) return res.status(401).json({ error: { message: 'invalid credentials' } });
    const isValid = await user.isPasswordValid(password);
    if (!isValid) return res.status(401).json({ error: { message: 'invalid credentials' } });
    const token = generateToken(user);
    return res.status(200).json({
      message: 'User is successfully logged in',
      token,
      user: _.pick(user, ['firstname', 'email', 'email'])
    });
  }
};
export default Auth;
