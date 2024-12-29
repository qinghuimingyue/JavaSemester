import request from './request';

// 获取用户个人信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/user/info',
    });
};

// 获取用户借阅的图书
export const getUserBookInfo = () => {
    return request({
        method: 'GET',
        url: '/user/bookinfo',
    });
};

// 借书
export const borrowBook = (bookId) => {
    return request({
        method: 'POST',
        url: '/user/borrowbook',
        data: { bookId },
    });
};

// 获取用户收藏信息
export const getUserCollectionInfo = () => {
    return request({
        method: 'GET',
        url: '/user/collection',
    });
};
