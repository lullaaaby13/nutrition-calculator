import {beforeEach, describe, expect, it} from 'vitest';
import {Test} from '@nestjs/testing';
import Store from 'electron-store';

describe('GlobalModule', () => {

  let store: Store

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [Store]
    }).compile();
    store = app.get<Store>(Store);
  });

  it('store', () => {
    expect(store).toBeDefined();
  });
});

