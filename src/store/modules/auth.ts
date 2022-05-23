import { defineStore } from 'pinia';
import StateConstant from '@/constants/StateConstant';

export const useUserStore = defineStore(StateConstant.USER, {
    state: () => {
        return {}
    },
    getters: {},
    actions: {}
});