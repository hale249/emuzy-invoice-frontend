<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <Logo :collapsed="collapsed"/>
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
    <a-layout>
      <a-layout-header class="bg-[#fff] px-4">
        <div class="flex justify-between items-center gap-4">
            <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          <div class="avatar-auth">
            <a-dropdown>
              <div class="d-flex items-center cursor-pointer">
                <a-avatar size="small">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
                Ha Le
              </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>Hồ sơ cá nhân</a-menu-item>
                <a-menu-item>Đăng xuất</a-menu-item>
              </a-menu>
            </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >


        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import Logo from '@/components/layout/Logo.vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Logo,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>

Cậu xem cho cháu chức năng này ạ.

Cháu đang làm chức năng webhook và cháu đang chưa biết cách gửi event như nào tới địa chỉ nhận event.
Quy trình của cháu như này: 
Ví dụ: 
Bước 1. Người dùng tạo account. trigger event tạo account chuyển dưới Hub event 
Bước 2. Khi Hub event có event và có địa chỉ quy định nhân event. event trong Hub event sẽ gửi lần lượt event tới địa chỉ quy định nhận. 


 Hiện tại cháu đang mắc ở Bước 2. và chưa biết xử lý như nào. Bước 2 như cậu thì xử lý như nào ạ.