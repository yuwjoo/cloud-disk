import type { Database } from 'sqlite3';
export interface DirectoriesTable {
    id: number;
    name: string;
    parent_id: number | null;
    modified_date: number;
}
export interface FilesTable {
    id: number;
    name: string;
    directory_id: number | null;
    oss_path: string;
    file_size: number;
    modified_date: number;
    file_classification?: string;
}
export interface SqliteDB extends Database {
    promiseGet: typeof promiseGet;
    promiseAll: typeof promiseAll;
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
 * @description: 使用数据库-hook
 * @return {SqliteDB} 数据库实例
 */
export declare function useDatabase(): SqliteDB;
export {};
