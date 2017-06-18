<template>
	<div class="slider" id="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span 
			class="dot" 
			v-for="(item,index) in dots" 
			:class="{active: currentPageIndex === index}"></span>
		</div>
	</div>
</template>

<script type="ecmascript-6">
	import BScroll from 'better-scroll'
	import {addClass} from 'common/js/dom'

	export default {
		name: 'slider',
		//可不可以循环轮播
		data() {
			return {
				dots: [],
				currentPageIndex: 0
			}
		},
		props: {
			loop: {
				type: Boolean,
				default: true
			},
			//是否自动轮播
			autoPlay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 4000
			}
		},
		mounted() {
			setTimeout(() => {
				this._setSliderWidth()
				this._initDos()
				this._initSlider()

				if(this.autoPlay) {
					this._play()
				}
				window.addEventListener('resize', () => {
					if(!this.slider) {
						return
					}
				  this._setSliderWidth(true)
				})

			}, 20)
		},
		methods: {
			_setSliderWidth(isResize) {
				 this.children = this.$refs.sliderGroup.children
				 let width = 0 
				 let sliderWidth = this.$refs.slider.clientWidth
				 for(let i = 0; i < this.children.length; i++) {
					 let child = this.children[i]
					 addClass(child, 'slider-item')
					 //让每个子元素的宽度 = 父容器的宽度 ， 父容器的宽度在这里自动撑满为100%；
					 //所以每个子元素的宽度就是视口的宽度
					 child.style.width = sliderWidth + 'px';
					 //父容器的宽度要等于4张图片的宽度，因为图片float
					 width += sliderWidth;
				 }
					//因为又生成了2个Dom对象
					 if(this.loop && !isResize) {
						 width += 2*sliderWidth
					 }
					 this.$refs.sliderGroup.style.width = width + 'px'

			},
			_initDos() {
				this.dots = new Array(this.children.length)
			},
			_initSlider() {           //选择父元素
               this.slider = new BScroll(this.$refs.slider, {
               	   scrollX: true,
               	   scrollY: false,
               	   //惯性
               	   momentum: false,
               	   //普通的列表滚动不需要配置
               	   snap: true,
               	   //无缝滚动
               	   snapLoop: true,
               	   //用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
               	   snapThreshold: .3,
               	   snapSpeed: 400,

               })
               //控制小圆点
               this.slider.on('scrollEnd', () => {
               	let pageIndex = this.slider.getCurrentPage().pageX
             	  if(this.loop) {
                      pageIndex -= 1
             	  }
             	  this.currentPageIndex = pageIndex
             	  if(this.autoPlay) {
             	  	clearTimeout(this.timer)
             	  	this._play()
             	  }
               })
			},
			_play() {
				let pageIndex = this.currentPageIndex + 1
				if(this.loop) {
					pageIndex += 1
				}
				this.timer = setTimeout(() => {
					//0 y方向, 400 x方向
                   this.slider.goToPage(pageIndex, 0, 400)
				}, this.interval)
			}
		},
		destroyed() {
			clearTimeout(this.timer)
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.slider
		min-height: 1px
		overflow: hidden
		position: relative
		.slider-group
			position: relative
			overflow: hidden
			white-space: nowrap
			.slider-item
				float: left
				box-sizing: border-box
				overflow: hidden
				text-align: center
				a
					display: block
					width: 100%
					overflow: hidden
					text-decoration: none
				img
					display: block
					width: 100%
		.dots
			position: absolute
			right: 0
			left: 0
			bottom: 12px
			text-align: center
			font-size: 0
			.dot
				display: inline-block
				margin: 0 4px
				width: 8px
				height: 8px
				border-radius: 50%
				background: $color-text-l
				&.active
					width: 20px
					border-radius: 5px
					//background: $color-text-ll
					background: red
</style>