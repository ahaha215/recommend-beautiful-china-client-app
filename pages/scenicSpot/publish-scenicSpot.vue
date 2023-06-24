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
						Beautiful China . 推荐景点
					</view>

					<view class="right back-btn" @click="gotoBack">
						返回
					</view>
				</view>
			</view>
		</view>


		<view>
			<u--form labelPosition="left" :model="model" ref="form" class="form">
				<u-form-item label="名称" labelWidth="100rpx" height="100rpx" borderBottom
					required ref="scenicSpotame">
					<u--input v-model="model.scenicSpotInfo.scenicSpotName" border="none"></u--input>
				</u-form-item>
				<u-form-item label="描述" labelWidth="100rpx" borderBottom required
					ref="description">
					<u--input v-model="model.scenicSpotInfo.description" border="none"></u--input>
				</u-form-item>
				<u-form-item label="地区" labelWidth="100rpx" borderBottom required
					ref="region">
					<u--input v-model="model.scenicSpotInfo.region" border="none"></u--input>
				</u-form-item>
				<u-form-item label="地址" labelWidth="100rpx" borderBottom required
					ref="address">
					<u--input v-model="model.scenicSpotInfo.address" border="none"></u--input>
				</u-form-item>
				<u-form-item label="类型" labelWidth="100rpx" borderBottom required
					ref="typeList">
					<u-checkbox-group v-model="model.scenicSpotInfo.typeList" shape="square" @change="change">
						<u-checkbox :customStyle="{marginRight: '16px'}" v-for="(item, index) in model.typeData"
							:key="index" :label="item.name" :name="item.id">
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="详情" labelWidth="100rpx" borderBottom required ref="detail">
					<u--textarea v-model="model.scenicSpotInfo.detail" placeholder="请输入内容" count confirmType="done"></u--textarea>
				</u-form-item>
				<u-form-item label="图片" labelWidth="100rpx" borderBottom required ref="icon">
					<u-upload :fileList="model.fileList" @afterRead="afterRead" @delete="deletePic" multiple
						:maxCount="1" :previewFullImage="true" v-model="model.scenicSpotInfo.icon"></u-upload>
				</u-form-item>
				<u-form-item label="星级" labelWidth="100rpx" borderBottom required
					ref="star">
					<u-rate :count="model.starCount" v-model="model.scenicSpotInfo.star"></u-rate>
					<!-- <u--input v-model="model.scenicSpotInfo.star" border="none"></u--input> -->
				</u-form-item>
			</u--form>
			<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
			<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
		</view>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import store from '@/store/index.js';
	import {
		uploadScenicSpotIconApi,
		getScenicSpotToType,
		addScenicSpot
	} from '@/api/api.js'

	export default {
		data() {
			return {
				model: {
					starCount: 5,
					scenicSpotInfo: {
						scenicSpotName: "",
						description: "",
						region:"",
						address: "",
						detail:"",
						userId: "",
						icon:"",
						star:3,
						typeList: []
					},
					typeData: [],
					fileList: []
				}
			};
		},
		computed: {
			...mapGetters(['getUserInfo'])
		},
		onLoad() {
			this.initUserId();
			this.initTypeData();
		},
		methods: {
			initUserId() {
				this.model.scenicSpotInfo.userId = this.getUserInfo.id
			},
			initTypeData() {
				this.$api.getScenicSpotToType().then(response => {
					this.model.typeData = response.data.typeList
				})
			},
			gotoBack() {
				uni.navigateBack()
			},
			change() {},
			afterRead(event) {
				
				uni.uploadFile({
					url: 'http://192.168.43.216:5000/oss/scenicSpot/uploadOssFileScenicSpotIcon',
					name: 'file',
					filePath: event.file[0].url,
					success: (response) => {
						let dataStr = response.data
						let data = JSON.parse(dataStr)
						let url = data.data.url
						let file = {
							url: url
						}
						this.model.fileList.push(file)
						this.model.scenicSpotInfo.icon = url
					}
				})

			},
			deletePic() {
				console.log("点击删除")
			},
			submit() {
				this.$api.addScenicSpot(this.model.scenicSpotInfo).then(response => {
					this.$refs.uToast.show({
						type:"success",
						message:"发布成功！",
						complete(){
							uni.switchTab({
								url: "/pages/index/index",
							})
						}
					})
				},error => {
					this.$refs.uToast.show({
						type:"error",
						message:"对不起，发布失败！"
					})
				})
			},
			reset() {
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
					.publish-btn {
						color: #fff;
						font-size: 36rpx;
						font-weight: bolder;
						line-height: 90rpx;
						margin-left: 20rpx;
					}
				}
			}
		}

		.form {
			width: 710rpx;
			margin: auto;
		}
	}
</style>
