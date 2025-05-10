import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StatisticsModule } from './statistics/statistics.module';
import { BeeFamilyModule } from './bee-managment/bee-family.module';
import { ProductivityModule } from './productivity/productivity.module';
import { FlowersModule } from './flowers/flowers.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BeeFamilyModule,
    AuthModule,
    UserModule,
    StatisticsModule,
    ProductivityModule,
    FlowersModule,
  ],
})
export class AppModule {}