<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">个人中心</div>
    </nav-bar>
    <user-info/>
    <account-info/>
    <list-view :list-data="orderList"/>
    <list-view :list-data="serviceList"/>
  </div>
</template>

<script>
import UserInfo from './childComps/UserInfo'
import AccountInfo from './childComps/AccountInfo'
import ListView from './childComps/ListView'

import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Profile',
  data () {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" },
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" },
      ],
    }
  },

  components: {
    UserInfo,
    AccountInfo,
    ListView,
    NavBar
  }
}
</script>
<style lang='css' scoped>
#profile {
  background-color: #f2f2f2;
}
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>