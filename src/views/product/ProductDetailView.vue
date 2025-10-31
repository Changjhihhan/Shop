<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import { getImageUrl } from "@/utils";
import { ElMessage } from 'element-plus'

const route = useRoute();

const productsStore = useProductsStore();
const cartStore = useCartStore();

/* variable */
const viewImageIndex = ref<number>(0);
const selectSize = ref<string>("");
const selectColor = ref<string>("");
const selectNum = ref<number>(1);

/* compouted */
const productId = computed(() => route.params.productId as string);
const productInfo = computed(() => productsStore.byProductId(productId.value));
const productSKU = computed(() => {
  if (productInfo.value) {
    return productInfo.value.SKUs.filter((s) => s.status);
  }
  return [];
});
const sizeOptions = computed(() => {
  return [...new Set(productSKU.value.map((p) => p.size))];
});
const colorOptions = computed(() => {
  return [...new Set(productSKU.value.map((p) => p.color))];
});
const imageOptions = computed(() => {
  return [...new Set(productSKU.value.map((p) => p.imageName))];
});
const selectProductInfo = computed(() => {
  if (!selectColor.value) return undefined;
  if (!selectSize.value) return undefined;
  const skuInfo = productSKU.value.find(
    (p) => p.color === selectColor.value && p.size === selectSize.value
  );
  return skuInfo;
});

/* function */
const changeSelectColor = function (color: string) {
  const selectImage =
    productSKU.value.find((s) => s.color === color)?.imageName ?? "";
  viewImageIndex.value = imageOptions.value.findIndex((i) => i === selectImage);
};
const handleAddToCard = async function () {
  if (!selectProductInfo.value) return
  const data = {
    ...selectProductInfo.value,
    buyQty: selectNum.value
  }
  const response = await cartStore.addAndSyncCart(data)
  if (response) {
    ElMessage({
      message: '已新增至購物車',
      type: 'success',
    })
  } else {
    ElMessage({
      message: cartStore.errorMsg || '連線不穩，請再試一次',
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="detail-main">
    <div class="image-block">
      <el-image
        :src="getImageUrl('product', imageOptions[viewImageIndex])"
      ></el-image>
      <div class="image-select">
        <el-image
          v-for="(imageName, imageIndex) in imageOptions"
          :key="imageIndex"
          @click="viewImageIndex = imageIndex"
          :src="getImageUrl('product', imageName)"
          :class="{ 'image-active': imageIndex === viewImageIndex }"
        />
      </div>
    </div>
    <div class="info-block">
      <h1 class="name">{{ productInfo?.name }}</h1>
      <div class="price">NT$ {{ productInfo?.price }}</div>
      <div class="select-ele">
        <label for="size">尺寸</label>
        <el-select v-model="selectSize" name="size">
          <el-option
            v-for="(size, sizeIndex) in sizeOptions"
            :key="sizeIndex"
            :label="size"
            :value="size"
          ></el-option>
        </el-select>
      </div>
      <div class="select-ele">
        <label for="color">顏色</label>
        <el-select
          v-model="selectColor"
          name="color"
          @change="changeSelectColor(selectColor)"
        >
          <el-option
            v-for="(color, colorIndex) in colorOptions"
            :key="colorIndex"
            :label="color"
            :value="color"
          ></el-option>
        </el-select>
      </div>
      <div class="select-ele">
        <label for="num">數量</label>
        <el-input-number
          name="num"
          v-model="selectNum"
          :min="1"
        ></el-input-number>
      </div>
      <div v-if="selectColor && selectSize">
        <el-button v-if="!selectProductInfo">庫存不足</el-button>
        <el-button v-else-if="selectProductInfo?.stock < selectNum">預購</el-button>
        <el-button v-else @click="handleAddToCard">新增至購物車</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-select {
  display: flex;
  justify-content: end;
  .el-image {
    width: 50px;
    margin: 5px;
  }
}
.detail-main {
  display: flex;
  width: 70%;
  margin: 0 auto;
  .image-block,
  .info-block {
    flex: 1;
    margin: 15px;
  }
}
.select-ele {
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  label {
    width: 60px;
  }
}
.image-active {
  outline: 2px solid #666666;
}
</style>
