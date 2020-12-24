<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// mapGetters辅助函数-将store中的getter映射到局部计算属性
import { mapGetters } from "vuex";

export default {
  name: 'Cart',
  data () {
    return {};
  },

  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },

  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }

    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  },

  methods: {}
}
</script>
<style lang='css' scoped>
#cart {
  height: 100vh;
  position: relative;
  background-color: #fff;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  height: calc(100% - 44px - 49px - 44px);
  overflow: hidden;
}
</style>