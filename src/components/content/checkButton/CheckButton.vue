<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  data () {
    return {};
  },

  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },

  components: {},

  computed: {},

  methods: {}
}
</script>
<style lang='css' scoped>
.check-button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
}
.check-button img {
  width: 100%;
  height: 100%;
}
.check {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>