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
						我荐美丽中国 . 登录
					</view>
				</view>
			</view>
		</view>

		<view class="content">
			<view class="logo">
				<image src="../../static/logo.png" mode="aspectFit"></image>
				<h2>发现中国美，推荐美丽中国！</h2>
			</view>

			<view class="main">
				<view class="menu clearfix">
					<text class="left username-login active">账号登录</text>
					<navigator url="/pages/user/login-verification-code" class="left code-login">验证码登录</navigator>
				</view>
				<view class="form">
					<input type="text" placeholder="请输入账号" v-model="userInfoData.username">
					<input type="password" placeholder="请输入密码" v-model="userInfoData.password">
					<button @click="loginByPassword">登 录</button>
				</view>
				<view class="bottom clearfix">
					<navigator url="/pages/user/reset-password" class="left">忘记密码</navigator>
					<navigator url="/pages/user/register" class="right">没有账号，去注册</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import store from '@/store/index.js';
	
	export default {
		
		data() {
			return {
				userInfoData: {
					username: "",
					password: ""
				}
			}
		},
		computed:{
			...mapGetters(['getUserInfo'])
		},
		onLoad() {
			
		},
		methods: {
			
			...mapMutations(['login']),


			loginByPassword() {

				this.$api.loginByPasswordApi(this.userInfoData).then(response => {
					if(response.data.userInfoVO != null){
						
						this.login(response.data.userInfoVO)
						
						this.$refs.uToast.show({
							type:"success",
							message:"登录成功",
							complete(){
			
								uni.switchTab({
									url: "/pages/index/index",
								})
							}
						})
					} else {
						this.$refs.uToast.show({
							type:"error",
							message:"用户名或密码错误！"
						})
					}
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
				.menu {

					margin-top: 60rpx;
					font-size: 35rpx;

					.code-login {
						margin-left: 40rpx;
					}

					.active {
						font-weight: bolder;
						color: #80d1c8;
					}
				}

				.form {
					margin-top: 50rpx;

					input {
						text-indent: 1em;
						border: 1px #e5e5e5 solid;
						height: 90rpx;
						border-radius: 12rpx;
						margin-bottom: 50rpx;
					}

					button {
						background-color: #80d1c8;
						color: #fff;
						font-weight: bolder;
					}
				}

				.bottom {
					margin-top: 30rpx;
					font-size: 30rpx;
					color: #565656;
				}
			}
		}
	}
</style>
