<template>
	<view class="root">
		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="app-name left">
						Beautiful China
					</view>
					<image src="../../static/image/search.png" class="right search-icon" @click="gotoSeach()"></image>
				</view>

			</view>
		</view>

		<!-- 轮播图 -->
		<view class="swiper-box">
			<!-- swiper -->
			<u-swiper :list="swipperData" height=180 imgMode="scaleToFill" keyName="imageUrl" :autoplay="true" indicator
				indicatorMode="line" circular class="swiper"></u-swiper>
		</view>

		<!-- 主体内容区域 -->
		<view class="content">

			<!-- 操作栏 -->
			<view class="action-box clearfix">
				<navigator class="left ranking-list" url="/pages/scenicSpot/ranking-list">
				</navigator>
				<view class="right publish">
					<navigator class="publish-scenicSpot" url="/pages/scenicSpot/publish-scenicSpot">
					</navigator>
					<navigator class="publish-posts" url="/pages/posts/publish-posts">
					</navigator>
				</view>
			</view>

			<!-- 最新景点列表推荐 -->
			<view class="new-scenicSpot">
				<h2>最新景点</h2>
				<view class="scenicSpot-list">
					<navigator class="scenicSpot-item" v-for="scenicSpotItem in newScenicSpotData" :url="'/pages/scenicSpot/detail?id='+scenicSpotItem.id">
						<view class="top clearfix">
							<view class="left icon">
								<image :src="scenicSpotItem.icon" mode=""></image>
							</view>
							<view class="right scenicSpot-description">
								<h3>{{scenicSpotItem.scenicSpotName}}</h3>
								<text>{{scenicSpotItem.description}}</text>
							</view>
						</view>
						<view class="bottom clearfix">
							<image :src="scenicSpotItem.user.avatar" class="avatar left"></image>
							<text class="username left">{{scenicSpotItem.user.username}}</text>
							<text class="upload-time left">
							{{
								formatTime(scenicSpotItem.gmtCreate)
							}}
							</text>
							<view class="view right clearfix">
								<image src="../../static/image/view.png" class="left"></image>
								<text class="view-sum left">{{scenicSpotItem.viewSum}}</text>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSwiperData,
		getNewScenicSpotData
	} from '@/api/api.js'

	export default {
		data() {
			return {
				swipperData: [],
				newScenicSpotData: [],
				current: 0,
				limit: 10
			}
		},
		onLoad() {
			this.initSwiperData();
			this.initNewScenicSpotData();
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		methods: {
			initSwiperData() {
				this.$api.getSwiperData().then((response) => {
					this.swipperData = response.data.bannerList;
				})
			},

			initNewScenicSpotData() {
				this.$api.getNewScenicSpotData("sortByCreateTime", this.current, this.limit).then(response => {
					this.newScenicSpotData = response.data.scenicSpotVOList;
				})
			},
			
			refreshData(){
				this.initSwiperData();
				this.initNewScenicSpotData();
				
				uni.stopPullDownRefresh();
			},
			
			gotoSeach(){
				uni.navigateTo({
					url:"/pages/search/index"
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

					.app-name {
						color: #fff;
						font-size: 40rpx;
						font-weight: bolder;
						font-style: italic;
						line-height: 80rpx;
					}

					.search-icon {
						width: 60rpx;
						height: 60rpx;
						margin-top: 15rpx;
					}
				}
			}
		}

		// 轮播图
		.swiper-box {
			width: 100%;
			height: 420rpx;
			background-image: linear-gradient(#80d1c8, #f8f8f8);
			padding-top: 20rpx;

			.swiper {
				width: 710rpx;
				margin: auto;
			}
		}

		.content {
			width: 710rpx;
			margin: auto;

			.action-box {
				height: 350rpx;
				border-radius: 12rpx;

				.ranking-list {
					width: 350rpx;
					height: 350rpx;
					border-radius: 12rpx;

					background-image: url("@/static/image/ranking-list.png");
					background-size: contain;

				}

				.publish {
					.publish-scenicSpot {
						width: 320rpx;
						height: 150rpx;
						border-radius: 12rpx;
						background-image: url("@/static/image/publish-scenicSpot.png");
						background-size: contain;
					}

					.publish-posts {
						width: 320rpx;
						height: 150rpx;
						border-radius: 12rpx;
						margin-top: 49rpx;
						background-image: url("@/static/image/publish-posts.png");
						background-size: contain;
					}
				}
			}

			.new-scenicSpot {
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
</style>
