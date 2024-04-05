import { createForClassProxy, Schema } from '../mongo';
import { Prop } from '@nestjs/mongoose';
import { AbstractEntity } from '@aomi/common-entity';

@Schema()
export class Sequence extends AbstractEntity {
  @Prop({ unique: true })
  name: string;

  @Prop()
  value: number;
}

export type SequenceDocument = Sequence & Document;
export const SequenceSchema = createForClassProxy(Sequence);
