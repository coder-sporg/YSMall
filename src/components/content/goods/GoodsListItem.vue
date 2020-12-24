<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="goodsItem.img || goodsItem.image || goodsItem.show.img" 
         alt="" 
         @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  data () {
    return {};
  },

  props: {
    goodsItem: {
      type: Object,
      defult() {
        return {}
      }
    }
  },

  computed: {
    showImage() {
      // return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },

  components: {},

  computed: {},

  methods: {
    // 1.正常发射事件,在离开首页或者详情页的时候取消事件绑定
    imageLoad() { 
      this.$bus.$emit('itemImageLoad')
    },
    // 2.通过路由判断,发射不同的事件
    // imageLoad() { 
    //   if(this.$route.path.indexOf('/home')) {
    //     this.$bus.$emit('HomeImgLoad')
    //   } else if(this.$route.path.indexOf('/detail')) {
    //     this.$bus.$emit('DetailImageLoad')
    //   }
    // },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>
<style lang='css' scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  text-align: center;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  /* 段落中的文本不换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-tint);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  /* top: 0px; */
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>