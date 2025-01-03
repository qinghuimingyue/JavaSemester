<!-- src/pages/SuperAdmin/LibrarianApprovalList.vue -->

<template>
    <div class="librarian-approval-list">
        <h2>图书管理员信息修改申请</h2>
        <el-table
                :data="librarianApprovalList"
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
                    prop="modifyProject"
                    label="修改项目"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="gender"
                    label="性别"
                    width="100">
            </el-table-column>

            <el-table-column
                    prop="birthday"
                    label="出生日期"
                    width="150">
                <template #default="scope">
                    {{ formatDate(scope.row.birthday) }}
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="200">
                <template #default="scope">
                    <el-button
                            type="primary"
                            size="small"
                            @click="approve(scope.row.userId)">
                        批准
                    </el-button>
                    <el-button
                            type="danger"
                            size="small"
                            @click="reject(scope.row.userId)">
                        拒绝
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="librarianApprovalList.length === 0 && !isLoading" class="no-data">
            暂无修改申请
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'LibrarianApprovalList',
    computed: {
        ...mapGetters('superadmin', ['librarianApprovalList', 'isLoading', 'error']),
    },
    methods: {
        ...mapActions('superadmin', ['fetchLibrarianApprovalList', 'approveLibrarianApprovalAction', 'rejectLibrarianApprovalAction']),
        async approve(userId) {
            this.$confirm('确定要批准此申请吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                try {
                    const response = await this.approveLibrarianApprovalAction(userId);
                    this.$message.success(response.message || '批准成功');
                } catch (error) {
                    this.$message.error(error.message || '批准失败');
                }
            }).catch(() => {
                // 取消操作
            });
        },
        async reject(userId) {
            this.$confirm('确定要拒绝此申请吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                try {
                    const response = await this.rejectLibrarianApprovalAction(userId);
                    this.$message.success(response.message || '拒绝成功');
                } catch (error) {
                    this.$message.error(error.message || '拒绝失败');
                }
            }).catch(() => {
                // 取消操作
            });
        },
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
        this.fetchLibrarianApprovalList();
    },
};
</script>

<style scoped>
@import '@/assets/styles/superadmin.css';

.librarian-approval-list {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.librarian-approval-list h2 {
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
