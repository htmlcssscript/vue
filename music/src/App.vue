<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <div>
      <keep-alive>
         <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="ecmascript-6">
  import vHeader from 'components/Header/Header'
  import vTab from 'components/Tab/Tab'
  export default {
  	components: {
  		vHeader,
      vTab
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable'
	#app
	 color: $color-theme
</style>