// Generated by Xata Codegen 0.30.1. Please do not edit.
import dotenv from 'dotenv';
import { buildClient } from '@xata.io/client';
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from '@xata.io/client';

const tables = [
  {
    name: 'Cars',
    checkConstraints: {
      Cars_xata_id_length_xata_id: {
        name: 'Cars_xata_id_length_xata_id',
        columns: ['xata_id'],
        definition: 'CHECK ((length(xata_id) < 256))',
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_Cars_xata_id_key: {
        name: '_pgroll_new_Cars_xata_id_key',
        columns: ['xata_id'],
      },
    },
    columns: [
      {
        name: 'xata_createdat',
        type: 'datetime',
        notNull: true,
        unique: false,
        defaultValue: 'now()',
        comment: '',
      },
      {
        name: 'xata_id',
        type: 'text',
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: '',
      },
      {
        name: 'xata_updatedat',
        type: 'datetime',
        notNull: true,
        unique: false,
        defaultValue: 'now()',
        comment: '',
      },
      {
        name: 'xata_version',
        type: 'int',
        notNull: true,
        unique: false,
        defaultValue: '0',
        comment: '',
      },
    ],
  },
  {
    name: 'User',
    checkConstraints: {
      'Dummy-data_xata_id_length_xata_id': {
        name: 'Dummy-data_xata_id_length_xata_id',
        columns: ['xata_id'],
        definition: 'CHECK ((length(xata_id) < 256))',
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      '_pgroll_new_Dummy-data_xata_id_key': {
        name: '_pgroll_new_Dummy-data_xata_id_key',
        columns: ['xata_id'],
      },
    },
    columns: [
      {
        name: 'city',
        type: 'text',
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{}',
      },
      {
        name: 'email',
        type: 'text',
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{}',
      },
      {
        name: 'first_name',
        type: 'text',
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{}',
      },
      {
        name: 'gender',
        type: 'text',
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{}',
      },
      {
        name: 'id',
        type: 'int',
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{}',
      },
      {
        name: 'language',
        type: 'text',
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{}',
      },
      {
        name: 'last_name',
        type: 'text',
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{}',
      },
      {
        name: 'xata_createdat',
        type: 'datetime',
        notNull: true,
        unique: false,
        defaultValue: 'now()',
        comment: '',
      },
      {
        name: 'xata_id',
        type: 'text',
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: '',
      },
      {
        name: 'xata_updatedat',
        type: 'datetime',
        notNull: true,
        unique: false,
        defaultValue: 'now()',
        comment: '',
      },
      {
        name: 'xata_version',
        type: 'int',
        notNull: true,
        unique: false,
        defaultValue: '0',
        comment: '',
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Cars = InferredTypes['Cars'];
export type CarsRecord = Cars & XataRecord;

export type User = InferredTypes['User'];
export type UserRecord = User & XataRecord;

export type DatabaseSchema = {
  Cars: CarsRecord;
  User: UserRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    'https://bmwangimwangangi-s-workspace-0e8bnu.us-west-2.xata.sh/db/CRUD-db',
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  // instance = new XataClient();
  instance = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH,
  });

  return instance;
};
