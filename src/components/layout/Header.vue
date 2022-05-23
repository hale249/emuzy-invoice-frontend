<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="() => (collapsed = !collapsed)"
    />
    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
  </a-layout-header>
</template>

<script lang="ts">
export default {
  name: 'Header',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    function handleCollapsed() {
      return false;
    }

    return {
    }
  }
}
</script>

<style scoped>

</style>