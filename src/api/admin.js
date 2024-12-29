import request from './request';

// 获取所有图书信息
export const getAdminBookInfo = () => {
    return request({
        method: 'GET',
        url: '/admin/bookinfo',
    });
};

// 获取借阅信息
export const getAdminBorrowInfo = () => {
    return request({
        method: 'GET',
        url: '/admin/borrowinfo',
    });
};

// 审批图书管理员
export const approveLibrarian = (librarianId) => {
    return request({
        method: 'POST',
        url: '/admin/approve-librarian',
        data: { librarianId },
    });
};

// 管理图书管理员
export const manageLibrarians = (action, librarianId) => {
    return request({
        method: 'POST',
        url: '/admin/manage-librarians',
        data: { action, librarianId },
    });
};
