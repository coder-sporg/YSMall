<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  data () {
    return {};
  },

  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },

  components: {},

  computed: {},

  methods: {}
}
</script>
<style lang='css' scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;

  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}

.recommend-item {
  flex: 1;
}

.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>