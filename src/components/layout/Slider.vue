<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <user-outlined />
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import {ref} from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons-vue";

export default {
  name: 'Slider',
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  props: {
    collapsed: {
      type: Boolean,
    }
  },

  setup() {
    const selectedKeys = ref<string[]>(['1']);

    return {
      selectedKeys,
    };
  }
};
</script>

<style lang="scss" scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>