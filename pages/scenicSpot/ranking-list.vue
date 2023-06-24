<template>
	<view class="root">
		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="app-name left">
						Beautiful China . 排行榜
					</view>
					<view class="right back-btn" @click="gotoBack">
						返回
					</view>
				</view>
			</view>
		</view>
		
		<view class="title">
			<h2>景点榜 Top10</h2>
		</view>
		
		<view class="scenicSpot-reaking-list">
			<view class="scenicSpot-item clearfix" v-for="(scenicSpot,index) in scenicSpotList" :key="scenicSpot.id">
				<view class="item-left left">
					{{++index}}
				</view>
				<view class="item-right left">
					<image :src="scenicSpot.icon" mode="aspectFill" class="left"></image>
					<view class="scenicSpot-content left">
						<view class="scenicSpot-name">
							{{scenicSpot.scenicSpotName}}
						</view>
						<view class="username">
							{{scenicSpot.user.username}}
						</view>
					</view>
					<view class="view-sum left clearfix">
						<image src="../../static/image/view.png" mode="aspectFill" class="left"></image>
						<text class="left">{{scenicSpot.viewSum}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getNewScenicSpotData} from '@/api/api.js'
	
	export default {
		data() {
			return {
				scenicSpotList:[]
			}
		},
		onLoad() {
			this.initResouceList()
		},
		methods: {
			initResouceList(){
				this.$api.getNewScenicSpotData("sortByViewSum",1,10).then(response => {
					this.scenicSpotList = response.data.scenicSpotVOList
				})
			},
			gotoBack() {
				uni.navigateBack()
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

					.app-name,
					.back-btn {
						color: #fff;
						font-size: 36rpx;
						font-weight: bolder;
						line-height: 90rpx;
					}
				}
			}
		}

		.title{
			height: 300rpx;
			background-image: linear-gradient(#80d1c8, #fff);
			
			h2{
				color: #fff;
				padding-top: 100rpx;
				width: 710rpx;
				margin: auto;
			}
		}
		
		.scenicSpot-reaking-list{
			width: 710rpx;
			margin: auto;
			.scenicSpot-item{
				background-color: #fff;
				margin-bottom: 20rpx;
				padding-top: 50rpx;
				padding-bottom: 50rpx;
				border-bottom: #f8f8f8 solid 1px;	
				.item-left{
					color: red;
					font-size: 60rpx;
				}
				
				.item-right{
					margin-left: 50rpx;
					
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
					
					.scenicSpot-content{
						margin-left: 20rpx;
						width: 400rpx;
						.scenicSpot-name{
							font-weight: bolder;
							font-size: 35rpx;
						}
						.username{
							font-size: 30rpx;
							padding-top: 10rpx;
						}
					}
					
					.view-sum{
						image{
							width: 40rpx;
							height: 40rpx;
							margin-right: 20rpx;
						}
					}
				}
			}
		}
}
</style>
