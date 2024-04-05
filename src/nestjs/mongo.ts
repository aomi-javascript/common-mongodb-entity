import { PropOptions, Schema as nestjsSchema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema, Types } from 'mongoose';
import { Type } from '@nestjs/common';

export const Decimal128Options: PropOptions = {
  type: MongooseSchema.Types.Decimal128,
  // 查询时转成字符串
  get: (v: Function) => {
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

Schema.Types = MongooseSchema.Types;

export const AnyScheme = MongooseSchema.Types.Mixed;

export function createForClassProxy<TClass = any>(target: Type<TClass>): mongoose.Schema<TClass> {
  return SchemaFactory.createForClass(target);
}
