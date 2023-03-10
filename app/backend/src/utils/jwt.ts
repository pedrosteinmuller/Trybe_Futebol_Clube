import { sign, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
// import IPayload from '../interfaces/IPayload';

const secret = process.env.JWT_SECRET as string;

const generateToken = (payload: unknown, expiresIn = '10d') => {
  const jwtConfig: SignOptions = {
    expiresIn,
    algorithm: 'HS256',
  };

  const token = sign({ payload }, secret, jwtConfig);
  return token;
};

export default generateToken;
