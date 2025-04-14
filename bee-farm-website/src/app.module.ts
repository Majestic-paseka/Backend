import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BeeFamiliesModule } from './bee-families/bee-families.module';
import { PlantsModule } from './plants/plants.module';
import { InspectionsModule } from './inspections/inspections.module';
import { ProductivityModule } from './productivity/productivity.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'), // Указываем путь к фронтенду
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    BeeFamiliesModule,
    PlantsModule,
    InspectionsModule,
    ProductivityModule,
  ],
})
export class AppModule {}