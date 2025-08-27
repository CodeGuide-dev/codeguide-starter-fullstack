import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as authSchema from './schema/auth';
import * as financeSchema from './schema/finance';

const schema = {
  ...authSchema,
  ...financeSchema,
};

export const db = drizzle(process.env.DATABASE_URL!, { schema });
export type Database = typeof db;

export { authSchema, financeSchema };