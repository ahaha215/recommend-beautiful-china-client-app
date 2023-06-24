import Vue from 'vue'
 
import Vuex from 'vuex'
 
Vue.use(Vuex)

const store = new Vuex.Store({
    
	state: {
		userInfo: {
		      // "id": "15626716272740966426",
		      // "username": "admin",
		      // "password": "admin",
		      // "mobile": "13455667788",
		      // "email": "123@qq.com",
		      // "avatar": "https://study-helper-bucket.oss-cn-beijing.aliyuncs.com/user/avatar/28a68640c45f416d9d6c48250fca3dc41018-3914x2935.jpg",
		      // "sex": "男",
		      // "age": 23,
		      // "points": 999,
		      // "role": "管理员",
		      // "isDisabled": "否",
		      // "gmtCreate": "2022-08-24T06:52:08.000+0000",
		      // "gmtModified": "2022-10-14T07:30:41.000+0000"
		}
    },
	
	mutations: {
		login(state,userInfo){
			state.userInfo = userInfo;
		},
		logout(state){
			state.userInfo = {};
		},
		updateUser(state,userInfo){
			state.userInfo = userInfo;
		}
	},
    
	getters: {
		getUserInfo: state => {
			return state.userInfo
		}
		
    }
	
})

export default store
