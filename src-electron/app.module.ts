import {Module} from '@nestjs/common';
import IngredientModule from './ingredient/ingredient.module';
import GlobalModule from 'app/src-electron/common/global.module';

@Module({
  imports: [
    GlobalModule,
    IngredientModule,
  ],

})
export default class AppModule {}
