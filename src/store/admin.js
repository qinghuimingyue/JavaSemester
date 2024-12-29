import axios from 'axios';

const state = {
    borrowedBooks: [],  // 存储借出的图书
    returnRequests: [],  // 存储还书申请
    librarianInfo: null, // 存储图书管理员信息
};

const mutations = {
    SET_BORROWED_BOOKS(state, books) {
        state.borrowedBooks = books;
    },
    SET_RETURN_REQUESTS(state, requests) {
        state.returnRequests = requests;
    },
    SET_LIBRARIAN_INFO(state, info) {
        state.librarianInfo = info;
    }
};

const actions = {
    // 查询所有借出书籍申请
    async fetchAllBorrowRequests({ commit }) {
        try {
            const response = await axios.get('/librarianApproval/allInfo');
            commit('SET_BORROWED_BOOKS', response.data.data);
        } catch (error) {
            console.error('Failed to fetch borrow requests', error);
        }
    },

    // 通过用户借书申请
    async approveBorrowRequest({ commit }, { userId, bookId }) {
        try {
            const response = await axios.get('/librarianApproval/pass', { params: { userId, bookId } });
            return response;
        } catch (error) {
            console.error('Failed to approve borrow request', error);
        }
    },

    // 拒绝用户借书申请
    async rejectBorrowRequest({ commit }, { userId, bookId }) {
        try {
            const response = await axios.get('/librarianApproval/noPass', { params: { userId, bookId } });
            return response;
        } catch (error) {
            console.error('Failed to reject borrow request', error);
        }
    },

    // 查询所有归还书籍申请
    async fetchAllReturnRequests({ commit }) {
        try {
            const response = await axios.get('/librarianReturn/getAllInfo');
            commit('SET_RETURN_REQUESTS', response.data.data);
        } catch (error) {
            console.error('Failed to fetch return requests', error);
        }
    },

    // 通过用户还书申请
    async approveReturnRequest({ commit }, { userId, bookId }) {
        try {
            const response = await axios.get('/librarianReturn/pass', { params: { userId, bookId } });
            return response;
        } catch (error) {
            console.error('Failed to approve return request', error);
        }
    },

    // 拒绝用户还书申请
    async rejectReturnRequest({ commit }, { userId, bookId }) {
        try {
            const response = await axios.get('/librarianReturn/noPass', { params: { userId, bookId } });
            return response;
        } catch (error) {
            console.error('Failed to reject return request', error);
        }
    },

    // 获取图书管理员信息
    async fetchLibrarianInfo({ commit }) {
        try {
            const response = await axios.get('/selfInfo');
            commit('SET_LIBRARIAN_INFO', response.data.data);
        } catch (error) {
            console.error('Failed to fetch librarian info', error);
        }
    }
};

const getters = {
    borrowedBooks: (state) => state.borrowedBooks,
    returnRequests: (state) => state.returnRequests,
    librarianInfo: (state) => state.librarianInfo
};

export default {
    state,
    mutations,
    actions,
    getters
};
