import {beforeEach, describe, expect, it} from 'vitest';
import {Test} from '@nestjs/testing';
import IngredientRepository from 'app/src-electron/ingredient/ingredient.repository';
import Ingredient, {IngredientCategory} from 'app/src-electron/ingredient/ingredient';
import Store from 'electron-store';

describe('IngredientRepository', () => {

  let repository: IngredientRepository;

  beforeEach(async () => {
    const app = await Test.createTestingModule({

      providers: [
        IngredientRepository,
        {
          provide: Store,
          useValue: new Store(),
        }
      ]
    }).compile();
    repository = app.get<IngredientRepository>(IngredientRepository);
    repository.clear();
  });


  it('should be defined.', () => {
    expect(repository).toBeDefined();
  });


  it('식재료 생성 & 조회 & 삭제', async () => {

    const ingredient = new Ingredient();
    ingredient.setName('식재료1');
    ingredient.setCategory(IngredientCategory.FRESH);
    ingredient.setMemo('메모');
    ingredient.setCalories(100);
    ingredient.setUnitPrice(1000);
    ingredient.setCarbohydrates(10);
    ingredient.setSugars(10);
    ingredient.setProtein(10);
    ingredient.setCaffeine(10);
    ingredient.setFat(10);
    ingredient.setSaturatedFat(10);
    repository.save(ingredient);

    const list = await repository.list();
    expect(list.length).toBe(1);

    const id = list[0].getId();
    expect(id).toBeDefined();

    if (id) {
      await repository.delete(id);
      expect((await repository.list()).length).toBe(0);
    }

  });



});

