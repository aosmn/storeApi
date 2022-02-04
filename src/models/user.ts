import Client from '../database';
import bcrypt from 'bcrypt';
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password?: string;
  password_digest?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      let sql = 'SELECT username, firstname, lastname FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT username, firstname, lastname FROM users WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // TODO: check for required data
      if (u.password) {
        const hash = bcrypt.hashSync(
          u.password + pepper,
          parseInt(saltRounds as string)
        );
        const sql =
          'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING username, firstname, lastname';
        const conn = await Client.connect();

        const result = await conn.query(sql, [
          u.username,
          u.firstname,
          u.lastname,
          hash
        ]);

        const user = result.rows[0];

        conn.release();

        return user;
      } else {
        throw new Error("password is required");
        
      }
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const sql = 'SELECT password_digest FROM users WHERE username=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        const areEqual = bcrypt.compareSync(
          password + pepper,
          user.password_digest
        );

        conn.release();
        if (areEqual) {
          return user;
        } else {
          throw new Error(
            `Could not find user ${username}. Error: Wrong Password`
          );
        }
      }

      return null;
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
