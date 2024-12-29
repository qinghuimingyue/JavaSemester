import { createRouter, createWebHistory } from 'vue-router';

// 用户模块页面
import UserInfo from '../pages/User/UserInfo.vue';
import BookInfo from '../pages/User/BookInfo.vue';
import BorrowBook from '../pages/User/BorrowBook.vue';
import CollectionInfo from '../pages/User/CollectionInfo.vue';

// 管理员模块页面
import AdminBookInfo from '../pages/Admin/BookInfo.vue';
import AdminBorrowInfo from '../pages/Admin/BorrowInfo.vue';
import LibrarianApproval from '../pages/Admin/LibrarianApproval.vue';
import ManageLibrarians from '../pages/Admin/ManageLibrarians.vue';

// 超级管理员模块页面
import SuperAdminBookInfo from '../pages/SuperAdmin/BookInfo.vue';
import BorrowApproval from '../pages/SuperAdmin/BorrowApproval.vue';
import ReturnApproval from '../pages/SuperAdmin/ReturnApproval.vue';
import PersonalInfo from '../pages/SuperAdmin/PersonalInfo.vue';
import PersonalInfoEdit from '../pages/SuperAdmin/PersonalInfoEdit.vue';

// 登录页面
import Login from '../pages/Login.vue';

// 认证检查工具
import { checkAuth, checkAdminAuth, checkSuperAdminAuth } from '../utils/auth';

const routes = [
    // 登录页面
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
    },

    // 用户模块
    {
        path: '/user/info',
        name: 'UserInfo',
        component: UserInfo,
        meta: { requiresAuth: true, role: 'user' },
        beforeEnter: (to, from, next) => {
            if (checkAuth('user')) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/user/bookinfo',
        name: 'UserBookInfo',
        component: BookInfo,
        meta: { requiresAuth: true, role: 'user' },
        beforeEnter: (to, from, next) => {
            if (checkAuth('user')) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/user/borrowbook',
        name: 'BorrowBook',
        component: BorrowBook,
        meta: { requiresAuth: true, role: 'user' },
        beforeEnter: (to, from, next) => {
            if (checkAuth('user')) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/user/collection',
        name: 'CollectionInfo',
        component: CollectionInfo,
        meta: { requiresAuth: true, role: 'user' },
        beforeEnter: (to, from, next) => {
            if (checkAuth('user')) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },

    // 管理员模块
    {
        path: '/admin/bookinfo',
        name: 'AdminBookInfo',
        component: AdminBookInfo,
        meta: { requiresAuth: true, role: 'admin' },
        beforeEnter: (to, from, next) => {
            if (checkAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/admin/borrowinfo',
        name: 'AdminBorrowInfo',
        component: AdminBorrowInfo,
        meta: { requiresAuth: true, role: 'admin' },
        beforeEnter: (to, from, next) => {
            if (checkAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/admin/librarianapproval',
        name: 'LibrarianApproval',
        component: LibrarianApproval,
        meta: { requiresAuth: true, role: 'admin' },
        beforeEnter: (to, from, next) => {
            if (checkAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/admin/manage-librarians',
        name: 'ManageLibrarians',
        component: ManageLibrarians,
        meta: { requiresAuth: true, role: 'admin' },
        beforeEnter: (to, from, next) => {
            if (checkAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },

    // 超级管理员模块
    {
        path: '/superadmin/bookinfo',
        name: 'SuperAdminBookInfo',
        component: SuperAdminBookInfo,
        meta: { requiresAuth: true, role: 'superadmin' },
        beforeEnter: (to, from, next) => {
            if (checkSuperAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/superadmin/borrowapproval',
        name: 'BorrowApproval',
        component: BorrowApproval,
        meta: { requiresAuth: true, role: 'superadmin' },
        beforeEnter: (to, from, next) => {
            if (checkSuperAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/superadmin/returnapproval',
        name: 'ReturnApproval',
        component: ReturnApproval,
        meta: { requiresAuth: true, role: 'superadmin' },
        beforeEnter: (to, from, next) => {
            if (checkSuperAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/superadmin/personalinfo',
        name: 'PersonalInfo',
        component: PersonalInfo,
        meta: { requiresAuth: true, role: 'superadmin' },
        beforeEnter: (to, from, next) => {
            if (checkSuperAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    {
        path: '/superadmin/personalinfo/edit',
        name: 'PersonalInfoEdit',
        component: PersonalInfoEdit,
        meta: { requiresAuth: true, role: 'superadmin' },
        beforeEnter: (to, from, next) => {
            if (checkSuperAdminAuth()) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },

    // 默认路由，重定向到登录页面
    {
        path: '/',
        redirect: '/login',
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// 全局路由守卫：检查是否需要认证
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const role = localStorage.getItem('role'); // 获取当前用户角色
        if (role) {
            if (to.meta.role && to.meta.role === role) {
                next();
            } else {
                next({ name: 'Login' });
            }
        } else {
            next({ name: 'Login' });
        }
    } else {
        next();
    }
});

export default router;
