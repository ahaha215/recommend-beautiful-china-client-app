import Request from '@/utils/request.js'
let request = new Request().http

export default {

	sendVerificationCodeApi(email){
		return request({
			url:`/ucenterservice/user/sendVerificationCode/${email}`,
			method: "POST"
		})
	},
	
	loginByPasswordApi(user){
		return request({
			url:"/ucenterservice/user/loginByPassword",
			method: "POST",
			data: user 
		})
	},
	
	loginByVerificationCodeApi(email,verificationCode){
		return request({
			url:`/ucenterservice/user/loginByVerificationCode/${email}/${verificationCode}`,
			method: "POST"
		})
	},
	
	registerUser(userInfo){
		return request({
			url:`/ucenterservice/user/addUser`,
			method: "POST",
			data: userInfo
		})
	},
	
	resetPasswordApi(userInfoData){
		return request({
			url:`/ucenterservice/user/resetPassword`,
			method: "POST",
			data: userInfoData	
		})
	},
	
	getUserInfoById(userId){
		return request({
			url:`/ucenterservice/user/findUserById/${userId}`,
			method: "GET"
		})
	},
	
	updateUserInfo(user){
		return request({
			url:`/ucenterservice/user/updateUserInfo`,
			method: "POST",
			data: user
		})
	},
	
	getSwiperData(){
		return request({
		    url: "/cms/banner/findAllBanner", 
		    method: "GET",
		})
	},
	
	getConditionPostsList(condition,current,limit){
		return request({
		    url: `/postsservice/posts/pageConditionPostsList/${condition}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	getUserBehavior(userId){
		return request({
		    url: `/ucenterservice/user/statisticsUserBehavior/${userId}`, 
		    method: "GET",
		})
	},
	
	getPostsByUserId(userId,current,limit){
		return request({
		    url: `/ucenterservice/user/pagePostsByUserId/${userId}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	addPostsComment(postsComment){
		return request({
		    url: `/postsservice/postsComment/publishPostsComment`, 
		    method: "POST",
			data: postsComment
		})
	},
	
	addPosts(posts){
		return request({
		    url: `/postsservice/posts/publishPosts`, 
		    method: "POST",
			data: posts
		})
	},
	
	getNewScenicSpotData(sortCondition,current,limit){
		return request({
		    url: `/scenicSpotService/scenicSpot/pageScenicSpotListBySort/${sortCondition}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	getScenicSpotStatistics(){
		return request({
		    url: `/scenicSpotService/scenicSpot/scenicSpotStatistics`, 
		    method: "GET",
		})
	},
	
	getScenicSpotListBySort(sortCondition,current,limit){
		return request({
		    url: `/scenicSpotService/scenicSpot/pageScenicSpotListBySort/${sortCondition}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	getScenicSpotToTypeData(){
		return request({
		    url: `/scenicSpotService/scenicSpotToType/listScenicSpotToType`, 
		    method: "GET",
		})
	},
	
	getScenicSpotListByType(typeId,current,limit){
		return request({
		    url: `/scenicSpotService/scenicSpot/pageScenicSpotListByType/${typeId}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	getScenicSpotByUserId(userId,current,limit){
		return request({
		    url: `/ucenterservice/user/pageScenicSpotByUserId/${userId}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	getScenicSpotListByScenicSpotNameLike(scenicSpotNameLike,current,limit){
		return request({
		    url: `/scenicSpotService/scenicSpot/pageScenicSpotListByScenicSpotNameLike/${scenicSpotNameLike}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	getScenicSpotByScenicSpotId(scenicSpotId){
		return request({
		    url: `/scenicSpotService/scenicSpot/findScenicSpotById/${scenicSpotId}`, 
		    method: "GET",
		})
	},
	
	getScenicSpotComment(scenicSpotId,current,limit){
		return request({
		    url: `/scenicSpotService/scenicSpotComment/pageScenicSpotCommentList/${scenicSpotId}/${current}/${limit}`, 
		    method: "GET",
		})
	},
	
	addScenicSpotComment(scenicSpotComment){
		return request({
		    url: `/scenicSpotService/scenicSpotComment/publishScenicSpotComment`, 
		    method: "POST",
			data: scenicSpotComment
		})
	},
	
	addScenicSpotViewSum(scenicSpotId){
		return request({
		    url: `/scenicSpotService/scenicSpot/addScenicSpotViewSum/${scenicSpotId}`, 
		    method: "POST"
		})
	},
	
	uploadScenicSpotIconApi(file){
		return request({
		    url: `/oss/scenicSpot/uploadOssFileScenicSpotIcon`, 
		    method: "POST",
			data: file
		})
	},
	
	getScenicSpotToType(){
		return request({
		    url: `/scenicSpotService/scenicSpotToType/listScenicSpotToType`, 
		    method: "GET"
		})
	},
	
	addScenicSpot(scenicSpotDTO){
		return request({
		    url: `/scenicSpotService/scenicSpot/addScenicSpot`, 
		    method: "POST",
			data: scenicSpotDTO
		})
	}
	
}
