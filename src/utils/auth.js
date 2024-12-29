// 检查是否为普通用户
export const checkAuth = (role) => {
    const userRole = localStorage.getItem('role');
    return userRole === role;
};

// 检查是否为管理员
export const checkAdminAuth = () => {
    const userRole = localStorage.getItem('role');
    return userRole === 'admin';
};

// 检查是否为超级管理员
export const checkSuperAdminAuth = () => {
    const userRole = localStorage.getItem('role');
    return userRole === 'superadmin';
};
