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
						我荐美丽中国 . 密码重置
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
				<view class="form">
					<input type="text" placeholder="请输入邮箱" v-model="userInfoData.email">

					<input type="text" placeholder="请输入新密码" v-model="userInfoData.newPassword">

					<view class="input-verification-code">
						<input type="text" placeholder="请填写验证码" v-model="userInfoData.verificationCode"
							class="input-verification-code">
						<text class="send-verification-code" @click="sendVerificationCode">发送验证码</text>
					</view>

					<button @click="resetPassword">重 置</button>
				</view>
				<view class="bottom clearfix">
					<navigator url="/pages/user/login-account-number" class="right">去登录</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		sendVerificationCodeApi,
		resetPasswordApi
	} from '../../api/api.js'

	export default {

		data() {
			return {
				userInfoData: {
					email: "",
					verificationCode: "",
					newPassword: ""
				}
			}
		},
		computed: {},
		onLoad() {},
		methods: {

			sendVerificationCode() {
				this.$api.sendVerificationCodeApi(this.userInfoData.email).then(response => {

					if (!response.success || response.code === 20001) {
						this.$refs.uToast.show({
							type: "error",
							message: "对不起，该邮箱尚未注册！"
						})
					} else {
						this.$refs.uToast.show({
							type: "success",
							message: "验证码已发送！"
						})
					}
				})
			},

			resetPassword() {
				this.$api.resetPasswordApi(this.userInfoData).then(response => {
					if (response.code == 20001) {
						this.$refs.uToast.show({
							type: "error",
							message: "验证码有误！"
						})
					} else if(response.code == 20000) {
						this.$refs.uToast.show({
							type: "success",
							message: "重置成功！",
							complete() {
								uni.navigateTo({
									url: "/pages/user/login-account-number",
								})
							}
						})
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: "重置失败！"
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

					.input-verification-code {
						position: relative;
					}

					.send-verification-code {
						position: absolute;
						top: 25rpx;
						right: 25rpx;
						color: #80d1c8;
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
