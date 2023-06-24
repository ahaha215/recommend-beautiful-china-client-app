<template>
	<view class="root">
		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="title left">
						Beautiful China . 微 话
					</view>
				</view>
			</view>
		</view>
		
		<!-- 顶部 -->
		<view class="header">
			<view class="avatar">
				<image :src="getUserInfo.avatar" mode="aspectFill"></image>
			</view>
		</view>
		
		<!-- 主体部分 -->
		<view class="content">
			<view class="posts-list">
				<view class="posts-item" v-for="posts in postsListDate" :key="posts.id">
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
						<text class="upload-time left">
							{{
								formatTime(posts.gmtCreate)
							}}
						</text>
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
					<view class="comment-list" v-if="posts.commentList.length==0?false:true">
						<view class="comment-item" v-for="comment in posts.commentList">
							<text class="username">{{comment.user.username}} ：</text> 
							<text class="comment-content">{{comment.content}}</text>
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
	import {getConditionPostsList,addPostsComment} from '@/api/api.js'
	
	export default {
		data() {
			return {
				current:1,
				limit:10,
				postsListDate:[],
				postsComment:{
					content:""
				}
			}
		},
		computed:{
			...mapGetters(['getUserInfo'])
		},
		onLoad() {
			this.postsComment.userId = this.getUserInfo.id;
			this.initPostsListData();
		},
		onPullDownRefresh(){
			this.refreshData();
		},
		methods: {
			initPostsListData(){
				this.$api.getConditionPostsList("通过",this.current,this.limit).then(response => {
					let postsList = response.data.postsVOList
					for (var i = 0; i < postsList.length; i++) {
						postsList[i].isOpenFlag = false;
						postsList[i].isLikeFlag = false;
						postsList[i].isCommentFlag = false;
					}
					this.postsListDate = postsList;
				})
			},
			refreshData(){
				this.initPostsListData();
				
				uni.stopPullDownRefresh();
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
			publishComment(postsId){
				this.postsComment.postsId = postsId;
				this.$api.addPostsComment(this.postsComment).then(response => {
					this.initPostsListData();
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
	.root{
		
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
		
		.header{
			width: 100%;
			height: 300rpx;
			background-image: linear-gradient(#80d1c8, #fff);
			position: relative;
		
			.avatar{
				width: 150rpx;
				height: 150rpx;
				background-color: #fff;
				position: absolute;
				right: 60rpx;
				bottom: -75rpx;
				border-radius: 12rpx;
				text-align: center;
				padding-top: 20rpx;
				
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
		}
		
		.content{
			width: 710rpx;
			margin: auto;
			
			.posts-list{
				
				margin-top: 150rpx;
				
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
