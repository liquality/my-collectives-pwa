import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import MySQL, { db } from "../../MySQL";
import ApiError from "./ApiError";
export interface UserModel {
  id: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  nonce: number;
  public_address?: string;
  service_provider_name?: string;
  created_at?: Date;
}

export interface UserCreateModel {
  email: string;
  first_name: string;
  last_name: string;
  public_address: string;
  service_provider_name: string;
}

class Auth {
  id?: number;
  constructor(auth?: any) {
    this.set(auth);
  }

  set(auth?: any) {
    if (auth) {
      this.id = auth.id;
    }
  }

  async find(
    publicAddress: string
  ): Promise<UserModel | null> {
    // TODO: clean not required fields from the query
    const results = await db.query(
      "SELECT * FROM `user` WHERE public_address = ?",
      [publicAddress]
    );

    if (results.length > 0) {
      return results[0] as UserModel;
    }

    return null;
  }

  async findOrCreate(
    publicAddress: string
  ): Promise<UserModel | null> {
    // TODO: clean not required fields from the query
    //1: read the user
    let _user = await this.find(publicAddress);

    //2: create if not exists
    if(!_user) {
      _user = await this.createUser({
        public_address: publicAddress,
        email: '',
        first_name: '',
        last_name: '',
        service_provider_name: 'wallet', 
      });
    }

    return _user;
  }

  async authenticatePublicAddress(
    publicAddress: string,
    signature: string
  ): Promise<string | null> {
    let _user = await this.find(publicAddress);
    if (_user) {
      const decodedAddress = ethers.utils.verifyMessage(
        _user?.nonce.toString(),
        signature
      );

      //TODO: improve validation and secret env var
      if (publicAddress.toLowerCase() === decodedAddress.toLowerCase()) {
        return jwt.sign({
          publicAddress,
        }, 'my-secret', { expiresIn: '1h' });
      }
    }

    return null;
  }

  

  async createUser(
    model: UserCreateModel
  ): Promise<UserModel | null> {

    const params = [ 
      model.email,
      model.first_name,
      model.last_name,
      model.public_address,
      model.service_provider_name, 
      Math.floor(Math.random() * 10000000)];
      
    const results = await db.query(
      "INSERT INTO `user` (first_name, last_name, email, public_address, service_provider_name, nonce, created_at) VALUES (?, ?, ?, ?, ?, ?,  UTC_TIMESTAMP());",
      params
    );
    if ("insertId" in results) {
      const users = await db.query(
        "SELECT * FROM `user` WHERE id = ?",
        [results.insertId]
      );
      if (users.length > 0) { 
        return users[0] as UserModel;
      }
    }

    return null;
  }
}


export default Auth;
