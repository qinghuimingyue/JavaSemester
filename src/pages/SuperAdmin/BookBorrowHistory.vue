<!-- src/pages/SuperAdmin/BookBorrowHistory.vue -->

<template>
    <div class="book-borrow-history">
        <h2>书籍借阅历史</h2>
        <el-table
                :data="bookBorrowHistory"
                stripe
                style="width: 100%"
                v-loading="isLoading">

            <el-table-column
                    prop="userId"
                    label="用户ID"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="userName"
                    label="用户名"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="borrowDate"
                    label="借阅日期"
                    width="180">
                <template #default="scope">
                    {{ formatDate(scope.row.borrowDate) }}
                </template>
            </el-table-column>

            <el-table-column
                    prop="returnDate"
                    label="归还日期"
                    width="180">
                <template #default="scope">
                    {{ formatDate(scope.row.returnDate) }}
                </template>
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态"
                    width="120">
                <template #default="scope">
                    <span :class="{'status-returned': scope.row.status === 1, 'status-not-returned': scope.row.status === 0}">
                        {{ scope.row.status === 1 ? '已归还' : '未归还' }}
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="bookBorrowHistory.length === 0 && !isLoading" class="no-data">
            暂无借阅历史
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BookBorrowHistory',
    props: {
        bookId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters('superadmin', ['bookBorrowHistory', 'isLoading', 'error']),
    },
    methods: {
        ...mapActions('superadmin', ['fetchBookBorrowHistory']),
        formatDate(date) {
            if (!date) return '-';
            const d = new Date(date);
            const year = d.getFullYear();
            const month = ('0' + (d.getMonth() + 1)).slice(-2);
            const day = ('0' + d.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
    },
    mounted() {
        this.fetchBookBorrowHistory(this.bookId);
    },
};
</script>

<style scoped>
@import '@/assets/styles/superadmin.css';

.book-borrow-history {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.book-borrow-history h2 {
    margin-bottom: 20px;
    color: #333;
}

.status-returned {
    color: green;
}

.status-not-returned {
    color: red;
}

.no-data {
    text-align: center;
    color: #999;
    padding: 20px 0;
}
</style>
