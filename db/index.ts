import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as auth from './schema/auth';
import * as finance from './schema/finance';

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: { ...auth, ...finance }
});

export { auth, finance };