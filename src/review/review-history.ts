import { ReviewUser } from './review-user';
import { Prop } from '@nestjs/mongoose';
import { ReviewResult } from '@aomi/common-entity';

export class ReviewHistory {
  /**
   * 审核的用户信息
   */
  @Prop()
  user: ReviewUser;
  /**
   * 审核结果
   */
  @Prop()
  result: ReviewResult;
  /**
   * 审核结果说明
   */
  @Prop()
  describe: string;
  /**
   * 审核时间
   */
  @Prop()
  reviewAt: Date;
}
