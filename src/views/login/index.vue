<template>
	<div class="login-wrapper">
		<div class="login_img_view">
			<img class="login_img" src="http://syrdev.coyotebio-lab.com:8080/wisdomLivestockWH/pig/picture/login-img.png" />
		</div>
		<div class="modal">
			<el-form :model="user" status-icon :rules="rules" ref="userForm">
				<div class="title">智慧畜牧PC系统</div>
				<el-form-item prop="username">
					<el-input type="text" prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="user.username" />
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" prefix-icon="el-icon-view" placeholder="请输入密码" v-model="user.password" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="btn-login" @click="login">登录</el-button>
				</el-form-item>
				<!-- <div class="toast">
					<span>管理员账号：admin </span>
					<span>密码：654321</span>
				</div>
				<div class="toast">
					<span>普通人员账号：people</span>
					<span>密码：123456</span>
				</div> -->
			</el-form>
		</div>
	</div>
</template>
<script>
import dynamicUser from "../../mock"
import { getLogin, getMenu } from "../../request/api";
import { Message } from "element-ui"
import md5 from 'js-md5'

export default {
	name: 'login',
	data() {
		return {
			user: {
				// username: "shunxinC",
				// password: "865528"
				username: "pcyizhuang",
				password: "888888"
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		login() {
			this.$refs.userForm.validate(( valid ) => {
			    if(valid) {
					// let flag = !1
					// window.localStorage.removeItem("userInfo")
					// dynamicUser.forEach(item => {
					// 	if(item["username"] == this.user['username'] && item["password"] == this.user['password']) {
					// 		flag = !0
					// 		Message({ type: 'success', message: "登录成功", showClose: true, duration: 3000 })
					// 		window.localStorage.setItem("userInfo", JSON.stringify(item))
					// 		this.$router.replace({ path: "/" })
					// 	}
					// })
					// if(!flag) Message({ type: 'warning', message: "账号密码错误，请重试!", showClose: true, duration: 3000 })
					
					// return
					getLogin({
						userPhone: this.user['username'],
						passWord: md5(this.user['password']),
						verCode: this.user['password']
					}).then((res) => {
						console.log(res)
						if (res.data.success) {
							// Message({ type: 'success', message: "登录成功", showClose: true, duration: 3000 })
							// let item = {
							// 	role_name: res.data.role_name,
							// 	farm_id: res.data.farm_id
							// }
							// window.localStorage.setItem("userInfo", JSON.stringify(item))
							// this.$router.replace({ path: "/" })

							this.getMenuMethod(res.data.role_name, res.data.farm_id, res.data.roleId);
						} else {
							Message({ type: 'warning', message: "账号密码错误，请重试!", showClose: true, duration: 3000 })
						}
					});

			    } else return false
			})
		},
		getMenuMethod(role_name, farm_id, roleId){
			getMenu({
				roleId: roleId
			}).then((res) => {
				if (res.data.success) {
					window.localStorage.removeItem("userInfo")
					Message({ type: 'success', message: "登录成功", showClose: true, duration: 3000 })
					let item = {
						avatar: "https://www.coyotebio.com/uploads/images/20210929/3d3b2a85e3a44f1c3f8cd97022441403.png",
						role_name: role_name,
						farm_id: farm_id,
					 	roleId: roleId,
						routes: res.data.result
		// 				farm_id:"FARM006",
		// 				roleId:"85",
		// 				role_name:"顺鑫猪场管理员",
		// 				routes: [
        //     { id: 1, name: "/homemain", path: "/homemain", component: "Layout", redirect: "/homemain/index", hidden: false, children: [
        //         { name: "/homemain/index", path: "/homemain/index", meta: { title: "风险大屏" }, component: "homemain/index" },
        //     ]},
        //     { id: 2, name: "/measure", path: "/measure", component: "Layout", redirect: "/measure/index", hidden: false, children: [
        //         { name: "/measure/index", path: "/measure/index", meta: { title: "猪只个体健康" }, component: "measure/index" }
        //     ]},
        //     { id: 3, name: "/disinfection", path: "/disinfection", component: "Layout", redirect: "/disinfection/index", hidden: false, children: [
        //         { name: "/disinfection/index", path: "/disinfection/index", meta: { title: "员工淋浴监管" }, component: "disinfection/index" }
        //     ] },
        //     { id: 4, name: "/ozonemodule", path: "/ozonemodule", component: "Layout", redirect: "/ozonemodule/index", hidden: false, children: [
        //         { name: "/ozonemodule/index", path: "/ozonemodule/index", meta: { title: "物资消毒监管" }, component: "ozonemodule/index" }
        //     ] },
        //     { id: 5, name: "/animalmonitor", path: "/animalmonitor", component: "Layout", redirect: "/animalmonitor/index", hidden: false, children: [
        //         { name: "/animalmonitor/index", path: "/animalmonitor/index", meta: { title: "小动物监测" }, component: "animalmonitor/index" }
        //     ] },
        //     { id: 6, name: "/people", path: "/people", component: "Layout", redirect: "/people/index", hidden: false, children: [
        //         { name: "/people/index", path: "/people/index", meta: { title: "员工管理" }, component: "people/index" }
        //     ] }
        // ]
					}
					console.log('--item-->:',item)
					window.localStorage.setItem("userInfo", JSON.stringify(item))
					this.$router.replace({ path: "/homemain/index" })
					// this.$router.replace({ path: "/" })
				}
			});
		}
	}
}
</script>
<style scoped>
.login-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	background-color: #13153e;
	width: 100%;
	height: 100%;
}

.login_img_view{
	width: 500px;
	height: 440px;
}

.login_img{
	width: 500px;
	height: 440px;
}
.modal {
	width: 360px;
	/* height: 380px; */
	box-shadow: 0 0 10px 5px #ddd;
	padding: 50px;
	border-radius: 5px;
	background: #FFF;
}
.title {
	width: 100%;
	text-align: center;
	line-height: 1.5;
	font-size: 42px;
	margin-bottom: 30px;
}
.btn-login {
	width: 100%;
}
.toast{
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 50px;
}
</style>