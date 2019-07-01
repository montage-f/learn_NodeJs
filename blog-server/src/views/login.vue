<template>
    <div class="home">
        <div class="login-form">
            <el-form :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="60px"
                     class="demo-ruleForm"
            >
                <el-form-item label="用户名">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div class="button">
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Login',
        components: {},
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {

            async submitForm() {
                let isFormRole = this.$formRule('ruleForm');
                if (isFormRole) {
                    let {status, message} = await this.$axios.post('/api/user/login', {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    });
                    if (status === 200) {
                        this.$message.success(message);
                        return;
                    }
                    this.$message.error(message);
                }

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>


<style lang="less">
    .home {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .login-form {
            width: 50%;
            height: 35%;
            border: 1px solid #ccc;
            padding: 20px;

            .button {
                width: 100%;
                margin-top: 50px;
            }
        }
    }

</style>
