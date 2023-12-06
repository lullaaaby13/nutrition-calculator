import {Inject, Injectable} from '@nestjs/common';
import IngredientService from 'app/src-electron/service/ingredient.service';
import {ipcMain} from 'electron';

@Injectable()
export default class IngredientHandler {

  constructor(
    @Inject(IngredientService) private readonly ingredientService: IngredientService,
  ) {
    ipcMain.handle('ingredients:list', async () => {
      return await this.ingredientService.list();
    });

    ipcMain.handle('ingredients:save', async (event, args) => {
      const request = JSON.parse(args);
      console.log('IngredientHandler save', request);
      await this.ingredientService.save(request);
    });
  }

}
