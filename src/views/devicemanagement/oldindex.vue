<template>
  <div class="device-container">
    <div class="device-container-right">
      <el-row>
        <el-col :span=6 v-for="(item, index) in list" :key="index" class="device-box-col">
          <el-card :body-style="{ padding: '0px' }" class="device-box-card">
            <div @click="handlerUrl(item.path)">
              <div class="device-image_view">
                <!-- <img :src="'../../assets/'+item.iconname" class="device-image" /> -->
                <img v-if="item.id == 1" src="../../assets/icon_2023_02_14_7.png" class="device-image" />
                <img v-if="item.id == 2" src="../../assets/icon_2023_02_14_5.png" class="device-image" />
                <img v-if="item.id == 3" src="../../assets/icon_2023_02_14_6.png" class="device-image" />
                <img v-if="item.id == 4" src="../../assets/icon_2023_02_14_9.png" class="device-image" />
                <img v-if="item.id == 5" src="../../assets/icon_2023_02_14_8.png" class="device-image" />
              </div>
              <div class="device-view">
                <span>{{item.name}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: "电子耳环", path: "/example/index", iconname:'icon_2023_02_14_7.png'},
        { id: 2, name: "物资臭氧消毒监测工作站", path: "/ozonemodule/index", iconname:'icon_2023_02_14_5.png'},
        { id: 3, name: "淋浴一体机", path: "/disinfection/index", iconname:'icon_2023_02_14_6.png'},
        { id: 4, name: "小动物监控工作站", path: "/animalmonitor/index", iconname:'icon_2023_02_14_9.png'},
        { id: 5, name: "门禁系统管理", path: "/accesscontrol/index", iconname:'icon_2023_02_14_8.png'},
      ]
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    handlerUrl(path){
      this.$router.replace({ path: path })
    }
  },
};
</script>

<style scoped>
.el-tabs__item {
  font-size: 18px !important;
}

.device-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.device-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}

.device-container-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.device-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.device-box-col {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.device-box-card {
  width: 260px;
}

.device-image_view {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.device-image {
  width: 100px;
  height: 100px;
  display: block;
}

.device-view{
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>