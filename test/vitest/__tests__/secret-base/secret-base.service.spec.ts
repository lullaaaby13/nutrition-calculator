import {beforeEach, describe, expect, it} from 'vitest';
import {Test} from '@nestjs/testing';
import Ingredient, {IngredientCategory} from 'app/src-electron/ingredient/ingredient';
import Store from 'electron-store';
import SecretBaseRepository from 'app/src-electron/secret-base/secret-base.repository';
import SecretBaseService from 'app/src-electron/secret-base/secret-base.service';
import IngredientRepository from 'app/src-electron/ingredient/ingredient.repository';
import IngredientService from 'app/src-electron/ingredient/ingredient.service';

describe('SecretBaseRepository', () => {

    let service: SecretBaseService
    let ingredientRepository: IngredientRepository;
    let secretBaseRepository: SecretBaseRepository;

    beforeEach(async () => {
        const app = await Test.createTestingModule({

            providers: [
                IngredientRepository,
                IngredientService,
                SecretBaseRepository,
                {
                    provide: Store,
                    useValue: new Store(),
                }
            ]
        }).compile();
        secretBaseRepository = app.get<SecretBaseRepository>(SecretBaseRepository);
        const ingredientService = app.get<IngredientService>(IngredientService);
        ingredientRepository = app.get<IngredientRepository>(IngredientRepository);
        secretBaseRepository.clear();
        service = new SecretBaseService(secretBaseRepository, ingredientService);
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
    });


    it('should be defined.', () => {
        expect(service).toBeDefined();
    });

    describe('시크릿베이스 생성', () => {
        it('정상', async () => {

            const ingredients = ingredientRepository.list();

            const request = {
                name: '시크릿베이스1',
                components: [
                    {
                        amount: 100,
                        ingredientId: ingredients[0].getId(),
                    },
                    {
                        amount: 200,
                        ingredientId: ingredients[1].getId(),
                    },
                ],
                memo: '메모',
            };

            service.save(request);
        });

        it('컴포넌트 1개면 에러 발생', async () => {

            const ingredients = ingredientRepository.list();

            const request = {
                name: '시크릿베이스1',
                components: [
                    {
                        amount: 100,
                        ingredientId: ingredients[0].getId(),
                    },
                ],
                memo: '메모',
            };

            expect(() => service.save(request)).toThrowError('원재료는 2개 이상이어야 합니다.');
        });

        it('컴포넌트 수량이 1 이하면 에러 발생', async () => {

            const ingredients = ingredientRepository.list();

            const request = {
                name: '시크릿베이스1',
                components: [
                    {
                        amount: 0,
                        ingredientId: ingredients[0].getId(),
                    },
                    {
                        amount: 200,
                        ingredientId: ingredients[1].getId(),
                    },
                ],
                memo: '메모',
            };

            expect(() => service.save(request)).toThrowError('원재료의 양은 1 이상이어야 합니다.');
        });

        it('시크릿베이스 이름을 입력하지 않으면 오류 발생', async () => {

            const ingredients = ingredientRepository.list();

            const request = {

                components: [
                    {
                        amount: 100,
                        ingredientId: ingredients[0].getId(),
                    },
                    {
                        amount: 200,
                        ingredientId: ingredients[1].getId(),
                    },
                ],
                memo: '메모',
            };

            expect(() => service.save(request)).toThrowError('이름을 입력해 주세요.');
        });
    });

    describe('시크릿베이스 업데이트', () => {

        let secretBase;
        beforeEach(async () => {
          secretBaseRepository.clear();
            const ingredients = ingredientRepository.list();

            const request = {
                name: '시크릿베이스1',
                components: [
                    {
                        amount: 100,
                        ingredientId: ingredients[0].getId(),
                    },
                    {
                        amount: 200,
                        ingredientId: ingredients[1].getId(),
                    },
                ],
                memo: '메모',
            };

            service.save(request);
            secretBase = service.list()[0];
        });

        it('정상', async () => {
            service.update(secretBase.id, {
                name: '시크릿베이스2',
                memo: '메모2',
                components: [
                    {
                        amount: 100,
                        ingredientId: secretBase.components[0].ingredient.id,
                    },
                    {
                        amount: 300,
                        ingredientId: secretBase.components[1].ingredient.id,
                    },
                ],
            });

            const find = service.list()[0];
            expect(find.name).toBe('시크릿베이스2');
            expect(find.memo).toBe('메모2');
            expect(find.components[1].amount).toBe(300);
        });

      it('컴포넌트 수량이 1보다 작으면 에러', async () => {
        expect(() => {
          service.update(secretBase.id, {
            name: '시크릿베이스2',
            memo: '메모2',
            components: [
              {
                amount: 100,
                ingredientId: secretBase.components[0].ingredient.id,
              },
              {
                amount: 0,
                ingredientId: secretBase.components[1].ingredient.id,
              },
            ],
          })
        }).toThrowError('원재료의 양은 1 이상이어야 합니다.');

      });

      it('컴포넌트가 중복되면 에러', async () => {
        expect(() => {
          service.update(secretBase.id, {
            name: '시크릿베이스2',
            memo: '메모2',
            components: [
              {
                amount: 100,
                ingredientId: secretBase.components[0].ingredient.id,
              },
              {
                amount: 300,
                ingredientId: secretBase.components[0].ingredient.id,
              },
            ],
          })
        }).toThrowError('이미 추가된 원재료 입니다.');
      });

      it('컴포넌트가 존재하지 않으면 에러', async () => {
        expect(() => {
          service.update(secretBase.id, {
            name: '시크릿베이스2',
            memo: '메모2',
            components: [
              {
                amount: 100,
                ingredientId: secretBase.components[0].ingredient.id,
              },
              {
                amount: 300,
                ingredientId: 569823472,
              },
            ],
          })
        }).toThrowError('존재하지 않는 원재료 입니다. [ingredientId = 569823472]');
      });

    });
});

