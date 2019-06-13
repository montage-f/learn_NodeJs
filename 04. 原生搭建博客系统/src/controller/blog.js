/**
 * Created by MonTage_fz on 2019/6/12
 */
// 获取博客列表
const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: new Date().getTime(),
            author: 'A'
        }, {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: new Date().getTime(),
            author: 'B'
        }, {
            id: 3,
            title: '标题C',
            content: '内容C',
            createTime: new Date().getTime(),
            author: 'C'
        }, {
            id: 4,
            title: '标题D',
            content: '内容D',
            createTime: new Date().getTime(),
            author: 'D'
        }, {
            id: 5,
            title: '标题E',
            content: '内容E',
            createTime: new Date().getTime(),
            author: 'E'
        },
    ];
};

// 获取博客详情
const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: new Date().getTime(),
        author: 'A'
    };
    
};
// 新建博客
const newBlog = ({content}) => {
    return {
        id: 3,
        content
    };
};
// 更新博客
const updateBlog = ({id}) => {
    return true;
};
// 删除博客
const delBlog = ({id}) => {
    return true;
};
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
};
