import {beforeEach, describe, expect, it} from 'vitest';
import {Test} from '@nestjs/testing';
import IngredientRepository from 'app/src-electron/ingredient/ingredient.repository';
import {IngredientCategory} from 'app/src-electron/ingredient/ingredient';
import Store from 'electron-store';
import IngredientService from 'app/src-electron/ingredient/ingredient.service';

describe('IngredientService', () => {

  let service: IngredientService;

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
    const repository = app.get<IngredientRepository>(IngredientRepository);
    repository.clear();
    service = new IngredientService(repository);
  });


  it('should be defined.', () => {
    expect(service).toBeDefined();
  });


  it('식재료 생성 & 조회', async () => {

    await service.save({
      name: '식재료1',
      category: IngredientCategory.FRESH.name,
      memo: '메모',
      calories: 100,
      unitPrice: 1000,
      carbohydrates: 10,
      sugars: 10,
      protein: 10,
      caffeine: 10,
      fat: 10,
      saturatedFat: 10,
    });

    const list = await service.list();
    expect(list.length).toBe(1);
  });


});

