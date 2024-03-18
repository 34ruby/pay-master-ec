<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated @click="goToMain" style="cursor: pointer">
      <q-toolbar>
        <q-toolbar-title> MY PAY TEST APP </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Your Cart </q-item-label>

        <EssentialLink />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(true);
    const goToMain = () => {
      router.push("/");
    };

    return {
      leftDrawerOpen,
      goToMain,
    };
  },
});
</script>
