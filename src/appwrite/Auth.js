import Conf from "../conf/Conf";
import { Client, Account, ID } from "appwrite";

export class Authentication {
  client = new Client();
  account;

  constructor() {
    if (!Conf.appWrite || !Conf.appWritePI) {
      throw new Error("Appwrite configuration is missing");
    }
    this.client.setEndpoint(Conf.appWrite).setProject(Conf.appWritePI);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      // Sanitize name to ensure it meets Appwrite's requirements
      const sanitizedName = name.trim().replace(/[^a-zA-Z0-9._-]/g, "");
      if (!sanitizedName) {
        throw new Error("Invalid name provided");
      }

      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        sanitizedName
      );
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("❌ Create account error:", error);
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  }

  async getcurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("❌ Error getting user:", error);
    }
    return null;
  }
  async logOut() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("❌ Logout error:", error);
      throw error;
    }
  }
}
const authservice = new Authentication();

export default authservice;
