import { DataSource } from "typeorm";
import { join } from "path";
import { app } from "electron";
import { Bookmark } from "./entities/bookmark";

const dbPath = join(app.getPath("userData"), "cloud-disk.db");

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: dbPath,
  synchronize: true,
  logging: false,
  entities: [Bookmark],
  migrations: [],
  subscribers: [],
});