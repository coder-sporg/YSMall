<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.id" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  data () {
    return {};
  },
  props: {
    goods: {
      type: Array,
      defult() {
        return []
      }
    }
  },

  components: {
    GoodsListItem
  },

  computed: {},

  methods: {}
}
</script>
<style lang='css' scoped>
.goods {
  display: flex;
  /* 允许换行 */
  flex-wrap: wrap;
  /* 子元素均等分 */
  /* justify-content: space-evenly; */
  justify-content: space-around;
  padding: 2px;
}
</style>