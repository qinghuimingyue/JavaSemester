import axios from 'axios';

const state = {
    userInfo: null,  // 存储用户信息
    collectedBooks: [],  // 存储用户收藏的图书
    borrowingBooks: [],  // 存储用户借阅的图书
};

const mutations = {
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    SET_COLLECTED_BOOKS(state, books) {
        state.collectedBooks = books;
    },
    SET_BORROWING_BOOKS(state, books) {
        state.borrowingBooks = books;
    },
    LOGOUT(state) {
        state.userInfo = null;
        state.collectedBooks = [];
        state.borrowingBooks = [];
    }
};

const actions = {
    // 用户登录
    async login({ commit }, { userId, password, type }) {
        try {
            const response = await axios.post('/login', { userId, password, type });
            if (response.data.code === 200) {
                // 保存 token 或其他数据
                localStorage.setItem('token', response.data.token);
                commit('SET_USER_INFO', response.data.data);
            }
            return response;
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    },

    // 获取用户信息
    async fetchUserInfo({ commit }) {
        try {
            const response = await axios.get('/userInfo');
            commit('SET_USER_INFO', response.data.data);
        } catch (error) {
            console.error('Failed to fetch user info', error);
        }
    },

    // 用户收藏书籍
    async collectBook({ commit }, bookId) {
        try {
            const response = await axios.get('/collect/do', { params: { bookId } });
            if (response.data.code === 200) {
                commit('SET_COLLECTED_BOOKS', response.data.data);
            }
            return response;
        } catch (error) {
            console.error('Failed to collect book', error);
        }
    },

    // 用户取消收藏书籍
    async undoCollectBook({ commit }, bookId) {
        try {
            const response = await axios.get('/collect/undo', { params: { bookId } });
            if (response.data.code === 200) {
                commit('SET_COLLECTED_BOOKS', response.data.data);
            }
            return response;
        } catch (error) {
            console.error('Failed to undo collect book', error);
        }
    },

    // 获取用户所有收藏信息
    async fetchUserCollectInfo({ commit }) {
        try {
            const response = await axios.get('/userCollectInfoByUserId');
            commit('SET_COLLECTED_BOOKS', response.data.data);
        } catch (error) {
            console.error('Failed to fetch user collect info', error);
        }
    },

    // 提交借书申请
    async submitBorrowingApplication({ commit }, { bookId, estimatedReturnDate }) {
        try {
            const response = await axios.get('/borrowingApplication', { params: { bookId, estimatedReturnDate } });
            return response;
        } catch (error) {
            console.error('Failed to submit borrowing application', error);
        }
    },

    // 提交还书申请
    async submitReturnApplication({ commit }, bookId) {
        try {
            const response = await axios.get('/returnApplication', { params: { bookId } });
            return response;
        } catch (error) {
            console.error('Failed to submit return application', error);
        }
    },

    // 用户登出
    logout({ commit }) {
        localStorage.removeItem('token');
        commit('LOGOUT');
    }
};

const getters = {
    userInfo: (state) => state.userInfo,
    collectedBooks: (state) => state.collectedBooks,
    borrowingBooks: (state) => state.borrowingBooks
};

export default {
    state,
    mutations,
    actions,
    getters
};
