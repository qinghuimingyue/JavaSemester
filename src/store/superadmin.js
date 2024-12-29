import axios from 'axios';

const state = {
    allBooks: [],  // 存储书籍概览
    bookDetail: null,  // 存储书籍详情
    userBorrowingInfo: []  // 存储书籍过往借阅详情
};

const mutations = {
    SET_ALL_BOOKS(state, books) {
        state.allBooks = books;
    },
    SET_BOOK_DETAIL(state, bookDetail) {
        state.bookDetail = bookDetail;
    },
    SET_USER_BORROWING_INFO(state, info) {
        state.userBorrowingInfo = info;
    }
};

const actions = {
    // 获取所有书籍概览
    async fetchAllBooks({ commit }) {
        try {
            const response = await axios.get('/book/allBookInfor');
            commit('SET_ALL_BOOKS', response.data.data);
        } catch (error) {
            console.error('Failed to fetch all books', error);
        }
    },

    // 获取书籍详情
    async fetchBookDetail({ commit }, bookId) {
        try {
            const response = await axios.get('/book/bookDetail', { params: { bookId } });
            commit('SET_BOOK_DETAIL', response.data.data);
        } catch (error) {
            console.error('Failed to fetch book detail', error);
        }
    },

    // 获取书籍过往借阅详情
    async fetchUserBorrowingInfo({ commit }, bookId) {
        try {
            const response = await axios.get('/book/userBorrowingInfo', { params: { bookId } });
            commit('SET_USER_BORROWING_INFO', response.data.data);
        } catch (error) {
            console.error('Failed to fetch user borrowing info', error);
        }
    }
};

const getters = {
    allBooks: (state) => state.allBooks,
    bookDetail: (state) => state.bookDetail,
    userBorrowingInfo: (state) => state.userBorrowingInfo
};

export default {
    state,
    mutations,
    actions,
    getters
};
