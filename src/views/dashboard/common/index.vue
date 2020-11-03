<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <div>
        MSCode微服务平台为响应式布局，针对不同屏幕大小设计，适配电脑、平板和手机。
      </div>
      <br>
      <div>
        MSCode微服务平台使用阿里巴巴Sentinel进行流量控制，并发量大时表格若没数据刷新即可。
      </div>
      <br>
      <div>
        <a href="https://www.mscodecloud.com" target="_blank">MSCode微服务平台官网介绍</a><font color="blue">，请联系QQ：3228979148，或第六QQ群：367346704或微信电话：15011899123提需求，我公司免费快速新增升级！</font>
      </div>
      <br>
      <div>MSCode微服务平台架构图</div>
      <img :src="architecturePng" class="architecturePng">
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonEditor',
  data() {
    return {
      architecturePng: 'https://www.mscodecloud.com/static/mscode-architecture.png'
    }
  }
}
</script>

<style lang="scss" scoped>
  .architecturePng {
    max-width: 100%;
  }

  .dashboard-container {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    min-height: 100vh;
    padding: 16px;
    text-align: center;
  }

  .dashboard-editor-container {
    background-color: white;
    padding: 20px;
    display: inline-block;
    text-align: left;
  }

  a {
    color: #1890FF;
  }

  a:hover {
    color: #40a9ff;
  }
</style>
