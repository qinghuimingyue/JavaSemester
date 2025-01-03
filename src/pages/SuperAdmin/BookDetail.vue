<!-- src/pages/SuperAdmin/BookDetail.vue -->

<template>
    <div class="book-detail">
        <h2>书籍详情</h2>
        <el-card class="detail-card" v-if="bookDetail">
            <div class="book-header">
                <h3>{{ bookDetail.bookName }}</h3>
            </div>
            <div class="book-info">
                <p><strong>书籍ID：</strong> {{ bookDetail.bookId }}</p>
                <p><strong>作者：</strong> {{ bookDetail.author }}</p>
                <p><strong>出版社：</strong> {{ bookDetail.publishing }}</p>
                <p><strong>状态：</strong> {{ bookDetail.status }}</p>
                <p><strong>简介：</strong> {{ bookDetail.intro }}</p>
                <p><strong>豆瓣评分：</strong> {{ bookDetail.douban }}</p>
                <p><strong>出版时间：</strong> {{ formatDate(bookDetail.publicationTime) }}</p>
            </div>
            <div class="actions">
                <!-- 可添加更多管理操作，如编辑书籍信息 -->
                <el-button
                        type="primary"
                        @click="editBook"
                >
                    编辑
                </el-button>
            </div>
            <div class="borrowing-history" v-if="bookBorrowHistory.length > 0">
                <h3>过往借阅详情</h3>
                <el-table :data="bookBorrowHistory" stripe style="width: 100%">
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
            </div>
            <div v-else class="no-history">
                暂无借阅历史
            </div>
        </el-card>

        <div v-else class="loading">
            加载中...
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BookDetail',
    props: {
        bookId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters('superadmin', ['bookDetail', 'bookBorrowHistory', 'isLoading', 'error']),
    },
    methods: {
        ...mapActions('superadmin', ['fetchBookDetail', 'fetchBookBorrowHistory']),
        formatDate(date) {
            if (!date) return '-';
            const d = new Date(date);
            const year = d.getFullYear();
            const month = ('0' + (d.getMonth() + 1)).slice(-2);
            const day = ('0' + d.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        editBook() {
            // 实现编辑书籍信息的逻辑，例如跳转到编辑页面
            this.$message.info('编辑功能尚未实现');
        },
    },
    mounted() {
        this.fetchBookDetail(this.bookId);
        this.fetchBookBorrowHistory(this.bookId);
    },
};
</script>

<style scoped>
@import '@/assets/styles/superadmin.css';

.book-detail {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.book-detail h2 {
    margin-bottom: 20px;
    color: #333;
}

.detail-card {
    max-width: 800px;
    margin: 0 auto;
}

.book-header {
    margin-bottom: 20px;
}

.book-header h3 {
    margin: 0;
}

.book-info p {
    font-size: 16px;
    margin-bottom: 10px;
}

.actions {
    margin-top: 20px;
}

.status-returned {
    color: green;
}

.status-not-returned {
    color: red;
}

.no-history,
.loading {
    text-align: center;
    color: #999;
    padding: 20px 0;
}
</style>
