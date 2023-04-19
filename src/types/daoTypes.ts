import { Types, mongo } from 'mongoose';

/**
 * MongoDB id type definition
 */
export type MongoID = string | Types.ObjectId;

/**
 * Data Access Object type definition.
 */
export interface DataAccessObject<T> {
  create(data: T): Promise<(T & { _id: MongoID }) | undefined>;
  get(
    query: Partial<T & { _id: MongoID }>
  ): Promise<(T & { _id: MongoID }) | null | undefined>;
  getAll(
    limit: number,
    cursor?: string
  ): Promise<Array<T & { _id: MongoID; createdAt: Date }> | undefined>;
  update(
    id: string,
    data: Partial<T>
  ): Promise<(T & { _id: MongoID }) | null | undefined>;
  delete(id: string): Promise<(T & { _id: MongoID }) | null | undefined>;
}

export interface MedicalDataAccessObject<T> {
  create(data: T): Promise<(T & { _id: MongoID }) | undefined>;
  getAll(
    patientId: string,
    limit: number,
    cursor?: string
  ): Promise<Array<T & { _id: MongoID; createdAt: Date }> | undefined>;
  update(
    id: string,
    data: Partial<T>
  ): Promise<(T & { _id: MongoID }) | null | undefined>;
  delete(id: string): Promise<(T & { _id: MongoID }) | null | undefined>;
  deleteAll(patientId: string): Promise<mongo.DeleteResult | undefined>;
}
