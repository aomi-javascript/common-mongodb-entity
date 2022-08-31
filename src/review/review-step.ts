import { Prop } from '@nestjs/mongoose';

/**
 * 审核步骤
 */
export class ReviewStep {
  @Prop()
  roleId: string;

  @Prop()
  roleName: string;

  @Prop()
  userId: string;

  @Prop()
  userName: string;

  @Prop()
  describe: string;
}
