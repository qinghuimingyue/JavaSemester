import request from './request';

// 获取所有图书信息
export const getSuperAdminBookInfo = () => {
    return request({
        method: 'GET',
        url: '/superadmin/bookinfo',
    });
};

// 借书审批
export const borrowApproval = (borrowId, approvalStatus) => {
    return request({
        method: 'POST',
        url: '/superadmin/borrowapproval',
        data: { borrowId, approvalStatus },
    });
};

// 还书审批
export const returnApproval = (returnId, approvalStatus) => {
    return request({
        method: 'POST',
        url: '/superadmin/returnapproval',
        data: { returnId, approvalStatus },
    });
};

// 获取个人信息
export const getPersonalInfo = () => {
    return request({
        method: 'GET',
        url: '/superadmin/personalinfo',
    });
};

// 编辑个人信息
export const editPersonalInfo = (userData) => {
    return request({
        method: 'PUT',
        url: '/superadmin/personalinfo/edit',
        data: userData,
    });
};
