import "reflect-metadata";
import { AppDataSource } from "./data-source";

/**
 * @description: 初始化数据库连接
 */
export async function initDB() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  } catch (error) {
    console.error("Error during Data Source initialization", error);
    throw error;
  }
}

/**
 * @description: 关闭数据库连接
 */
export async function closeDB() {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  } catch (error) {
    console.error("Error during Data Source destruction", error);
    throw error;
  }
}