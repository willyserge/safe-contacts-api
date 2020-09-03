import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = ({ id, email }) => {
  const token = jwt.sign(
    { id, email },
    process.env.JWT_SECRET
  );
  return token;
};

export default generateToken;
