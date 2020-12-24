<template>
  <div class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :product="item"/>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import { mapGetters } from "vuex";

export default {
  name: 'CartList',
  data () {
    return {};
  },

  components: {
    CartListItem
  },

  computed: {
    ...mapGetters(['cartList'])
  },

  methods: {}
}
</script>
<style lang='css' scoped>

</style>