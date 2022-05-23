import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import loadAllPlugins from './plugins';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/tailwind.css';
import { registerGlobalComponent } from './utils/defineComponent';
import { setupStore } from '@/store';

const app: ReturnType<typeof createApp> = createApp(App)
registerGlobalComponent(app);
app.use(router)
loadAllPlugins(app);
setupStore(app);

app.mount('#app')