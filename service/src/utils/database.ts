import type { Database } from 'sqlite3';
import sqlite3 from 'sqlite3';
import config from '../config';

export interface UsersTable {
  id: number;
  username: string;
  password: string;
  avatar: string | null;
  last_login: string | null;
  account_status: 'active' | 'disabled';
  role_id: string;
}

export interface RolesTable {
  id: string;
  name: string;
}

export interface DirectoriesTable {
  id: number;
  name: string;
  parent_id: number | null;
  modified_date: string;
}

export interface FilesTable {
  id: number;
  name: string;
  directory_id: number | null;
  oss_path: string;
  file_size: number;
  modified_date: string;
  file_classification: string | null;
}

export interface SqliteDB extends Database {
  promiseGet: typeof promiseGet;
  promiseAll: typeof promiseAll;
  promiseRun: typeof promiseRun;
}

/**
 * @description: 数据库工厂方法
 * @param {string} filename
 * @param {function} callback
 * @return {*}
 */
function databaseFactory(filename: string, callback?: (err: Error | null) => void): SqliteDB {
  const db = new sqlite3.Database(filename, callback);
  Object.defineProperty(db, 'promiseGet', { get: () => promiseGet });
  Object.defineProperty(db, 'promiseAll', { get: () => promiseAll });
  Object.defineProperty(db, 'promiseRun', { get: () => promiseRun });
  return db as SqliteDB;
}

/**
 * @description: get函数promise化
 * @return {Promise<T | undefined>} promise
 */
function promiseGet<T = unknown>(this: SqliteDB, sql: string): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    this.get<T>(sql, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * @description: all函数promise化
 * @return {Promise<T[]>} promise
 */
function promiseAll<T = unknown>(this: SqliteDB, sql: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    this.all<T>(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * @description: run函数promise化
 * @return {Promise<unknown>} promise
 */
function promiseRun(this: SqliteDB, sql: string): Promise<void> {
  return new Promise((resolve, reject) => {
    this.run(sql, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const db: SqliteDB = databaseFactory(config.dbPath, (err) => {
  if (err) {
    console.error('--------------------connectDatabaseErr' + err.message);
  } else {
    console.log('👉👉👉-----------------sqlite3已经连接成功');
    initDatabase();
  }
});

/**
 * @description: 初始化数据库
 */
function initDatabase() {
  db.serialize(() => {
    // 创建用户表
    db.run(
      `CREATE TABLE IF NOT EXISTS users (  
        -- 用户ID, 自增主键  
        id INTEGER PRIMARY KEY AUTOINCREMENT,  
        -- 用户名, 唯一且不能为空  
        username TEXT NOT NULL UNIQUE,  
        -- 密码（建议使用哈希存储）  
        password TEXT NOT NULL,  
        -- 用户头像(可能是文件路径、URL或BLOB数据) 
        avatar TEXT,  
        -- 最后登录时间(时间戳或DATETIME类型, 取决于你的需求）  
        last_login DATETIME,  
        -- 账号状态(例如：激活、禁用等）  
        account_status TEXT NOT NULL DEFAULT 'active',  
        -- 角色ID, 外键引用roles表的id字段, 不能为空, 默认为002(普通用户）  
        role_id TEXT NOT NULL DEFAULT '002',  
        -- 外键约束, 确保role_id在roles表中存在  
        FOREIGN KEY (role_id) REFERENCES roles(id)  
      );`
    );

    // db.run(`INSERT INTO users (username, password, avatar, last_login, account_status, role_id) VALUES
    // ('john_doe1', 'hashed_password_here', 'https://example.com/avatar.jpg', datetime('now', 'localtime'), 'active', '002');`);

    // 创建角色表
    db.run(
      `CREATE TABLE IF NOT EXISTS roles (  
        -- 角色ID, 不是自增, 使用固定的ID值  
        id TEXT PRIMARY KEY,  
        -- 角色名称，唯一且不能为空  
        name TEXT NOT NULL UNIQUE  
      );`
    );

    db.run("INSERT OR IGNORE INTO roles (id, name) VALUES ('001', '管理员')");
    db.run("INSERT OR IGNORE INTO roles (id, name) VALUES ('002', '普通用户')");

    // 创建目录表
    db.run(
      `CREATE TABLE IF NOT EXISTS directories (  
        -- 主键, 自动增长  
        id INTEGER PRIMARY KEY AUTOINCREMENT,  
        -- 目录名称, 不能为空  
        name TEXT NOT NULL,  
        -- 父目录ID, 如果是根目录则为NULL  
        parent_id INTEGER,  
        -- 修改日期, 默认为当前时间戳  
        modified_date DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  
        -- 外键, 引用directories表的id字段, 当引用的目录被删除时, 级联删除子目录  
        FOREIGN KEY (parent_id) REFERENCES directories(id) ON DELETE CASCADE  
      );`
    );

    // 创建文件表
    db.run(
      `CREATE TABLE IF NOT EXISTS files (  
        -- 主键, 自动增长  
        id INTEGER PRIMARY KEY AUTOINCREMENT,  
        -- 文件名称, 不能为空  
        name TEXT NOT NULL,  
        -- 目录ID, 文件所属的目录  
        directory_id INTEGER,  
        -- OSS路径, 文件在OSS上的存储路径  
        oss_path TEXT NOT NULL,  
        -- 文件大小, 以字节为单位  
        file_size INTEGER NOT NULL,  
        -- 修改日期, 默认为当前时间戳  
        modified_date DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  
        -- 文件分类  
        file_classification TEXT,  
        -- 外键, 引用directories表的id字段, 当引用的目录被删除时, 级联删除文件  
        FOREIGN KEY (directory_id) REFERENCES directories(id) ON DELETE CASCADE  
      );`
    );
  });
}

/**
 * @description: 使用数据库-hook
 * @return {SqliteDB} 数据库实例
 */
export function useDatabase(): SqliteDB {
  return db;
}
