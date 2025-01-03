<!-- src/pages/SuperAdmin/LibrarianInfoApproval.vue -->

<template>
    <div class="librarian-info-approval">
        <h2>图书管理员信息修改申请审批</h2>

        <el-table
            :data="approvalList"
            stripe
            style="width: 100%"
            v-loading="isLoading">

            <el-table-column
                prop="userId"
                label="用户UID"
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
                <template #default="scope">
                    {{ scope.row.gender || '未修改' }}
                </template>
            </el-table-column>

            <el-table-column
                prop="birthday"
                label="出生日期"
                width="150">
                <template #default="scope">
                    {{ scope.row.birthday || '未修改' }}
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

        <div v-if="approvalList.length === 0 && !isLoading" class="no-data">
            暂无审批申请
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'LibrarianInfoApproval',
    computed: {
        ...mapGetters('superadmin', ['approvalList', 'isLoading']),
    },
    methods: {
        ...mapActions('superadmin', ['fetchApprovalList', 'approveLibrarianInfoChangeAction', 'rejectLibrarianInfoChangeAction']),

        async approve(userId) {
            try {
                await this.approveLibrarianInfoChangeAction(userId);
                this.$message.success('批准成功');
            } catch (error) {
                this.$message.error(error.message || '批准失败');
            }
        },

        async reject(userId) {
            try {
                await this.rejectLibrarianInfoChangeAction(userId);
                this.$message.success('拒绝成功');
            } catch (error) {
                this.$message.error(error.message || '拒绝失败');
            }
        },
    },
    mounted() {
        this.fetchApprovalList();
    },
};
</script>

<style scoped>
@import '@/assets/styles/superadmin.css';

.librarian-info-approval {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.librarian-info-approval h2 {
    margin-bottom: 20px;
    color: #333;
}

.no-data {
    text-align: center;
    color: #999;
    padding: 20px 0;
}
</style>
