<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="select-all" :is-checked="isSelectAll" @click.native = 'BtnClick'/>
      <span>全选</span>
    </div>
    <div class="total-price">合计：¥{{totalPrice}}</div>
    <div class="buy-product" @click="toPay">去结算 ({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from "vuex";

export default {
  name: 'CartBottomBar',
  data () {
    return {};
  },

  components: {
    CheckButton
  },

  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(product => {
        return product.checked
      }).reduce((pre, product) => {
        return pre + product.price * product.count
      }, 0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(product => {
        return product.checked
      }).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      //循环数组,查找里面的checked,如果找到一个,马上返回false,全选按钮高亮消失
      //如果循环完整个数组也没有发现checked为false,则返回true,全选按钮高亮显示

      if(this.cartList.length === 0) {
          return false;
      }
      return !this.cartList.find(item => !item.checked)
    }
  },

  methods: {
    BtnClick() {
      // if(this.isSelectAll) {
      //   //如果上面全部选中了,则点击一下,取消全选
      //   //循环数组,修改item.checked的值为false
      //   this.cartList.forEach(item => item.checked = false)
      // }else {
      //   //原来全部都是不选中或者部分选中,则点击变为全选
      //   //循环数组,修改item.checked的值为ture
      //   this.cartList.forEach(item => item.checked = true)
      // }

      this.isSelectAll ? this.cartList.forEach(item => item.checked = false) : this.cartList.forEach(item => item.checked = true)
    },
    toPay() {
      // this.cartList === 0 ? this.$toast.show('请添加商品') : this.$toast.show(`请支付${this.totalPrice}元`)
      if(this.cartList.length=== 0) {
        this.$toast.show('请添加商品',1500);
      }else{
        this.$toast.show(`请支付${this.totalPrice}元`)
      }
    }
  }
}
</script>
<style lang='css' scoped>
.bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
  display: flex;
}
.check-content {
  width: 90px;
}
.select-all {
  line-height: 0;
  position: absolute;
  left: 12px;
  top: 13px;
}
.total-price {
  flex: 1;
}
.buy-product {
  width: 60px;
  background-color: orangered;
  color: #fff;
  width: 100px;
  text-align: center;
}
</style>