import Vue from 'vue';
import Vuex from 'vuex';

import {localStore, axios} from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: localStore.get('userInfo') || null,
        blogList: []
    },
    mutations: {
        setBlogList(state, data) {
            state.blogList = data;
        }
    },
    actions: {
        // 获取博客列表
        async getBlogList({commit}, proms = {}) {
            let {status, message, data} = await axios.post('/api/blog/list', proms);
            if (status === 200) {
                commit('setBlogList', data);
            }
        }
    }
});
