import * as bcrypt from 'bcrypt';

export const hasPassword = async (password) => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const verivyPass = async (password, hassword) => {
  return bcrypt.compare(password, hassword);
};
