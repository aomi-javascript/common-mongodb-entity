import { ReviewRole } from './review-role';
import { AbstractEntity } from '@aomi/common-entity';
import { Prop } from '@nestjs/mongoose';

/**
 * 审核用户
 */
export class ReviewUser extends AbstractEntity {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  roles: Array<ReviewRole>;

  @Prop()
  annotations: Record<string, any>;
}
