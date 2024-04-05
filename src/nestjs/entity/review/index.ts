import { AbstractEntity, ReviewResult, ReviewStatus } from '@aomi/common-entity';
import * as mongoose from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { ReviewHistory } from './review-history';
import { ReviewProcess } from './review-process';

/**
 * 基础审核信息
 */
export class AbstractReview<T> extends AbstractEntity {
  /**
   * 编辑前
   */
  @Prop()
  before: T;
  /**
   * 编辑后
   */
  @Prop()
  after: T;
  /**
   * 审核历史
   */
  @Prop()
  histories: Array<ReviewHistory>;
  /**
   * 审核流程
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ReviewProcess.name })
  reviewProcess: ReviewProcess;
  /**
   * 当前
   */
  @Prop()
  currentReviewStepIndex: number;
  /**
   * 下一步
   */
  @Prop()
  nextReviewStepIndex: number;
  /**
   * 审核结果
   */
  @Prop()
  result: ReviewResult;
  /**
   * 审核状态
   */
  @Prop()
  status: ReviewStatus;
  /**
   * 审核结果说明
   */
  @Prop()
  resultDescribe: string;
  /**
   * 变更描述
   */
  @Prop()
  describe: string;

  /**
   * 创建时间
   */
  @Prop()
  createAt: Date;
}
