import bcrypt from 'bcryptjs';
const extraPassStr = process.env.EXTRA_PASSWORD || 'Any_Random_Password_22';
export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const newPassword = extraPassStr + password + extraPassStr;
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const password = extraPassStr + suppliedPassword + extraPassStr;
    return await bcrypt.compare(password, storedPassword);
  }
}
