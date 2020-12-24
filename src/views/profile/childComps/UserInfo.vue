<template>
  <div class="user-info">
    <div class="avatar">
      <img src="~assets/img/profile/avatar.svg"/>
    </div>
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="more">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #ff8198;
  color: #fff;
}
.avatar img {
  width: 70px;
  height: 70px;
}
.info {
  flex: 1;
  padding-left: 15px;
}
.info .phone {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}

.info img {
  width: 20px;
  height: 30px;
  vertical-align: middle;
  margin-left: -5px;
}

.more img {
  width: 20px;
}
</style>