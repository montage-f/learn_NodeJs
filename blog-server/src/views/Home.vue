/**Created by montage_fz on 2019-07-01**/
<template>
    <div class="Home">
        <h3>welcome {{userInfo.author}} back home!</h3>
        <div class="search">
            <el-input v-model.trim="searchValue" placeholder="请输入要查询的博客"></el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" @click="addBlog">新增</el-button>
        </div>
        <div class="table">
            <el-table
                border
                style="width: 50%"
                :data="blogList"
            >
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    v-for="(item,index) of tableInfo"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width">
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="editBlog(scope.row)">编辑</el-button>
                        <el-button type="text" @click="deleteBlog(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                searchValue: '',
                tableInfo: [
                    {
                        prop: 'title',
                        label: '标题'
                    },
                    {
                        prop: 'content',
                        label: '内容'
                    },
                    {
                        prop: 'createTime',
                        label: '创建时间'
                    },
                    {
                        prop: 'updateTime',
                        label: '修改时间'
                    },
                    {
                        prop: 'author',
                        label: '作者'
                    }
                ]

            };
        },
        created() {
            this.getBlogList({
                author: this.userInfo.author
            });
        },
        computed: {
            ...mapState({
                userInfo: (state) => state.userInfo,
                blogList: (state) => state.blogList,
            })
        },
        methods: {
            ...mapActions([
                'getBlogList'
            ]),
            addBlog() {
                this.$router.push('/add-blog');
            },
            editBlog(row) {
                this.$router.push('/edit-blog');
            },
            async deleteBlog(row) {
                let {status, message, data} = await this.$axios.post('/api/blog/del', {
                    id: row.id
                });
                if (status === 200) {
                    this.$message.success(message);
                    this.getBlogList({
                        author: this.userInfo.author
                    });
                }
            },
        },
    };
</script>

<style scoped lang="less">
    .Home {
        .search {
            display: flex;
            margin-bottom: 10px;

            .el-input {
                width: 300px;
                margin-right: 10px;
            }
        }

    }
</style>
