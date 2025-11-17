/**
 * Base Repository Pattern
 * Provides common CRUD operations for all repositories
 * Makes database access modular and testable
 */

import { PrismaClient } from '@prisma/client';

// Singleton Prisma client
let prisma: PrismaClient;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return prisma;
}

/**
 * Base repository class with common operations
 */
export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  /**
   * Override this to specify the Prisma model delegate
   */
  protected abstract getModel(): any;

  async findById(id: string): Promise<T | null> {
    return await this.getModel().findUnique({
      where: { id },
    });
  }

  async findMany(where?: any, orderBy?: any, take?: number, skip?: number): Promise<T[]> {
    return await this.getModel().findMany({
      where,
      orderBy,
      take,
      skip,
    });
  }

  async create(data: any): Promise<T> {
    return await this.getModel().create({
      data,
    });
  }

  async update(id: string, data: any): Promise<T> {
    return await this.getModel().update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.getModel().delete({
      where: { id },
    });
  }

  async count(where?: any): Promise<number> {
    return await this.getModel().count({ where });
  }
}
