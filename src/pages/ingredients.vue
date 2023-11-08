<template>
  <!--  <q-page class="flex justify-center" padding style="width: 1080px;">-->
  <q-page class="full-width flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">원재료 영양성분 & 단가</div>
        <q-separator/>
      </q-card-section>

      <q-card-section class="row">
        <div class="col-6 q-gutter-md q-px-md" style="border-right: 0.5px solid lightgrey;">
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.FRESH.name" :label="IngredientCategory.FRESH.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.FRUITS.name" :label="IngredientCategory.FRUITS.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.FLOUR.name" :label="IngredientCategory.FLOUR.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.COFFEE.name" :label="IngredientCategory.COFFEE.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.TOPPING.name" :label="IngredientCategory.TOPPING.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.ADDITIVES.name" :label="IngredientCategory.ADDITIVES.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.PACKAGING.name" :label="IngredientCategory.PACKAGING.label"/>
          <q-btn
            rounded
            outline
            color="grey"
            label="선택 초기화"
            @click="resetCheckbox"
          />
        </div>
        <div class="col-3 q-px-md" style="border-right: 0.5px solid lightgrey;">
          <q-toggle
            v-model="toggle"
            color="green"
          />
          <span class="text-caption">1g 당</span>
        </div>
        <div class="col-3 q-px-md">
          <q-btn
            rounded
            outline
            color="primary"
            label="원재료 등록하기"
            @click="registerDialog = true"
          />
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="flex justify-end q-px-lg">
        <q-input
          v-model="searchText"
          type="text"
          label="재료 찾기(재료명)"
          style="width: 300px"
        />
      </q-card-section>
      <q-card-section class="q-gutter-md flex">

        <q-card
          class="q-pa-md q-ma-md"
          bordered
          style="width: 400px;"
          v-for="ingredient in filteredIngredients" :key="ingredient.name"
        >
          <q-card-section class="flex">
            <div>
              <div class="text-h5">{{ ingredient.name }}</div>
              <div class="text-caption">{{ ingredient.category.label }}</div>
            </div>

            <q-space/>
            <div class="q-gutter-md">
              <q-btn
                dense
                outline
                color="secondary"
                label="수정하기"/>
              <q-btn
                dense
                outline
                color="red"
                label="삭제하기"
                @click="onDeleteButtonClick(ingredient)"
              />
            </div>
          </q-card-section>



          <q-separator/>

          <q-card-section class="row">
            <div class="col-6">
              <q-list bordered>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.calories }}</q-item-label>
                    <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.carbohydrates }}</q-item-label>
                    <q-item-label caption lines="1">탄수화물</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.protein }}</q-item-label>
                    <q-item-label caption lines="1">단백질</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.fat }}</q-item-label>
                    <q-item-label caption lines="1">지방</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-6">
              <q-list bordered>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.unitPrice }}</q-item-label>
                    <q-item-label caption lines="1">단가(원)</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.sugars }}</q-item-label>
                    <q-item-label caption lines="1">당류</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.caffeine }}</q-item-label>
                    <q-item-label caption lines="1">카페인</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ ingredient.saturatedFat }}</q-item-label>
                    <q-item-label caption lines="1">포화지방</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="ingredient.memo"
              filled
              disable
              label="메모"
              type="textarea"
            />
          </q-card-section>

          <q-separator/>

          <q-card-section>
            <div class="text-caption text-bold">등록한 날짜: {{ ingredient.createdAt.toISOString() }}</div>
            <div class="text-caption text-bold">마지막 수정한 날짜: {{ ingredient.updatedAt.toISOString() }}</div>
          </q-card-section>

        </q-card>
      </q-card-section>

    </q-card>
    <q-dialog v-model="registerDialog">
      <q-card class="q-pa-md" style="width: 600px;">
        <q-card-section>
          <div class="text-h6">원재료 등록</div>
          <div class="text-caption">100g당</div>
        </q-card-section>

        <q-separator/>

        <q-card-section class="row">
          <div class="col-6 q-px-sm">
            <q-select v-model="model" :options="IngredientCategory" label="카테고리" />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogName"
                     type="text"
                     label="이름"
                     :rule="[nameRules]"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogCalories"
                     type="text"
                     label="칼로리(Kcal)"
                     :rule="[val => val < 0 || '0보다 커야 합니다.']"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogUnitPrice"
                     type="text"
                     label="단가(원)"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogCarbohydrates"
                     type="text"
                     label="탄수화물(g)"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogSugars"
                     type="text"
                     label="당류(g)"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogProtein"
                     type="text"
                     label="단백질(g)"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogCaffeine"
                     type="text"
                     label="카페인(mg)"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogFat"
                     type="text"
                     label="지방(g)"
            />
          </div>
          <div class="col-6 q-px-sm">
            <q-input v-model="dialogSaturatedFat"
                     type="text"
                     label="포화지방(g)"
            />
          </div>

        </q-card-section>

<!--        <q-separator/>-->

        <q-card-section>
          <q-input type="textarea" label="메모"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="등록" color="primary" @click="onRegisterConfirmButtonClick"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="failRegisterIngredientDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          같은 이름dd
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="configDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <p>정말로 삭제 하시겠어요?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>

import {computed, ref} from "vue";
import {IngredientCategory} from "@/enum/ingredientCategory";
import {useIngredientStore} from "stores/ingredients";

/**
 * 필터링
 */
const selectedCategories = ref([]);
const searchText = ref('');

const toggle = ref(false);
const configDelete = ref(false);
const registerDialog = ref(true);

const ingredientStore = useIngredientStore();
const ingredients = ingredientStore.ingredients;

const filteredIngredients = computed(() => {
  let filtered = ingredients;

  if (selectedCategories.value.length > 0) {
    filtered = filtered
      .filter(ingredient =>
        selectedCategories.value.some(categoryName => ingredient.category.name === categoryName)
      );
  }

  if (searchText.value) {
    filtered = filtered
      .filter(ingredient =>
        ingredient.name.includes(searchText.value)
      );
  }

  return filtered;
})


const resetCheckbox = () => {
  selectedCategories.value = [];
}

const onDeleteButtonClick = ingredient => {
  ingredientStore.delete(ingredient);
}

const dialogName = ref('');
const dialogCalories = ref(0);
const dialogUnitPrice = ref(0);
const dialogCarbohydrates = ref(0);
const dialogSugars = ref(0);
const dialogProtein = ref(0);
const dialogCaffeine = ref(0);
const dialogFat = ref(0);
const dialogSaturatedFat = ref(0);
const failRegisterIngredientDialog = ref(false);
const onRegisterConfirmButtonClick = () => {
  const ingredient = {
    name: dialogName.value,
    calories: dialogCalories.value,
    unitPrice: dialogUnitPrice.value,
    carbohydrates: dialogCarbohydrates.value,
    sugars: dialogSugars.value,
    protein: dialogProtein.value,
    caffeine: dialogCaffeine.value,
    fat: dialogFat.value,
    saturatedFat: dialogSaturatedFat.value,
  }

  const isExists = ingredientStore.exists(ingredient);

  if (isExists) {
    failRegisterIngredientDialog.value = true;
  } else {
    ingredientStore.save(ingredient);
    registerDialog.value = false;
    failRegisterIngredientDialog.value = false;
  }

}

const nameRules = value => {
  if (!value) {
    return '이름을 입력해 주세요.';
  }
}


</script>

<route lang="yaml">
meta:
  layout: default
</route>

