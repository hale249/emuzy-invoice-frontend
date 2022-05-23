<template>
  <a-config-provider :locale="locale">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </a-config-provider>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {PUBLIC_LAYOUT} from "./constants";
import {computed} from "@vue/reactivity";
import {useRoute} from "vue-router";
import {i18n} from './locales';

export default defineComponent({
  name: 'App',

  setup() {
    const route = useRoute();
    return {
      layout: computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout"),
      locale: computed(() => i18n.global.messages[i18n.global.locale].el),
    };
  }
});
</script>
