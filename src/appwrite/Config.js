import Conf from "../conf/Conf";
import { ID, Databases, Storage, Client, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(Conf.appWrite).setProject(Conf.appWritePI);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ tittle, slug, content, featuredImage, userID, status }) {
    try {
      return await this.databases.createDocument(
        Conf.appWriteDB,
        Conf.appWriteCI,
        slug,
        {
          tittle,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { tittle, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Conf.appWriteDB,
        Conf.appWriteCI,
        slug,
        {
          tittle,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Conf.appWriteDB,
        Conf.appWriteCI,
        slug
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        Conf.appWriteDB,
        Conf.appWriteCI,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        Conf.appWriteDB,
        Conf.appWriteCI,
        queries
      );
    } catch (error) {
      throw error;
    }
  }
  // file upload service  ke function hai
 
  // upload the file in the storage and return a file id this file id is used as feturedimage in create file
  async uploadfile(file) {
    try {
      return await this.bucket.createFile(
        Conf.appWriteBI,
         ID.unique(), 
         file
        );
    } catch (error) {
      throw error;
    }
  }
  // delete the file from storage 
  async deletefile(fileID) {
    try {
      await this.bucket.this.deleteFile(Conf.appWriteBI, fileID);
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }
// return a url for previewing a file
  getfilepreview(fileID) {
    return this.bucket.getFilePreview(
        Conf.appWriteBI,
        fileID
    );
  }
}

const service = new Service();

export default service;
