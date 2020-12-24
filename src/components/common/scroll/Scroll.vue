<template>
  <div class="wrapper" ref="wrapper">
    <!-- 插槽会替换放在此处的元素 应该再加一个content -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll, { PullUpLoad } from 'better-scroll'

export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    };
  },

  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      probeType: Boolean,
      default: false
    }
  },

  mounted() {
    // 1.创建BScroll对象
    // ref获取唯一的dom元素-->获取wrapper的div
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 监测实时位置
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
    }
    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    } 
    // console.log(this,scroll);
  },

  components: {},

  computed: {},

  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>
<style lang='css' scoped>

</style>