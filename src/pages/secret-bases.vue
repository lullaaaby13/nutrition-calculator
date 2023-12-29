<template>
  <q-page class="full-width q-pa-xl">
    <div class="flex full-width q-mb-md">
      <span class="text-h4 text-bold">시크릿 베이스</span>
    </div>

    <div class="row full-width">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="flex justify-end q-px-lg q-gutter-lg">
          <q-input
              v-model="searchText"
              dense
              type="text"
              label="재료 찾기(재료명)"
              style="width: 300px"
              stack-label
          >
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn
              color="primary"
              label="시크릿 베이스 등록하기"
              @click="secretBasePageStore.showCreateSecretBaseDialog"/>
        </div>
      </div>
    </div>

    <q-separator class="q-my-md full-width"/>

    <div class="q-gutter-md flex full-width">
      <SecretBaseCard v-for="secretBase in filteredSecretBases" :key="secretBase.name"
                      v-bind="secretBase"
      />
    </div>

    <CreateSecretBaseCard v-model="secretBasePageStore.createSecretBaseDialog"/>
    <UpdateSecretBaseCard v-model="secretBasePageStore.updateSecretBaseDialog"/>
  </q-page>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useSecretBaseStore} from 'stores/secret-base';
import SecretBaseCard from 'components/apps/secret-base/SecretBaseCard.vue';
import CreateSecretBaseCard from 'components/apps/secret-base/CreateSecretBaseDialog.vue';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';
import UpdateSecretBaseCard from 'components/apps/secret-base/UpdateSecretBaseDialog.vue';

const secretBaseStore = useSecretBaseStore();
const secretBasePageStore = useSecretBasePageStore();

const searchText = ref('');
const filteredSecretBases = computed(() => {
  return secretBaseStore.secretBases.filter(secretBase => {
    return secretBase.name.includes(searchText.value);
  });
});

onMounted(async () => {
  await secretBaseStore.refresh();
});

</script>

<route lang="yaml">
meta:
  layout: default
</route>

