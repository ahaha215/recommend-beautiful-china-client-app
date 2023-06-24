<template>
	<view class="root">
		<!-- uview toast -->
		<u-toast ref="uToast"></u-toast>
		
		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="app-name left">
						Beautiful China . 发布帖子
					</view>
					
					<view class="right back-btn" @click="gotoBack">
						返回
					</view>
				</view>
			</view>
		</view>
		
		<button class="btn right" @click="publish">发布</button>
		<!-- 发布帖子主体内容 -->
		<u--textarea class="publish-input" v-model="posts.content" placeholder="请输入内容" count focus height="200" showConfirmBar></u--textarea>
		
		 
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import store from '@/store/index.js';
	import {addPosts} from '@/api/api.js'
	
	export default {
		data() {
			return {
				posts:{
					userId:"",
					content:""
				}
			}
		},
		computed:{
			...mapGetters(['getUserInfo'])
		},
		onLoad() {
			this.init();
		},
		methods: {
			gotoBack() {
				uni.navigateBack()
			},
			
			init(){
				this.posts.userId = this.getUserInfo.id;
			},
			
			publish(){
				this.$api.addPosts(this.posts).then(response => {
					this.$refs.uToast.show({
						type:"success",
						message:"发布成功！",
						complete(){
							uni.switchTab({
								url: "/pages/posts/index",
							})
						}
					})
				},error => {
					this.$refs.uToast.show({
						type:"error",
						message:"对不起，发布失败！"
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
			margin-bottom: 100rpx;
			
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

					.app-name,
					.back-btn,
					.publish-btn{
						color: #fff;
						font-size: 36rpx;
						font-weight: bolder;
						line-height: 90rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
		
		.btn{
			width: 150rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			background-color: #80d1c8;
			color: #fff;
		}
		
		.publish-input{
			width: 680rpx;
			
			margin: auto;
		}
}
</style>
