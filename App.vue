<script>
	import Vue from 'vue'


	export default {
		onLaunch: function() {
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";

	.root {
		background-color: #f8f8f8;
	}
</style>
