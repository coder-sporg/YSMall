<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isTabShow"/>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" 
                   @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from 'common/utils'
import { itemListenerMixin } from "common/mixin.js";

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        "pop": {page: 0, list: []},
        "new": {page: 0, list: []},
        "sell": {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    /**
     * // 1.监听item中图片加载完成   进行防抖操作
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      // 2.对监听的事件进行保存
      this.itemImageListener = () => {
        // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
        // this.$refs.scroll.refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImageListener)
      // 2.获取tabControl的offsetTop(元素的上边框与父元素上边框的绝对距离)
      // 所有的组件都有一个$el: 用于获取组件中的元素
    */
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2. 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
        break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 回到顶部
    backClick() {
      // scrollTo(坐标，回到顶部时间)
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // console.log(position);
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabShow = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    
  }
}
</script>

<style lang='css' scoped>
#home {
  /* padding-top: 44px; */
  /* vh当前屏幕可见高度即视口的高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 浏览器原生滚动，为了让nav不随着滚动 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

/* 方案1 */
/* .content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
} */

/* 方案2 */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}

.tab-control {
  position: relative;
  z-index: 9;
}

</style>
