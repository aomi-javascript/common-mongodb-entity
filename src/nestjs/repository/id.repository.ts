import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Sequence } from '../entity/sequence';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class IdRepository {
  constructor(
    @InjectModel(Sequence.name)
    private readonly sequenceModel: Model<Sequence>,
  ) {
  }

  async next(name: string) {
    let sequence = await this.sequenceModel
      .findOneAndUpdate(
        {
          name: name,
        },
        {
          $inc: {
            value: 1,
          },
        },
      )
      .exec();
    if (!sequence) {
      sequence = await this.sequenceModel.create({
        name,
        value: 1,
      });
    }
    return sequence.value;
  }
}
