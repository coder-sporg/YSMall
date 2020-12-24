<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 属性：topImages 传入值：top-images -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <detail-bottom-bar @addCart="addToCart"/>

    <!-- <toast :message="message" :isShow="isShow"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from 'common/mixin'

import { mapActions } from "vuex";

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTop: [],
      currentIndex: 0,
      // message: '',
      // isShow: false,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],

  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.请求详情的数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      // 获取轮播图数据
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取评论信息
      this.commentInfo = data.rate.list ? data.rate.list[0] : {} 

      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM已经被渲染出来
        // 但是图片没有加载完(此处获取的offsetTop不包含其中的图片)
        // 值不对都是因为图片的问题
        // this.themeTop = []
        // this.themeTop.push(0)
        // this.themeTop.push(this.$refs.params.$el.offsetTop)
        // this.themeTop.push(this.$refs.comment.$el.offsetTop)
        // this.themeTop.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTop);
      })

    })
    // 3.请求推荐的信息
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    }) 
  },

  mounted() {},

  updated() {},

  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },

  computed: {},

  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTop.push(0)
      this.themeTop.push(this.$refs.params.$el.offsetTop)
      this.themeTop.push(this.$refs.comment.$el.offsetTop)
      this.themeTop.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTop);
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTop[index], 400)
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y
      // positionY和themeTop中的值比较
      const length = this.themeTop.length
      for(let i in this.themeTop) {
        // 此处的i是字符串
        i = parseInt(i)
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTop[i] && positionY < this.themeTop[i + 1]) || (i === length - 1 && positionY >= this.themeTop[i]))) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }

      // 回到顶部的判断
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      // 1.获取购物车需要显示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      // 必须传入的值
      product.iid = this.iid
      // 2.将商品传入购物车
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })

      this.addCart(product).then(res => {
        // console.log(res);
        // this.isShow = true
        // this.message = res

        // setTimeout(() => {
        //   this.isShow = false
        //   this.message = ''
        // }, 1500);

        this.$toast.show(res, 1500)
      })
    }
  }
}
</script>
<style lang='css' scoped>

#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  /* height: calc(100% - 44px);
  background-color: #fff;
  overflow: hidden; */
  /* 计算offsetTop父级要进行定位 */
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
  background-color: #fff;
}
</style>