import { Model, Document, Query, UpdateQuery, FilterQuery, PopulateOptions, QueryOptions,  } from 'mongoose';

type SortDirection = 'asc' | 'desc';

class APIFeatures<T extends Document> {
  query: QueryOptions<T>;
  queryString: any;

  constructor(query: QueryOptions<T>, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    const queryObj: any = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el: string) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match: string) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate(): this {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // @ts-ignore
    this.query = this.query.skip(skip).limit(limit) ;

    return this;
  }
}

export default APIFeatures;
