import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AuthorizationGuard],
})
export class AuthorizationModule { }
