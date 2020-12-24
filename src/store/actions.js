import { 
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  // addCart(context, payload) {
  //   // payload添加的商品
  //   // oldProduct = null
  //   // state.cartList.push(payload)
  //   // for(let item of state.cartList) {
  //   //   if(item.iid = payload.iid) {
  //   //     oldProduct = item
  //   //   }
  //   // }

  //   // 1.查找新添加的商品是否存在
  //   let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

  //   // 2.判断oldProduct
  //   if (oldProduct) {
  //     // oldProduct.count += 1
  //     context.commit('addCounter', oldProduct)
  //   } else {
  //     payload.count = 1
  //     // context.state.cartList.push(payload)
  //     context.commit('addToCart', payload)
  //   }
  // }

  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找新添加的商品是否存在
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if (oldProduct) { // 数量+1
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {  // 添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}