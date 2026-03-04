'use strict';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'path';

const path = resolve(process.cwd(), 'data');
const database = new DatabaseSync(`${path}/app.db`);

export default database;
