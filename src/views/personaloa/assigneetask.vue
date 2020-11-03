<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.taskName" :placeholder="$t('task.current')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('process.processDefinitionName')" prop="processDefinitionName" />
      <el-table-column :label="$t('process.processInstanceName')" prop="processInstanceName" />
      <el-table-column :label="$t('task.current')" prop="name" />
      <el-table-column :label="$t('task.startTime')" min-width="100px" prop="startTime">
        <template slot-scope="{row}">
          <span>{{ row.taskLocalVariables.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.endTime')" min-width="100px" prop="endTime">
        <template slot-scope="{row}">
          <span>{{ row.taskLocalVariables.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.description')" prop="taskLocalVariables.description" />
      <el-table-column :label="$t('common.operate')" min-width="160px" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleTrack(row)">
            <svg-icon icon-class="eye-open" />{{ $t('process.track') }}
          </el-button>
          <el-button type="text" @click="handleComplete(row)">
            <i class="el-icon-circle-check" />{{ $t('task.complete') }}
          </el-button>
          <el-button type="text" @click="handleDelegate(row)">
            <svg-icon icon-class="user" />{{ $t('task.delegate') }}
          </el-button>
          <el-button type="text" @click="handleRegress(row)">
            <i class="el-icon-back" />{{ $t('task.regress') }}
          </el-button>
          <el-button type="text" @click="handleReject(row)">
            <i class="el-icon-remove-outline" />{{ $t('task.reject') }}
          </el-button>
          <el-button type="text" @click="handleTerminate(row)">
            <i class="el-icon-circle-close" />{{ $t('task.terminate') }}
          </el-button>
          <router-link :to="{path: '/personaloa/mytaskdetails', query: { processInstanceId: row.processInstanceId, processDefinitionName: row.processDefinitionName, processInstanceName: row.processInstanceName, name: row.name, startTime: row.taskLocalVariables.startTime, endTime: row.taskLocalVariables.endTime, description: row.taskLocalVariables.description } }">
            <el-button type="text" style="margin-left: 10px">
              <i class="el-icon-info" />{{ $t('process.details') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
        <el-form-item v-if="dialogStatus==='complete' || dialogStatus==='delegate'" :label="$t('process.candidate')" prop="candidate">
          <el-select v-model="temp.candidate" :placeholder="$t('common.choose')" clearable style="width: 100%">
            <el-option-group v-for="group in candidateOptions" :key="group.value" :label="group.value">
              <el-option v-for="item in group.children" :key="item.key" :label="item.value" :value="item.key" />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('process.comments')" prop="comment">
          <el-input v-model="temp.comment" type="textarea" :placeholder="$t('common.enter')" maxlength="512" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="startData()">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog fullscreen :visible.sync="trackDialogVisible">
      <div v-html="svgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { queryPersonalTask, queryUsername, getHighLightedProcessDiagram, completeTask, resolveTask, delegateTask, regressTask, rejectTask, terminateTask } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AssigneeTask',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      labelPosition: 'right',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        taskStatus: 'assignee',
        taskName: undefined
      },
      candidateOptions: [],
      temp: {
        id: undefined
      },
      trackDialogVisible: false,
      svgSrc: '',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        complete: this.$t('task.complete'),
        delegate: this.$t('task.delegate'),
        regress: this.$t('task.regress'),
        reject: this.$t('task.reject'),
        terminate: this.$t('task.terminate')
      },
      rules: {
        comment: [{ required: true, validator: this.checkComment, trigger: 'blur' }]
      }
    }
  },
  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryPersonalTask(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
      queryUsername().then(response => {
        this.candidateOptions = response.data
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.taskName = ''
      this.handleFilter()
    },
    handleTrack(row) {
      getHighLightedProcessDiagram(row.processInstanceId).then(response => {
        if (response.message === 'success') {
          this.svgSrc = response.data
          this.trackDialogVisible = true
        } else {
          this.svgSrc = ''
          this.handleWarning(response)
        }
      })
    },
    handleComplete(row) {
      this.handleClearValidateDataForm()
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'complete'
      this.dialogFormVisible = true
    },
    handleDelegate(row) {
      this.handleClearValidateDataForm()
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'delegate'
      this.dialogFormVisible = true
    },
    handleRegress(row) {
      this.handleClearValidateDataForm()
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'regress'
      this.dialogFormVisible = true
    },
    handleReject(row) {
      this.handleClearValidateDataForm()
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'reject'
      this.dialogFormVisible = true
    },
    handleTerminate(row) {
      this.handleClearValidateDataForm()
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'terminate'
      this.dialogFormVisible = true
    },
    handleClearValidateDataForm() {
      this.$nextTick(() => {
        if (this.$refs['dataForm']) {
          this.$refs['dataForm'].clearValidate()
        }
      })
    },
    startData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'complete' && (this.temp.delegationState === null || this.temp.delegationState === 'RESOLVED')) {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.candidate = this.temp.candidate
            tempData.comment = this.temp.comment
            completeTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$message({
                  message: this.$t('task.complete-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'complete' && this.temp.delegationState === 'PENDING') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            resolveTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$message({
                  message: this.$t('task.handle-delegate-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'delegate') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.assignee = this.temp.candidate
            tempData.comment = this.temp.comment
            delegateTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$message({
                  message: this.$t('task.delegate-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'regress') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            regressTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$message({
                  message: this.$t('task.regress-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'reject') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            rejectTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$message({
                  message: this.$t('task.reject-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'terminate') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            terminateTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$message({
                  message: this.$t('task.terminate-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          }
        }
      })
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
    },
    checkComment(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('task.taskComment-required')))
      } else {
        callback()
      }
    }
  }
}
</script>
