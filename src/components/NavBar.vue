<template>
    <div class="navbar">
        <div class="logo">图书管理系统</div>
        <div class="nav-links">
            <router-link to="/user/info">用户信息</router-link>
            <router-link to="/admin/bookinfo">管理员</router-link>
            <router-link to="/superadmin/bookinfo">超级管理员</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBar"
};
</script>

<style scoped>
.navbar {
    background-color: #007bff;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar .logo {
    font-size: 24px;
    font-weight: bold;
}

.navbar .nav-links a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
}

.navbar .nav-links a:hover {
    text-decoration: underline;
}
</style>
