import { FilterQuery, Model } from 'mongoose';
import { DEFAULT_PAGE, Page, PageRequest, sortStr2Obj } from '@aomi/common-data/page';

export class DocumentRepository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async query(filter: FilterQuery<T>, pageable?: Partial<PageRequest>): Promise<Page<T>> {
    const size = Number.parseInt((pageable?.size || 20).toString());
    const page = Number.parseInt((pageable?.page || 0).toString());

    const totalElements = await this.model.countDocuments(filter).exec();
    if (totalElements === 0) {
      return {
        ...DEFAULT_PAGE,
        number: page,
      };
    }
    const totalPages = Math.ceil(totalElements / size);

    // 如果请求页数大于总页数直接返回
    if (page > totalPages) {
      return {
        ...DEFAULT_PAGE,
        size,
        number: page,
        last: totalPages === page + 1,
        first: page === 0,
      };
    }
    const query = this.model.find(filter);

    try {
      if (pageable?.sort) {
        const sort: any = sortStr2Obj(pageable?.sort);
        // const sort: Record<string, any> = {};
        if (Reflect.has(sort, 'id')) {
          sort._id = sort.id;
          Reflect.deleteProperty(sort, 'id');
        }
        query.sort(sort);
      }
    } catch (e) {
    }
    query.limit(size).skip(page * size);

    const content = await query.exec();

    return {
      totalElements,
      content,
      number: page,
      size,
      last: totalPages === page + 1,
      first: page === 0,
      totalPages,
    };
  }
}
