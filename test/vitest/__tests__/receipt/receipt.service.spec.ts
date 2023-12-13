import {beforeEach, describe, expect, it} from 'vitest';
import {Test} from '@nestjs/testing';
import Store from 'electron-store';
import ReceiptRepository from 'app/src-electron/receipt/receipt.repository';
import {ReceiptCategory} from 'app/src-electron/receipt/receipt';
import ReceiptService from 'app/src-electron/receipt/receipt.service';
import SecretBaseService from 'app/src-electron/secret-base/secret-base.service';
import IngredientService from 'app/src-electron/ingredient/ingredient.service';
import IngredientRepository from 'app/src-electron/ingredient/ingredient.repository';
import SecretBaseRepository from 'app/src-electron/secret-base/secret-base.repository';
import Ingredient, {IngredientCategory} from 'app/src-electron/ingredient/ingredient';

describe('ReceiptRepository', () => {

  let receiptService: ReceiptService;
  let repository: ReceiptRepository;

  let ingredientRepository: IngredientRepository;

  beforeEach(async () => {
    const app = await Test.createTestingModule({

      providers: [
        IngredientService,
        IngredientRepository,
        SecretBaseService,
        SecretBaseRepository,
        ReceiptRepository,
        {
          provide: Store,
          useValue: new Store(),
        }
      ]
    }).compile();

    repository = app.get<ReceiptRepository>(ReceiptRepository);
    ingredientRepository = app.get<IngredientRepository>(IngredientRepository);
    repository.clear();
    ingredientRepository.clear();

    const ingredient1 = new Ingredient();
    ingredient1.setName('우유');
    ingredient1.setCategory(IngredientCategory.FRESH);
    ingredient1.setMemo('서울우유');
    ingredient1.setCalories(100);
    ingredient1.setUnitPrice(1000);
    ingredient1.setCarbohydrates(10);
    ingredient1.setSugars(10);
    ingredient1.setProtein(10);
    ingredient1.setCaffeine(10);
    ingredient1.setFat(10);
    ingredient1.setSaturatedFat(10);
    const ingredient2 = new Ingredient();
    ingredient2.setName('연유');
    ingredient2.setCategory(IngredientCategory.FRESH);
    ingredient2.setMemo('서울우유에서 나온 연유');
    ingredient2.setCalories(200);
    ingredient2.setUnitPrice(1000);
    ingredient2.setCarbohydrates(10);
    ingredient2.setSugars(10);
    ingredient2.setProtein(10);
    ingredient2.setCaffeine(10);
    ingredient2.setFat(10);
    ingredient2.setSaturatedFat(10);

    ingredientRepository.save(ingredient1);
    ingredientRepository.save(ingredient2);

    receiptService = new ReceiptService(
      repository,
      app.get<SecretBaseService>(SecretBaseService),
      app.get<IngredientService>(IngredientService),
    )
  });


  it('should be defined.', () => {
    expect(receiptService).toBeDefined();
  });


  describe('레시피 생성', () => {
    it('정상', async () => {
      const request = {
        name: '아메리카노',
        category: ReceiptCategory.COFFEE,
        sellingPrice: 1000,
        components: [
          {
            amount: 10,
            sourceType: 'Ingredient',
            sourceId: ingredientRepository.list()[0].getId(),
          },
          {
            amount: 20,
            sourceType: 'Ingredient',
            sourceId: ingredientRepository.list()[1].getId(),
          },
        ],
      };
      receiptService.save(request);
    });

    it('컴포넌트가 1개면 에러 발생', async () => {
      const request = {
        name: '아메리카노',
        category: ReceiptCategory.COFFEE,
        sellingPrice: 1000,
        components: [
          {
            amount: 10,
            sourceType: 'Ingredient',
            sourceId: ingredientRepository.list()[0].getId(),
          },
        ],
      };
      expect(() => receiptService.save(request)).toThrowError('재료는 2개 이상 이어야 합니다.');
    });

    it('컴포넌트 수량이 1 이하면 에러 발생', async () => {
      const request = {
        name: '아메리카노',
        category: ReceiptCategory.COFFEE,
        sellingPrice: 1000,
        components: [
          {
            amount: 10,
            sourceType: 'Ingredient',
            sourceId: ingredientRepository.list()[0].getId(),
          },
          {
            amount: 0,
            sourceType: 'Ingredient',
            sourceId: ingredientRepository.list()[1].getId(),
          },
        ],
      };
      expect(() => receiptService.save(request)).toThrowError('재료 수량은 1 이상 이어야 합니다.');
    });

  });

  // describe('레시피 업데이트', () => {
  //
  // });


});

