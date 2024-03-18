<template>
  <q-list class="row wrap">
    <q-card
      v-for="item in itemList"
      :key="item.key"
      class="my-card q-ma-sm"
      flat
      bordered
      style="width: 372px"
    >
      <q-img :src="item.imageURL" height="200px" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="add"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
          @click="addItem(item)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ item.name }}</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          ></div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">{{ item.price }}円</div>
        <div class="text-caption text-grey">
          {{ item.description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="search" />
        <q-btn flat color="primary">この商品を見る</q-btn>
      </q-card-actions>
    </q-card>
  </q-list>
  <q-dialog v-model="cartAlert">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ addItemInfo }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import itemList from "../../assets/data/Items.json";
import { useStore } from "vuex";

const store = useStore();

const cartAlert = ref(false);
const addItemInfo = ref("");
const addItem = async (item) => {
  const result = await store.dispatch("items/addItem", item);
  if (result) {
    cartAlert.value = true;
    addItemInfo.value = item.name + "を保存しました。";
  } else {
    store.dispatch("items/incrementItemCount", item.id);
  }
};
</script>

<style lang="scss" scoped></style>
