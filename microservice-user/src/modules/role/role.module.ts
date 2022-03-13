import { Module } from '@nestjs/common';
import { RolePermissionModule } from './role-permission/role-permission.module';

@Module({
  imports: [RolePermissionModule]
})
export class RoleModule {}
