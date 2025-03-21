import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { Bookmark } from "./entities/bookmark";

export class BookmarkService {
  private repository: Repository<Bookmark>;

  constructor() {
    this.repository = AppDataSource.getRepository(Bookmark);
  }

  async create(bookmark: Omit<Bookmark, "id" | "created_at" | "updated_at">) {
    const newBookmark = this.repository.create(bookmark);
    return await this.repository.save(newBookmark);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, bookmark: Partial<Bookmark>) {
    await this.repository.update(id, bookmark);
    return await this.findOne(id);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}

export const bookmarkService = new BookmarkService();