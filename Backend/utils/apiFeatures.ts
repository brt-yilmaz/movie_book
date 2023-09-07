import { Document, Model, Query } from 'mongoose';

type SortDirection = 'asc' | 'desc';

interface IQueryOptions {
  filterFields?: string[];
  sortFields?: string[];
  limitFields?: string[];
  defaultSort?: string;
  defaultLimit?: number;
}

