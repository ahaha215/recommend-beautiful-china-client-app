<template>
	<view class="root">
		<!-- uview toast -->
		<u-toast ref="uToast"></u-toast>

		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="title left">
						Beautiful China . 编辑资料
					</view>
				</view>
			</view>
		</view>

		<view class="content">
			<view class="main">
				<view class="form">
					<text>* 账号：</text>
					<input type="text" placeholder="请输入您的账号" v-model="userInfo.username">

					<text>* 密码：</text>
					<input type="text" placeholder="请输入您的密码" v-model="userInfo.password">

					<text>* 手机号：</text>
					<input type="text" placeholder="请输入您的手机号" v-model="userInfo.mobile">

					<text>* 邮箱：</text>
					<input type="text" placeholder="请输入您的邮箱" v-model="userInfo.email">

					<text>* 性别：</text>
					<radio-group class="clearfix" @change="changeValue">
						<label>
							<radio value="男" class="left" /><text class="left">男</text>
						</label>
						<label>
							<radio value="女" class="left" /><text class="left">女</text>
						</label>
					</radio-group>

					<text>* 年龄：</text>
					<u-number-box v-model="userInfo.age"></u-number-box>

					<text>* 头像</text>
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="1"
						:previewFullImage="true" v-model="userInfo.avatar"></u-upload>

					<button @click="editUserInfo">确 认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';

	import {
		mapGetters,mapMutations
	} from 'vuex'
	import {
		getUserInfoById,updateUserInfo
	} from '@/api/api.js';

	export default {

		data() {
			return {
				userInfo: {
					id: "",
					username: "",
					password: "",
					mobile: "",
					email: "",
					sex: "男",
					age: 18,
					avatar: "",
					role: "普通用户"
				},
				fileList: []
			}
		},
		computed: {
			...mapGetters(['getUserInfo'])
		},
		onLoad() {
			this.initUserInfo();
		},
		methods: {
			
			...mapMutations(['logout']),
			
			initUserInfo() {
				this.$api.getUserInfoById(this.getUserInfo.id).then(response => {

					this.userInfo = response.data.userById

					let dataStr = response.data.userById.avatar
					let file = {
						url: dataStr
					}
					
					this.fileList.push(file)
					
					this.userInfo.avatar = dataStr
					
					// 清空用户的创建时间和修改时间
					delete this.userInfo.gmtCreate
					delete this.userInfo.gmtModified
				})
			},

			changeValue(e) {
				this.userInfo.sex = e.target.value;
			},
			afterRead(event) {

				uni.uploadFile({
					url: 'http://192.168.43.216:5000/oss/avatar/uploadOssFileAvatar',
					name: 'file',
					filePath: event.file[0].url,
					success: (response) => {
						let dataStr = response.data
						let data = JSON.parse(dataStr)
						let url = data.data.url
						let file = {
							url: url
						}
						this.fileList.push(file)
						this.userInfo.avatar = url
					}
				})

			},
			deletePic() {

				// 获取用户的头像
				let avatar = this.userInfo.avatar;
				let fileName = avatar.split("/avatar/")[1];
				
				// 发起请求删除请求
				uni.request({
					method: 'DELETE',
					url: 'http://192.168.43.216:5000/oss/avatar/delOssFileAvatar/' + fileName,
					success: (res) => {
						console.log("delete successful!")
						this.fileList = []
						this.userInfo.avatar = '';
					}
				});
			},
			editUserInfo(){
				this.$api.updateUserInfo(this.userInfo).then(response => {
						
					this.$refs.uToast.show({
						type:"success",
						message:"修改成功！",
						complete(){
							
							// 退出登录
							//this.logout();
							
							uni.redirectTo({
								url: "/pages/user/login-account-number",
							})
							
						}
					})
				},error => {
					this.$refs.uToast.show({
						type:"error",
						message:"修改失败！"
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.root {

		background-color: #fff;

		// 自定义顶部状态栏
		.status-contents {

			height: calc(var(--status-bar-height) + 80rpx);

			.top-view {
				width: 100%;
				position: fixed;
				top: 0;
				height: var(--status-bar-height);
				z-index: 10000;
				background-color: #80d1c8;
			}

			.main {
				width: 100%;
				position: fixed;
				top: var(--status-bar-height);
				height: 80rpx;
				z-index: 10000;
				background-color: #80d1c8;

				.status-box {
					width: 710rpx;
					margin: auto;

					.title {
						color: #fff;
						font-size: 36rpx;
						font-weight: bolder;
						line-height: 90rpx;
					}

				}
			}
		}


		// 主体部分
		.content {

			width: 710rpx;
			margin: auto;

			.logo {

				margin-top: 100rpx;
				text-align: center;

				image {
					width: 130rpx;
					height: 130rpx;
					margin: auto;
					border-radius: 50%;
				}

				h2 {
					font-size: 30rpx;
					font-weight: inherit;
					margin-top: 40rpx;
					margin-left: 20rpx;
				}

			}

			.main {

				.form {
					margin-top: 50rpx;

					text {
						display: block;
						margin-top: 50rpx;
						margin-bottom: 20rpx;
						font-weight: bolder;
						color: #757575;
					}

					input {
						text-indent: 1em;
						border: 1px #e5e5e5 solid;
						height: 90rpx;
						border-radius: 12rpx;
					}

					label {
						text {
							margin-right: 20rpx;
							margin-top: 0;
						}
					}

					button {
						display: block;
						background-color: #80d1c8;
						color: #fff;
						font-weight: bolder;
						margin-top: 20rpx;
						margin-bottom: 20rpx;
					}
				}

				.bottom {
					margin-top: 30rpx;
					font-size: 30rpx;
					color: #565656;
					margin-bottom: 40rpx;
				}
			}
		}
	}
</style>
