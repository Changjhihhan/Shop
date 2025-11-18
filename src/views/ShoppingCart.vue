<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';

import { getImageUrl } from "@/utils";

import { Delete } from "@element-plus/icons-vue";

const productStore = useProductsStore();
const cartStore = useCartStore();

const { cartsDataList } = storeToRefs(cartStore);

const cartInfoList = computed(() => {
  return cartsDataList.value.map((cart) => {
    return {...productStore.byProductId(cart.productId), ...cart}
  })
})
const priceTotal = computed(() =>
  cartInfoList.value.reduce((tot, record) => tot + (record.activityPrice || record.price || 0) * record.buyQty, 0)
)

</script>

<template>
  <div class="wrap">
    <div class="product-item-block">
      <h3>我的購物車</h3>
      <div class="item" v-for="(cart, cartIndex) in cartInfoList" :key="cart.SKUid">
        <div class="item-img">
          <el-image
            :src="getImageUrl('product', cart.imageName)"
          ></el-image>
        </div>
        <div class="item-info">
          <div class="flex-top">
            <ul>
              <li>{{ cart.productName }}</li>
              <li>
                尺寸 {{ cart.size }}
              </li>
              <li>
                顏色 {{ cart.color }}
              </li>
            </ul>
            <div class="delete-item">
              <el-icon style="vertical-align: middle">
                <Delete />
              </el-icon>
            </div>
          </div>
          <div class="flex-bottom">
            <div class="price key-price">
              <span :class="{'cancel-line': cart?.activityPrice}">$ {{ cart.price }}</span>
              <span v-show="cart.activityPrice">$ {{ cart.activityPrice }}</span>
            </div>
            <div class="buy-qty">
              <div class="stock">剩餘 {{ cart.stock }} 件</div>
              <el-input-number v-model="cartsDataList[cartIndex].buyQty" :min="1" :max="cart.stock" style="width: 100%" size="small"></el-input-number>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="subtotal-block">
      <h3>小計明細</h3>
      <ul class="subtotal-item">
        <li>
          <div>商品金額</div>
          <div>NT$ {{priceTotal}}</div>
        </li>
        <!-- <li>
          <div>優惠碼</div>
          <el-input size="small" style="width: 10rem;" placeholder="請輸入優惠碼"></el-input>
        </li> -->
        <el-divider />
        <li>
          <div>小計</div>
          <div class="key-price">NT$ {{priceTotal}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  display: flex;
  margin: 20px auto;
  width: 80%;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    margin: 0 auto;
  }
  .product-item-block {
    flex: 2;
    margin: 10px;
  }
  .subtotal-block {
    flex: 1;
    margin: 10px;
  }
}
.item {
  position: relative;
  display: flex;
  >div {
    padding: 5px;
  }
  .item-img {
    flex-basis: 120px;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: auto;
    .flex-top {
      display: flex;
      justify-content: space-between;
      ul {
        list-style: none;
        padding-left: 0;
        >:nth-child(1) {
          font-size: 1.1rem;
          font-weight: bold;
        }
      }
    }
    .flex-bottom {
      display: flex;
      justify-content: space-between;
      .buy-qty {
        position: relative;
        .stock {
          position: absolute;
          content: "";
          top: 0;
          transform: translate(-50%, -100%);
          left: 50%;
          font-size: 0.8rem;
          white-space: nowrap;
        }
      }
    }
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #000;
  }
}
.cancel-line {
  text-decoration: line-through;
  font-size: 0.9rem;
  color: #00000074;
}
.subtotal-item {
  padding-left: 0;
  li {
    display: flex;
    list-style: none;
    justify-content: space-between;
  }
}
.key-price {
  font-size: 1.1rem;
  color: rgb(127, 0, 25);
}
</style>
