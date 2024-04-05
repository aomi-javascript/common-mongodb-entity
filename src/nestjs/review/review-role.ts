import { AbstractEntity } from '@aomi/common-entity';
import { Prop } from '@nestjs/mongoose';

/**
 * 审核角色
 */
export class ReviewRole extends AbstractEntity {
  /**
   * 角色名称
   */
  @Prop()
  name: string;
}
