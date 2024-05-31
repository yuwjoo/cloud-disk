import type { Database } from 'sqlite3';
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
 * @description: get函数promise化
 * @return {Promise<T | undefined>} promise
 */
declare function promiseGet<T = unknown>(this: SqliteDB, sql: string): Promise<T | undefined>;
/**
 * @description: all函数promise化
 * @return {Promise<T[]>} promise
 */
declare function promiseAll<T = unknown>(this: SqliteDB, sql: string): Promise<T[]>;
/**
 * @description: run函数promise化
 * @return {Promise<unknown>} promise
 */
declare function promiseRun(this: SqliteDB, sql: string): Promise<void>;
/**
 * @description: 使用数据库-hook
 * @return {SqliteDB} 数据库实例
 */
export declare function useDatabase(): SqliteDB;
export {};
