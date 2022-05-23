<template>
  <div class="logo">
    <img src="~@/assets/logo.png" alt="" />
    <h2 v-show="!collapsed" class="title">Invoice</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.logo {
@apply flex overflow-hidden whitespace-nowrap items-center;
  height: 64px;
  padding-left: 24px;
  line-height: 64px;
  img {
    height: 32px;
    margin-right: 8px;
  }
  .title {
  @apply mb-0 text-xl;
    color: #ffff;
  }
}
</style>