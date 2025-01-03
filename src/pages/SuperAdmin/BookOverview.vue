<!-- src/pages/SuperAdmin/BookOverview.vue -->

<template>
    <div class="book-overview">
        <h2>书籍概览</h2>
        <el-table
                :data="books"
                stripe
                style="width: 100%"
                v-loading="isLoading">

            <el-table-column
                    prop="bookName"
                    label="书名"
                    width="200">
            </el-table-column>

            <el-table-column
                    prop="author"
                    label="作者"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="publishing"
                    label="出版社"
                    width="200">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态"
                    width="120">
                <template #default="scope">
                    <span :class="{'status-available': scope.row.status === '在馆', 'status-borrowed': scope.row.status === '借出'}">
                        {{ scope.row.status }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="150">
                <template #default="scope">
                    <el-button
                            type="primary"
                            size="small"
                            @click="viewDetail(scope.row.bookId)">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="books.length === 0 && !isLoading" class="no-data">
            暂无书籍信息
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BookOverview',
    computed: {
        ...mapGetters('superadmin', ['books', 'isLoading', 'error']),
    },
    methods: {
        ...mapActions('superadmin', ['fetchAllBooks']),
        viewDetail(bookId) {
            this.$router.push({ name: 'SuperAdminBookDetail', params: { bookId } });
        },
    },
    mounted() {
        this.fetchAllBooks();
    },
};
</script>

<style scoped>
@import '@/assets/styles/superadmin.css';

.book-overview {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.book-overview h2 {
    margin-bottom: 20px;
    color: #333;
}

.status-available {
    color: green;
}

.status-borrowed {
    color: red;
}

.no-data {
    text-align: center;
    color: #999;
    padding: 20px 0;
}
</style>
