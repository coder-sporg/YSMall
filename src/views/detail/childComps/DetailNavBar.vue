<template>
  <nav-bar>
    <div slot="left" @click="backClick" class="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item"
           v-for="(item, index) in titles" 
           :key="item"
           :class="{active: index === currentIndex}"
           @click="titleClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: 'DetailNavBar',
  data () {
    return {
      titles: ['商品', '参数', '评价', '推荐'],
      currentIndex: 0
    };
  },

  components: {
    NavBar
  },

  computed: {},

  methods: {
    backClick() {
      this.$router.go(-1)
    },
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    }
  }
}
</script>
<style lang='css' scoped>
.back img {
  margin-top: 15px;
  width: 18px;
}
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1
}
.active {
  color: var(--color-high-text);
}
</style>