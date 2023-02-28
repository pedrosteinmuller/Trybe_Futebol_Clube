import ILogin from '../../interfaces/ILogin';
import loginSchema from './schema';

const checkValidate = (body: ILogin) => {
  const { error } = loginSchema.validate(body);
  if (error) return error.message;
  return null;
};

export default checkValidate;
