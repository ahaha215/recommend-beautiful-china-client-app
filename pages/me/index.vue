<template>
	<view class="root">
		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="title left">
						Beautiful China . 我 的
					</view>
				</view>
			</view>
		</view>

		<!-- 主体内容 -->
		<view class="content">
			<view class="user-info">
				<view class="avatar">
					<image :src="getUserInfo.avatar" mode="aspectFill"></image>
				</view>
				<navigator class="modify-user-info" url="/pages/me/edit-user-info">编辑资料</navigator> 
				<h2>{{getUserInfo.username}}</h2>
				<view class="info clearfix">
					<image :src="getUserInfo.sex=='男'?'../../static/image/male.png':'../../static/image/female.png'" mode="aspectFit" class="left"></image>
					<text class="left">{{formatTime(getUserInfo.gmtCreate)}} 加入</text>
				</view>
				<view class="statistics clearfix">
					<view class="item left">
						<view class="number">
							{{userBehaviorNum.totalScenicSpotNum}}
						</view>
						<view class="title">
							推荐数
						</view>
					</view>
					<view class="item left">
						<view class="number">
							{{userBehaviorNum.totalPostsNum}}
						</view>
						<view class="title">
							发帖数
						</view>
					</view>
					<view class="item left">
						<view class="number">
							{{userBehaviorNum.totalCommentNum}}
						</view>
						<view class="title">
							评论数
						</view>
					</view>
				</view>
			</view>
			
			<view class="about-user">
				
				<u-subsection :list="menuList" :current="curNow" @change="sectionChange" activeColor="#80d1c8" mode="button" bgColor="#f8f8f8" class="change-bar"></u-subsection>
				
				<view class="scenicSpot-list" v-if="curNow == 0">
					<navigator class="scenicSpot-item" v-for="scenicSpot in userScenicSpotData.dataList" :key="scenicSpot.id" :url="'/pages/scenicSpot/detail?id='+scenicSpot.id">
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
							<text class="upload-time left">{{formatTime(scenicSpot.gmtCreate)}}</text>
							<view class="view right clearfix">
								<image src="../../static/image/view.png" class="left"></image>
								<text class="view-sum left">{{scenicSpot.viewSum}}</text>
							</view>
						</view>
					</navigator>
				</view>
				
				<view class="posts-list" v-if="curNow == 1" v-for="posts in userPostsData.dataList" :key="posts.id">
					<view class="posts-item">
						<view class="box-top clearfix">
							<view class="left image-box">
								<image :src="posts.user.avatar" mode="aspectFill"></image>
							</view>
							<view class="right main-box">
								<h2>{{posts.user.username}}</h2>
								<text>
									{{posts.content}}
								</text>
							</view>
						</view>
						<view class="box-bottom clearfix">
							<text class="upload-time left">{{formatTime(posts.gmtCreate)}}</text>
							<view class="more right">
								<view class="more-action left clearfix" v-show="posts.isOpenFlag">
									<image :src="!posts.isLikeFlag ? '../../static/image/like.png' : '../../static/image/like-active.png'" mode="aspectFit" @click="isLike(posts)"></image>
									<image src="../../static/image/comment-icon.png" mode="aspectFill" @click="isComment(posts)"></image>
								</view>
								<image src="../../static/image/more.png" mode="aspectFill" @click="isOpen(posts)" class="right"></image>
							</view>
						</view>
						<view class="comment-from clearfix" v-if="posts.isCommentFlag">
							<input type="text" placeholder="切记, 恶语伤人 !" class="left" v-model="postsComment.content">
							<button class="right" @click="publishComment(posts.id)">发表</button>
						</view>
						<view class="comment-list" v-if="posts.commentList.length===0?false:true">
							<view class="comment-item" v-for="comment in posts.commentList" :key="comment.id">
								<text class="username">{{comment.user.username}} ：</text> <text class="comment-content">{{comment.content}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import store from '@/store/index.js';
	import {getUserBehavior,getScenicSpotByUserId,getPostsByUserId,addPostsComment} from'@/api/api.js';
			
	export default {
		data() {
			return {
				menuList: ['我的推荐', '我的发布'],
				curNow: 0,
				
				userBehaviorNum:{
					totalScenicSpotNum:0,
					totalPostsNum:0,
					totalCommentNum:0
				},
				
				userScenicSpotData:{
					current:1,
					limit:10,
					dataList:[]
				},
				userPostsData:{
					current:1,
					limit:10,
					dataList:[]
				},
				
				postsComment:{
					content:""
				}
			}
		},
		onLoad() {
			this.postsComment.userId = this.getUserInfo.id;
			this.initUserBehavior(this.getUserInfo.id);
			this.getScenicSpotByUserId(this.getUserInfo.id);
			this.getPostsByUserId(this.getUserInfo.id);
		},
		onPullDownRefresh() {
			this.postsComment.userId = this.getUserInfo.id;
			this.initUserBehavior(this.getUserInfo.id);
			this.getScenicSpotByUserId(this.getUserInfo.id);
			this.getPostsByUserId(this.getUserInfo.id);
				
			uni.stopPullDownRefresh();	
		},
		computed:{
			...mapGetters(['getUserInfo'])
		},
		methods: {
			initUserBehavior(userId){
				this.$api.getUserBehavior(userId).then(response => {
					this.userBehaviorNum.totalScenicSpotNum = response.data.totalScenicSpotNum;
					this.userBehaviorNum.totalPostsNum = response.data.totalPostsNum;
					this.userBehaviorNum.totalCommentNum = response.data.totalCommentNum;
				})
			},
			getScenicSpotByUserId(){
				this.$api.getScenicSpotByUserId(this.getUserInfo.id,this.userScenicSpotData.current,this.userScenicSpotData.limit).then(response => {
					this.userScenicSpotData.dataList = response.data.scenicSpotVOList
				})
			},
			getPostsByUserId(){
				this.$api.getPostsByUserId(this.getUserInfo.id,this.userPostsData.current,this.userPostsData.limit).then(response => {
					let postsList = response.data.postsVOList
					for (var i = 0; i < postsList.length; i++) {
						postsList[i].isOpenFlag = false;
						postsList[i].isLikeFlag = false;
						postsList[i].isCommentFlag = false;
					}
					this.userPostsData.dataList = postsList;
				})
			},
			publishComment(postsId){
				this.postsComment.postsId = postsId;
				this.$api.addPostsComment(this.postsComment).then(response => {
					this.initUserBehavior(this.getUserInfo.id);
					this.getPostsByUserId(this.getUserInfo.id);
				})
			},
			isOpen(posts){
				posts.isOpenFlag = !posts.isOpenFlag;
			},
			isLike(posts){
				posts.isLikeFlag = !posts.isLikeFlag;
			},
			isComment(posts){
				posts.isCommentFlag = !posts.isCommentFlag;
			},
			sectionChange(index){
				this.curNow = index;
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
				    var currentdate = date.getFullYear() + "年" + month + "月" + strDate + "日	";    
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

					.title {
						color: #fff;
						font-size: 36rpx;
						font-weight: bolder;
						line-height: 90rpx;
					}

				}
			}
		}

		.content {
			background-color: #80d1c8;
			padding-top: 150rpx;

			.user-info {
				width: 100%;
				background-color: #fff;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				position: relative;
				padding-top: 30rpx;

				.avatar {
					background-color: #fff;
					width: 180rpx;
					height: 180rpx;
					border-radius: 50%;
					text-align: center;
					position: absolute;
					top: -80rpx;
					left: 40rpx;

					image {
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
						margin-top: 15rpx;
					}
				}

				.modify-user-info {
					width: 200rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 35rpx;
					background-color: #fff;
					border-radius: 30rpx;
					border: 1px #d1d1d1 solid;
					margin-left: 500rpx;
					text-align: center;
				}

				h2 {
					margin-top: 30rpx;
					font-size: 40rpx;
					margin-left: 40rpx;
				}

				.info {
					padding-left: 40rpx;
					padding-top: 30rpx;

					image {
						width: 40rpx;
						height: 40rpx;
					}

					text {
						font-size: 28rpx;
						margin-left: 20rpx;
						margin-top: 4rpx;
						color: #6c6c6c;
					}
				}
			}

			.statistics {

				padding-left: 15rpx;
				margin-top: 80rpx;

				.item {
					width: 242rpx;
					text-align: center;

					.number {
						margin-bottom: 20rpx;
					}

					.title {
						font-size: 30rpx;
					}
				}
			}
		
			.about-user{
				background-color: #fff;
				padding-top: 80rpx;
				
				.change-bar{
					width: 710rpx;
					margin: auto;
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
		
				.posts-list{
					
					width: 710rpx;
					margin: auto;
					margin-top: 50rpx;
					
					.posts-item{
						width: 100%;
						margin-bottom: 100rpx;
						
						.box-top{
							.image-box{
								image{
									width: 120rpx;
									height: 120rpx;
									border-radius: 12rpx;
								}
							}
							.main-box{
								width: 550rpx;
								h2{
									font-size: 40rpx;
									margin-bottom: 20rpx;
									font-weight: bolder;
								}
								text{
									font-size: 32rpx;
								}
							}
						}
						
						.box-bottom{
							margin-top: 20rpx;
							height: 60rpx;
							
							.upload-time{
								font-size: 30rpx;
								color: #5e5e5e;
								margin-top: 8rpx;
							}
							.more{
								image{
									width: 50rpx;
									height: 20rpx;
									margin-top: 18rpx;
								}
								
								.more-action{
									width: 250rpx;
									border-radius: 12rpx;
									background-color: #f8f8f8;	
									margin-right: 30rpx;
									
									image{
										width: 40rpx;
										height: 40rpx;
										margin-left: 60rpx;
										margin-top: 10rpx;
									}
									
								}
							}
						}
					
						.comment-from{
							margin-top: 30rpx;
							
							input{
								width: 550rpx;
								height: 80rpx;
								border: 2px solid #f8f8f8;
								text-indent: 1rem;
							}
							button{
								width: 120rpx;
								height: 80rpx;
								line-height: 80rpx;
								font-size: 30rpx;
								background-color: #80d1c8;
								color: #fff;
							}
						}
					
						.comment-list{
							padding-top: 30rpx;
							padding-bottom: 10rpx;
							margin-top: 30rpx;
							background-color: #f8f8f8;
							
							.comment-item{
								font-size: 30rpx;
								margin: auto;
								width: 650rpx;
								margin-bottom: 20rpx;
								.username{
									font-weight: bolder;
								}
							}					
						}
					}
				}
		}
	}
</style>
