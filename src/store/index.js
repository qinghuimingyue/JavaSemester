import { createStore } from 'vuex';
import user from './user';
import admin from './admin';
import superadmin from './superadmin';

const store = createStore({
    modules: {
        user,
        admin,
        superadmin
    }
});

export default store;
