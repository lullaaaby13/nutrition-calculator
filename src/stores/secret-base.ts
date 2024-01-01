import {defineStore} from 'pinia';
import {CreateSecretBaseRequest, SecretBase, UpdateSecretBaseRequest} from 'src/types/secret-base';
import SecretBaseAPI from 'src/api/secret-base';
import {ComponentSummary} from 'src/types/summary';
import {computed, ref} from "vue";

export const useSecretBaseStore = defineStore('secretBases', () => {
  const secretBases = ref<SecretBase[]>([]);

  const summaries = computed(() => {
    return secretBases.value.map(it => {
      const summary = new ComponentSummary(it.id, it.name);
      summary.addSecretBaseComponents(it.components);
      return summary;
    });
  });

  const fetchAll = async() => {
    const responses = await SecretBaseAPI.list();
    clear();
    responses.forEach(it => secretBases.value.push(it));
  };

  const save = async(request: CreateSecretBaseRequest) => {
    const secretBase = await SecretBaseAPI.save(request);
    secretBases.value.push(secretBase);
  };

  const remove = async(id: number) => {
    await SecretBaseAPI.delete(id);
    let index = secretBases.value.findIndex(it => it.id === id);
    if (index !== -1) {
      secretBases.value.splice(index, 1);
    }
  };

  const update = async(id: number, request: UpdateSecretBaseRequest) => {
    const secretBase = await SecretBaseAPI.update(id, request)
    replace(secretBase);
  }

  const replace = (secretBase: SecretBase) => {
    const index = secretBases.value.findIndex(it => it.id === secretBase.id);
    if (index !== -1) {
      secretBases.value[index] = secretBase;
    }
  }

  const clear = () => {
    secretBases.value.splice(0, secretBases.value.length);
  }

  return {
    secretBases,
    summaries,
    save,
    remove,
    refresh: fetchAll,
    update,
  };

})
