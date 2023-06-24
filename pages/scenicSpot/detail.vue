<template>
	<view class="root">
		<!-- 自定义顶部状态栏 -->
		<view class="status-contents">
			<view class="top-view"></view>
			<view class="main">
				<view class="status-box clearfix">
					<view class="app-name left">
						Beautiful China . 详情
					</view>
					<view class="right back-btn" @click="gotoBack">
						返回
					</view>
				</view>
			</view>
		</view>
		
		<view class="scenicSpot-description">
			<image class="icon" :src="scenicSpotData.icon" mode="aspectFill"></image>
			<h2>{{scenicSpotData.scenicSpotName}}</h2>
			<view class="statistics">
				<view class="view-num  clearfix">
					<image src="../../static/image/view.png" mode="aspectFill" class="left"></image>
					<view class="number left">
						{{scenicSpotData.viewSum}}
					</view>
				</view>
			</view>
			<view class="type-list">
				<view class="type-item" v-for="typeItem in scenicSpotData.typeList" :key="typeItem.id">
					{{typeItem.typeName}}
				</view>
			</view>
		</view>
		
		<view class="scenicSpot-main">
			
			<view class="region clearfix">
				<view class="left">
					地区：
				</view>
				<view class="link-address left">
					{{scenicSpotData.region}}
				</view>
			</view>
			
			<view class="address clearfix">
				<view class="left">
					地址：
				</view>
				<view class="address-content left">
					{{scenicSpotData.address}}
				</view>
			</view>
			
			<view class="detail clearfix">
				<view class="left">
					详情：
				</view>
				<view class="left">
					{{scenicSpotData.detail}}
				</view>
			</view>
			
			<view class="star clearfix">
				<view class="left">
					星级：
				</view>
				<view class="left">
					<u-rate :value="scenicSpotData.star" readonly></u-rate>
				</view>
			</view>
			
			<view class="time clearfix">
				<view class="left">
					时间：
				</view>
				<view class="left">
					{{
						formatTime(scenicSpotData.gmtCreate)
					}}
				</view>
			</view>
			
			<view class="user clearfix">
				<view class="left">
					荐者：
				</view>
				<view class="left clearfix">
					<image :src="scenicSpotData.user.avatar" mode="aspectFill" class="left"></image>
					<text class="left">{{scenicSpotData.user.username}}</text>
				</view>
			</view>
		</view>
		
		<view class="scenicSpot-comment">
			<view class="comment-from clearfix">
				<input type="text" placeholder="切记, 恶语伤人 !" class="left" v-model="scenicSpotComment.content">
				<button class="right" @click="addScenicSpotCommet">发表</button>
			</view>
			<view class="comment-list" v-if="scenicSpotCommentList.length===0?false:true">
				<view class="comment-item" v-for="comment in scenicSpotCommentList" :key="comment.id">
					<text class="username">{{comment.user.username}} ：</text>
					<text class="comment-content">{{comment.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import store from '@/store/index.js';
	import {getScenicSpotByScenicSpotId,getScenicSpotComment,addScenicSpotComment,addScenicSpotViewSum} from '../../api/api.js'
	
	export default {
		data() {
			return {
				scenicSpotId:"",
				scenicSpotData:{
					user:{},
				},
				scenicSpotCommentList:[],
				current:1,
				limit:10,
				scenicSpotComment:{}
			};
		},
		onLoad(option) {
			this.scenicSpotId = option.id
			this.init(option.id)
			
			this.$api.addScenicSpotViewSum(option.id).then(response => {})
		},
		computed:{
			...mapGetters(['getUserInfo'])
		},
		methods:{
			init(scenicSpotId){
				this.scenicSpotComment.userId = this.getUserInfo.id;
				this.scenicSpotComment.scenicSpotId = scenicSpotId;
				this.initScenicSpot(scenicSpotId);
				this.initScenicSpotComment(scenicSpotId);
			},
			
			initScenicSpot(scenicSpotId){
				this.$api.getScenicSpotByScenicSpotId(scenicSpotId).then(response => {
					this.scenicSpotData = response.data.scenicSpotVO
				})
			},
			
			initScenicSpotComment(scenicSpotId){
				this.$api.getScenicSpotComment(scenicSpotId,this.current,this.limit).then(response => {
					this.scenicSpotCommentList = response.data.scenicSpotVOList
				})
			},
			
			gotoBack() {
				uni.navigateBack()
			},
			
			addScenicSpotCommet(){
				this.$api.addScenicSpotComment(this.scenicSpotComment).then(response => {
					this.initScenicSpotComment(this.scenicSpotId);
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
	
		.scenicSpot-description{
			text-align: center;
			margin-top: 20rpx;
			
			.icon{
				width: 720rpx;
				height: 500rpx;
				border-radius: 16rpx;
			}
			
			h2{
				margin-top: 30rpx;
				font-size: 40rpx;
				font-weight: bolder;
			}
			
			.statistics{
				text-align: center;
				width: 150rpx;
				margin: auto;
				
				.view-num{
					padding-left: 20rpx;
					padding-right: 20rpx;
					border-radius: 10rpx;
					height: 80rpx;
					width: 120rpx;
					image{
						width: 50rpx;
						height: 50rpx;
						margin-top: 15rpx;
					}
					.number{
						margin-left: 10rpx;
						display: inline;
						line-height: 90rpx;
					}
				}
			}
		
			.type-list{
				margin-top: 30rpx;
				.type-item{
					display: inline-block;
					height: 50rpx;
					padding-top: 10rpx;
					padding-bottom: 10rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;
					border-radius: 10rpx;
					background-color: #8ee8de;
					margin: auto;
					margin-right: 20rpx;
					color: #fff;
				}
			}
		}
	
		.scenicSpot-main{
			
			margin-left: 20rpx;
			margin-top: 100rpx;
			
			.region,
			.address,
			.detail,
			.star,
			.time,
			.user{
				margin-top:50rpx;
			}
			
			.user{
				image{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
				}
				
				text{
					margin-left: 20rpx;
				}
			}
		}
		
		.scenicSpot-comment{
			border-top: 1px solid #ececec;
			padding-top: 50rpx;
			margin-top: 100rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
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
</style>
