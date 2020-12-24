import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    // 1.监听item中图片加载完成   进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    // 2.对监听的事件进行保存
    this.itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 函数不能与组件内部的函数合并
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}
