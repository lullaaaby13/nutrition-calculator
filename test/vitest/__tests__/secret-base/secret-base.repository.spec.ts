import {beforeEach, describe, expect, it} from 'vitest';
import {Test} from '@nestjs/testing';
import Ingredient, {IngredientCategory} from 'app/src-electron/ingredient/ingredient';
import Store from 'electron-store';
import SecretBaseRepository from 'app/src-electron/secret-base/secret-base.repository';
import {SecretBase} from 'app/src-electron/secret-base/secret-base';

describe('SecretBaseRepository', () => {

  let repository: SecretBaseRepository;

  beforeEach(async () => {
    const app = await Test.createTestingModule({

      providers: [
        SecretBaseRepository,
        {
          provide: Store,
          useValue: new Store(),
        }
      ]
    }).compile();
    repository = app.get<SecretBaseRepository>(SecretBaseRepository);
    repository.clear();
  });


  it('should be defined.', () => {
    expect(repository).toBeDefined();
  });


  it('시크릿베이스 생성 & 조회 & 삭제', async () => {

    const ingredient1 = new Ingredient();
    ingredient1.setId(1)
    ingredient1.setName('식재료1');
    ingredient1.setCategory(IngredientCategory.FRESH);
    ingredient1.setMemo('메모');
    ingredient1.setCalories(100);
    ingredient1.setUnitPrice(1000);
    ingredient1.setCarbohydrates(10);
    ingredient1.setSugars(10);
    ingredient1.setProtein(10);
    ingredient1.setCaffeine(10);
    ingredient1.setFat(10);
    ingredient1.setSaturatedFat(10);
    const ingredient2 = new Ingredient();
    ingredient1.setId(2)
    ingredient2.setName('식재료2');
    ingredient2.setCategory(IngredientCategory.FRESH);
    ingredient2.setMemo('메모');
    ingredient2.setCalories(100);
    ingredient2.setUnitPrice(1000);
    ingredient2.setCarbohydrates(10);
    ingredient2.setSugars(10);
    ingredient2.setProtein(10);
    ingredient2.setCaffeine(10);
    ingredient2.setFat(10);
    ingredient2.setSaturatedFat(10);

    const secretBase = new SecretBase();
    secretBase.setName('시크릿베이스1');
    secretBase.addComponent(100, ingredient1.getId()!);
    secretBase.addComponent(200, ingredient2.getId()!);
    secretBase.setMemo('메모');

    repository.save(secretBase);


    const list = await repository.list();
    expect(list.length).toBe(1);

    const id = list[0].getId();
    expect(id).toBeDefined();

    if (id) {
      await repository.delete(id);
      expect((await repository.list()).length).toBe(0);
    }

  });

  it('시크릿베이스 재료 추가 시, 같은 원재료를 추가할 수 없다.', async () => {
    const ingredient1 = new Ingredient();
    ingredient1.setId(1)
    ingredient1.setName('식재료1');
    ingredient1.setCategory(IngredientCategory.FRESH);
    ingredient1.setMemo('메모');
    ingredient1.setCalories(100);
    ingredient1.setUnitPrice(1000);
    ingredient1.setCarbohydrates(10);
    ingredient1.setSugars(10);
    ingredient1.setProtein(10);
    ingredient1.setCaffeine(10);
    ingredient1.setFat(10);
    ingredient1.setSaturatedFat(10);

    const secretBase = new SecretBase();
    secretBase.setName('시크릿베이스1');
    secretBase.addComponent(100, ingredient1.getId()!);

    expect(() => secretBase.addComponent(200, ingredient1.getId()!)).toThrowError('이미 추가된 원재료 입니다.');

  });


});

