import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UserModule {}
