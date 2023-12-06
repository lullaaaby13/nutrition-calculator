import {Module} from '@nestjs/common';
import IngredientService from './service/ingredient.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {resolve} from 'app-root-path';
import Ingredient from './domain/ingredient';
import IngredientHandler from 'app/src-electron/handler/ingredient.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: resolve('data.db'),
      synchronize: true, // 개발 환경에서만 사용 (테이블 동기화)
      logging: true,
      autoLoadEntities: true,
      // dropSchema: true,
    }),
    TypeOrmModule.forFeature([Ingredient])
  ],
  providers: [IngredientHandler, IngredientService],
})
export default class AppModule {}
