import * as bcrypt from 'bcrypt';
export async function setPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  userPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, userPassword);
}
