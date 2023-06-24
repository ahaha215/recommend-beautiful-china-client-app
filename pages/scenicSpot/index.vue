<template>
	<view class="root">

		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="title left">
						Beautiful China . 景 点
					</view>
				</view>
			</view>
		</view>

		<!-- 景点统计 -->
		<view class="scenicSpot-count">
			<view class="count-box">
				<text class="title">景点</text>
				<view class="count-content">
					<text class="scenicSpot-sum left">景点数：{{scenicSpotStatistics.scenicSpotSum}}</text>
					<text class="comment-sum left">评论数：{{scenicSpotStatistics.scenicSpotComment}}</text>
					<text class="view-sum right">浏览数：{{scenicSpotStatistics.scenicSpotView}}</text>
				</view>
			</view>
		</view>

		<view class="content">
			<!-- 热门top -->
			<u-scroll-list indicatorWidth=100 indicatorColor="#fff" indicatorActiveColor="#80d1c8">
				<view class="scroll-list" style="flex-direction: row;">
					<navigator class="scroll-list__goods-item" v-for="(item, index) in topScenicSpotData" :key="index"
						:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']" :url="'/pages/scenicSpot/detail?id='+item.id">
						<image class="scroll-list__goods-item__image" :src="item.icon"></image>
						<text class="scroll-list__goods-item__text">{{ item.scenicSpotName }}</text>
					</navigator>
					<view class="scroll-list__show-more">
						<text class="scroll-list__show-more__text" @click="getMore">查看更多</text>
						<u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
					</view>
				</view>
			</u-scroll-list>

			<!-- 景点列表 -->
			<view class="scenicSpot-box">

				<u-sticky>
					<u-tabs :list="scenicSpotTypeData" @click="changeType" lineColor="#80d1c8"></u-tabs>
				</u-sticky>

				<view class="scenicSpot-list">
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
			</view>
		</view>
	</view>
</template>

<script>
	import {getScenicSpotStatistics,getScenicSpotListBySort,getScenicSpotToTypeData,getScenicSpotListByType} from '@/api/api.js'
	
	export default {
		data() {
			return {
				current:1,
				limit:10,
				
				scenicSpotStatistics: {},
				topScenicSpotData: [],
				scenicSpotTypeData: [],
				scenicSpotListData: []
			}
		},
		onLoad() {
			this.initScenicSpotStatistics();
			this.initTopScenicSpotData();
			this.initScenicSpotToTypeData();
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		methods: {
			changeType(item) {
				this.$api.getScenicSpotListByType(item.id,this.current,this.limit).then(response => {
					this.scenicSpotListData = response.data.scenicSpotVOList
				})
			},
			initScenicSpotStatistics(){
				this.$api.getScenicSpotStatistics().then(response => {
					this.scenicSpotStatistics = response.data.scenicSpotStatistics
				})
			},
			initTopScenicSpotData(){
				this.$api.getScenicSpotListBySort("sortByCreateTime",1,5).then(response => {
					this.topScenicSpotData = response.data.scenicSpotVOList
				})
			},
			initScenicSpotToTypeData(){
				this.$api.getScenicSpotToTypeData().then(response => {
					this.scenicSpotTypeData = response.data.typeList
					this.initScenicSpotListData(response.data.typeList[0].id)
				})
			},
			initScenicSpotListData(typeId){
				this.$api.getScenicSpotListByType(typeId,1,10).then(response => {
					this.scenicSpotListData = response.data.scenicSpotVOList
				})
			},	
			refreshData(){
				this.initScenicSpotStatistics();
				this.initTopScenicSpotData();
				this.initScenicSpotToTypeData();
				
				uni.stopPullDownRefresh();
			},				
			getMore(){
				this.$api.getScenicSpotListBySort("sortByCreateTime",1,10).then(response => {
					this.topScenicSpotData = response.data.scenicSpotVOList
				})
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

		height: 2000rpx;

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

		// 景点统计
		.scenicSpot-count {
			width: 100%;
			height: 150rpx;
			background-image: linear-gradient(#80d1c8, #f8f8f8);
			position: relative;

			margin-bottom: 180rpx;

			.count-box {
				width: 650rpx;
				height: 200rpx;
				background-color: #fff;
				position: absolute;
				left: 50rpx;
				top: 35rpx;
				border-radius: 12rpx;

				.title {
					display: block;
					margin-left: 20rpx;
					margin-top: 20rpx;
					font-weight: bolder;
				}

				.count-content {
					font-size: 30rpx;
					margin-top: 50rpx;

					.scenicSpot-sum {
						margin-left: 20rpx;
					}

					.comment-sum {
						margin-left: 80rpx;
					}

					.view-sum {
						margin-right: 20rpx
					}
				}
			}
		}

		.content {
			width: 710rpx;
			margin: auto;

			.scenicSpot-box {
				margin-top: 60rpx;

				h2 {
					font-size: 45rpx;
					font-weight: bolder;
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

		}
	}

	// 热门top 格式
	.scroll-list {
		@include flex(column);

		&__goods-item {
			margin-right: 20px;

			&__image {
				width: 100px;
				height: 100px;
				border-radius: 4px;
			}

			&__text {
				display: block;
				width: 100px;
				height: 20px;
				color: #000;
				text-align: center;
				font-size: 15px;
				margin-top: 5px;
				overflow: hidden;
			}
		}

		&__show-more {
			background-color: #fff0f0;
			border-radius: 3px;
			padding: 3px 6px;
			@include flex(column);
			align-items: center;

			&__text {
				font-size: 12px;
				width: 12px;
				color: #f56c6c;
				line-height: 16px;
			}
		}
	}
</style>
