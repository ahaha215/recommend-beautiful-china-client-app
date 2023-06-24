<template>
	<view class="root">
		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="app-name left">
						Beautiful China . 搜索
					</view>
					<view class="right back-btn" @click="gotoBack">
						返回
					</view>
				</view>
			</view>
		</view>

		<u-search placeholder="Please input scenic spot name." v-model="keyword" :clearabled="true" shape="round"
			:showAction="false" height="40" bgColor="#fff" @search="search" class="search-input"></u-search>
		
		<view class="scenicSpot-list" v-if="scenicSpotListData.length != 0">
			<navigator class="scenicSpot-item" v-for="scenicSpot in scenicSpotListData" :key="scenicSpot.id" :url="'/pages/scenicSpot/detail?id='+scenicSpot.id">
				<view class="top clearfix">
					<view class="left icon">
						<image :src="scenicSpot.icon" mode=""></image>
					</view>
					<view class="right scenicSpot-description">
						<h3>{{scenicSpot.scenicSpotName}}</h3>
						<text>{{scenicSpot.description}}</text>
					</view>
				</view>
				<view class="bottom clearfix">
					<image :src="scenicSpot.user.avatar" class="avatar left"></image>
					<text class="username left">{{scenicSpot.user.username}}</text>
					<text class="upload-time left">
						{{
							formatTime(scenicSpot.gmtCreate)
						}}
					</text>
					<view class="view right clearfix">
						<image src="../../static/image/view.png" class="left"></image>
						<text class="view-sum left">{{scenicSpot.viewSum}}</text>
					</view>
				</view>
			</navigator>
		</view>
		<view class="message" v-else>
			未获取到相关数据！
		</view>
		
		
	</view>
</template>

<script>
	
	import {getScenicSpotListByScenicSpotNameLike} from '../../api/api.js'
	
	export default {
		data() {
			return {
				current:1,
				limit:10,
				keyword: "",
				scenicSpotListData: []
			}
		},
		onLaunch() {

		},
		methods: {
			search() {
				this.$api.getScenicSpotListByScenicSpotNameLike(this.keyword,this.current,this.limit).then(response => {
					this.scenicSpotListData = response.data.scenicSpotVOList;
				})
			},
			gotoBack() {
				uni.navigateBack()
			},
			formatTime(gmtCreate){
					var date = new Date(gmtCreate)
				
					var seperator1 = "-";    
				    var seperator2 = ":";    
				    var month = date.getMonth() + 1;    
				    var strDate = date.getDate();    
				    if (month >= 1 && month <= 9) {        
				        month = "0" + month;    
				    }    
				    if (strDate >= 0 && strDate <= 9) {        
				        strDate = "0" + strDate;    
				    }    
				    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes()+ seperator2 + date.getSeconds();    
				    return currentdate;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.root {

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

		.search-input {
			background-image: linear-gradient(#80d1c8, #f8f8f8);
			padding-top: 50rpx;
			padding-bottom: 10rpx;
		}

		.message{
			text-align: center;
			background-color: #fff;
			padding-top: 200rpx;
		}
	
		.scenicSpot-list {
			border-radius: 12rpx;
			margin-top: 24rpx;

			.scenicSpot-item {
				background-color: #fff;
				height: 300rpx;
				border-radius: 12rpx;
				margin-bottom: 20rpx;
				padding-top: 20rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;

				.top {
					.icon image {
						width: 200rpx;
						height: 200rpx;
					}

					.scenicSpot-description {
						width: 450rpx;

						h3 {
							font-size: 35rpx;
							font-weight: bolder;
							margin-bottom: 20rpx;
						}

						text {
							font-size: 30rpx;
						}
					}
				}

				.bottom {
					margin-top: 20rpx;

					.avatar {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}

					.username {
						font-size: 30rpx;
						margin-left: 20rpx;
						line-height: 60rpx;
					}

					.upload-time {
						font-size: 30rpx;
						margin-left: 20rpx;
						line-height: 60rpx;
					}

					.view {
						image {
							width: 50rpx;
							height: 50rpx;
							margin-right: 20rpx;
						}

						text {
							line-height: 60rpx;
						}
					}
				}
			}
		}
	}
</style>
