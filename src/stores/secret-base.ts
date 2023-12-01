import {defineStore} from 'pinia';
import {SecretBase, SecretBaseMock} from 'src/types/secret-base';

export const useSecretBaseStore = defineStore({
  id: 'secret-base',
  state: (): { secretBases: SecretBase[] } => ({
    secretBases: [
      SecretBaseMock.ULTRA_MILK
    ]
  }),

  actions: {
    save(secretBase: SecretBase) {

      if (!secretBase.hasMinimumComponents()) {
        throw new Error('최소 2개 이상의 원재료가 필요 합니다.');
      }

      if (this.exists(secretBase)) {
        throw new Error('같은 이름의 비법소스가 이미 존재 합니다.');
      }

      this.secretBases.push(secretBase);
    },

    delete(secretBase: SecretBase) {
      if (!this.exists(secretBase)) {
        throw new Error('존재하지 않는 비법소스 입니다.');
      }
      this.secretBases = this.secretBases.filter(it => it.name !== secretBase.name);
    },

    exists(secretBase: SecretBase) {
      return this.secretBases.some(it => it.name === secretBase.name);
    },

    existsByName(name: string) {
      return this.secretBases.some(it => it.name === name);
    },
  }
});
