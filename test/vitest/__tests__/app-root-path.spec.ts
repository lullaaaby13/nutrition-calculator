import { describe, it, expect } from 'vitest';
import {resolve} from 'app-root-path';

describe('app-root-path', () => {

  it('resolve', () => {
    console.log(resolve('test'));
  });
});
