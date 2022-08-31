import { ReviewStep } from './review-step';
import { AbstractEntity } from '@aomi/common-entity';
import { Schema } from '../mongo';
import { Prop } from '@nestjs/mongoose';

/**
 * 审核流程
 */
@Schema()
export class ReviewProcess extends AbstractEntity {
  /**
   * 流程名称
   */
  @Prop()
  name: string;

  /**
   * 流程备注
   */
  @Prop()
  remark: string;

  /**
   * 审核链
   */
  @Prop()
  chain: Array<ReviewStep>;
}
