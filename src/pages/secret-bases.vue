<template>
  <q-page class="full-width flex justify-center" padding>
    <BaseCard>
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">시크릿 베이스</div>
        <q-separator/>
      </q-card-section>

      <q-card-section class="flex justify-end q-px-lg q-gutter-lg">
        <q-input
          v-model="searchText"
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
          label="재료 등록"
          @click="secretBasePageStore.showCreateSecretBaseDialog"/>
      </q-card-section>

      <q-card-section class="q-gutter-md flex">
        <SecretBaseCard v-for="secretBase in filteredSecretBases" :key="secretBase.name"
                        :secret-base="secretBase"
        />
      </q-card-section>

    </BaseCard>

    <CreateSecretBaseCard v-model="secretBasePageStore.createSecretBaseDialog"/>
    <UpdateSecretBaseCard v-model="secretBasePageStore.updateSecretBaseDialog"/>
  </q-page>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useSecretBaseStore} from 'stores/secret-base';
import SecretBaseCard from 'components/apps/secret-base/SecretBaseCard.vue';
import CreateSecretBaseCard from 'components/apps/secret-base/CreateSecretBaseCard.vue';
import BaseCard from 'components/BaseCard.vue';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';
import UpdateSecretBaseCard from 'components/apps/secret-base/UpdateSecretBaseCard.vue';
import {SecretBase} from 'src/types/secret-base';

const secretBaseStore = useSecretBaseStore();
const secretBasePageStore = useSecretBasePageStore();

const searchText = ref('');
const filteredSecretBases = computed(() => {
  return secretBaseStore.secretBases.filter(secretBase => {
    return secretBase.name.includes(searchText.value);
  });
});

</script>

<route lang="yaml">
meta:
  layout: default
</route>

