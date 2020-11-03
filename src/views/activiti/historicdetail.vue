<template>
  <div class="app-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
      {{ $t('common.return') }}
    </el-button>
    <el-divider />
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('process.activityId')" prop="id" />
      <el-table-column :label="$t('process.processInstanceId')" prop="processInstanceId" />
      <el-table-column :label="$t('process.executionId')" prop="executionId" />
      <el-table-column :label="$t('task.id')" prop="taskId" />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { queryHistoricDetail } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HistoricDetail',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  activated() {
    const processInstanceId = this.$route.query && this.$route.query.processInstanceId
    this.listQuery.processInstanceId = processInstanceId
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryHistoricDetail(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/activiti/historicprocessinstance' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none!important;
  }
</style>
