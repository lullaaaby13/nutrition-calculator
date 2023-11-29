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
          @click="showSecretBaseCreateDialog = true"/>
      </q-card-section>
      <q-card-section class="q-gutter-md flex">

        <SecretBaseCard v-for="secretBase in filteredSecretBases" :key="secretBase.name"
                        :secret-base="secretBase"
                        @onUpdateButtonClick="onUpdateButtonClick"
                        @onDeleteButtonClick="onDeleteButtonClick"
        />
      </q-card-section>

    </BaseCard>

    <CreateSecretBaseCard v-model="pageStore.showSecretBaseCreateDialog"/>
    <UpdateSecretBaseCard v-model="pageStore.showSecretBaseUpdateDialog" :secret-base="updateSecretBase"/>
  </q-page>
</template>




<script setup>

import {computed, ref} from "vue";
import {useSecretBaseStore} from "stores/secret-base";
import SecretBaseCard from "components/apps/secret-base/SecretBaseCard.vue";
import CreateSecretBaseCard from "components/apps/secret-base/CreateSecretBaseCard.vue";
import BaseCard from "components/BaseCard.vue";
import UpdateSecretBaseCard from "components/apps/secret-base/UpdateSecretBaseCard.vue";
import {useSecretBasePageStore} from "stores/pages/secret-base";

const searchText = ref('');
const secretBaseStore = useSecretBaseStore();

const filteredSecretBases = computed(() => {
  return secretBaseStore.secretBases.filter(secretBase => {
    return secretBase.name.includes(searchText.value);
  });
});

const pageStore = useSecretBasePageStore();
// const showSecretBaseCreateDialog = ref(false);
// const showSecretBaseUpdateDialog = ref(false);
// const updateSecretBase = ref(null);

const showSecretBaseUpdate = () => showSecretBaseUpdateDialog.value = true;
const onUpdateButtonClick = secretBase => {
  pageStore.updateSecretBase.value = secretBase;
  showSecretBaseUpdate();
}
const onDeleteButtonClick = secretBase => {
  secretBaseStore.delete(secretBase);
  alert('삭제되었습니다.');
}

</script>

<route lang="yaml">
meta:
  layout: default
</route>

