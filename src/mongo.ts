import { Schema as nestjsSchema } from '@nestjs/mongoose';
import { PropOptions } from '@nestjs/mongoose/dist/decorators/prop.decorator';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

export const Decimal128Options: PropOptions = {
  type: MongooseSchema.Types.Decimal128,
  // 查询时转成字符串
  get: (v: any) => {
    return v?.toString();
  },
};

export const DefaultSchemeOptions: SchemaOptions = {
  id: true,
  toJSON: {
    transform(_, ret) {
      Object.keys(ret).forEach((key) => {
        // 转换成字符串
        if (ret[key] instanceof Types.Decimal128) {
          ret[key] = ret[key].toString();
        } else if (ret[key] instanceof Date) {
          ret[key] = ret[key].getTime();
        }
        ret.id = ret?._id;
      });
    },
  },
};

export function Schema(options?: SchemaOptions): ClassDecorator {
  return nestjsSchema({
    ...DefaultSchemeOptions,
    ...options,
  });
}
