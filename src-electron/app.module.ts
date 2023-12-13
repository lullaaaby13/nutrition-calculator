import {Module} from '@nestjs/common';
import IngredientModule from './ingredient/ingredient.module';
import GlobalModule from 'app/src-electron/common/global.module';
import SecretBaseModule from 'app/src-electron/secret-base/secret-base.module';

@Module({
  imports: [
    GlobalModule,
    IngredientModule,
    SecretBaseModule
  ],

})
export default class AppModule {}
