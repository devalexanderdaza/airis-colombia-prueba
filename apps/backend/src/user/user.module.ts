import { Module } from '@nestjs/common';

@Module({
  exports: [UserModule],
})
export class UserModule {}
