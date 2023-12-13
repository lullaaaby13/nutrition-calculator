import {beforeEach, describe, expect, it} from 'vitest';
import {Test} from '@nestjs/testing';
import Store from 'electron-store';
import ReceiptRepository from 'app/src-electron/receipt/receipt.repository';
import {Receipt, ReceiptCategory, ReceiptComponent} from 'app/src-electron/receipt/receipt';

describe('ReceiptRepository', () => {

  let repository: ReceiptRepository;

  beforeEach(async () => {
    const app = await Test.createTestingModule({

      providers: [
        ReceiptRepository,
        {
          provide: Store,
          useValue: new Store(),
        }
      ]
    }).compile();
    repository = app.get<ReceiptRepository>(ReceiptRepository);
    repository.clear();
  });


  it('should be defined.', () => {
    expect(repository).toBeDefined();
  });


  it('레시피 생성 & 조회 & 삭제', async () => {

    const receipt = new Receipt();
    receipt.setName('아메리카노');
    receipt.setMemo('메모');
    receipt.setCategory(ReceiptCategory.COFFEE);
    receipt.addComponent(new ReceiptComponent(1, 'Ingredient', 1));
    receipt.setSellingPrice(1000);
    repository.save(receipt);

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

