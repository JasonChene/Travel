<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.studentId" placeholder="学号" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" /> -->
      <el-input v-model="listQuery.studentName" placeholder="姓名" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
      <el-button
        type="primary"
        class="filter-item"
        icon="el-icon-plus"
        @click="handleCreate">
        {{ $t("common.add") }}
      </el-button>
      <el-button type="primary" class="filter-item">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        导入
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        {{ $t('common.export') }}
      </el-button>
      <el-button
        type="danger"
        plain
        icon="el-icon-delete"
        class="filter-item"
        @click="handleDelete">
        {{ $t("common.delete") }}
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="学号" prop="studentId" width="70px" />
      <el-table-column label="姓名" prop="studentName" width="70px" />
      <el-table-column label="性别" prop="studentSex" width="50px" />
      <el-table-column
        label="院系"
        prop="studentCollege"
        sortable="custom"
        min-width="120px"/>
      <el-table-column label="专业年级" prop="studentMajor" width="180" />
      <el-table-column label="手机号" prop="studentContact" width="180" />
      <el-table-column
        label="邮箱"
        prop="studentEmail"
        sortable="custom"
        min-width="180"/>
      <el-table-column label="实验室" prop="libName" width="70px" />
      
      <el-table-column :label="$t('common.operate')" width="400px">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="small"
            @click="handleUpdate(row)">
            {{ $t("common.edit") }}
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="handleDelete(row, $index)">
            {{ $t("common.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.currentPage"
      style="text-align: center"
      :limit.sync="listQuery.pageSize"
      @pagination="getPage"/>

    <el-dialog :title="textMap[dialogStatus]" 
    :visible.sync="dialogFormVisible"
    style="width: 70%; margin:auto">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        :label-position="labelPosition"
        label-width="90px"
        style="width: 100%">
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="temp.studentId" :placeholder="$t('common.enter')"
            :disabled="dialogStatus==='update'" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input v-model="temp.studentName" style="width: 300px" />
        </el-form-item>
        <el-form-item label="性别" prop="studentSex">
          <el-select
            v-model="temp.studentSex"
            placeholder="请选择"
            style="width: 300px">
            <el-option
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系" prop="studentCollege">
          <el-input v-model="temp.studentCollege" style="width: 300px" />
        </el-form-item>
        <el-form-item label="专业年级" prop="studentMajor">
          <el-input v-model="temp.studentMajor" style="width: 300px" />
        </el-form-item>
        <el-form-item label="手机号" prop="studentContact">
          <el-input v-model="temp.studentContact" style="width: 300px" />
        </el-form-item>
        <el-form-item label="邮箱" prop="studentEmail">
          <el-input v-model="temp.studentEmail" style="width: 300px" />
        </el-form-item>
        <el-form-item label="实验室" prop="libId">
          <el-input v-model="temp.libId" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t("common.cancel") }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()">
          {{ $t("common.confirm") }}
        </el-button>
      </div>
    </el-dialog>
    
  </div>
</template>
<script>
import {
  querySysUser,
  addSysUser,
  updateSysUser,
  queryRoleName,
  querySysOrgTree,
  deleteSysUser,
  exportSysUser,
} from "@/api/admin";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import qs from "qs";
import { saveAs } from "file-saver";
import {
  findAllStudent,
  addStudentInfo,
  findStudentByCondition,
  updateStudentInfo,
  deleteStudent,
} from "@/api/student";

export default {
  name: "SysUser",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      value1: "",
      value2: "",
      tableKey: 0,
      labelPosition: "right",
      list: [],
      dialogVisible: false,
      updatelogVisible: false,
      optionsSex: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      valueSex: "",
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        studentId: undefined,
        studentName: undefined,
        username: undefined,
        status: undefined,
        sorter: "createTime_descend",
      },
      roleIdOptions: [],
      orgIdOptions: [],
      orgName: "",
      statusOptions: [
        { key: "1", display_name: this.$t("common.able") },
        { key: "0", display_name: this.$t("common.disable") },
      ],
      temp: {},
      multipleSelection: [],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: this.$t("common.edit"),
        create: this.$t("common.add"),
      },
      rules: {
        studentId: [{ required: true, validator: this.checkStudentId, trigger: ['blur', 'change'] }],
        studentName: [{ required: true, validator: this.checkStudentName, trigger: ['blur', 'change'] }],
        studentSex: [{ required: true, validator: this.checkStudentSex, trigger: ['blur', 'change'] }],
        studentCollege: [{ required: true, validator: this.checkStudentCollege, trigger: ['blur', 'change'] }],
        studentMajor: [{ required: true, validator: this.checkStudentMajor, trigger: ['blur', 'change'] }],
        studentContact: [{ required: true, validator: this.checkStudentContact, trigger: ['blur', 'change'] }],
        studentEmail: [{ required: true, validator: this.checkStudentEmail, trigger: ['blur', 'change'] }],
        // libId: [{ required: true, validator: this.checkLibId, trigger: ['blur', 'change'] }],
      },
      downloadLoading: false,
    };
  },
  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = "top";
    }
    this.getPage();
  },
  methods: {
    getList() {
      this.listLoading = true;
      findAllStudent().then((response) => {
        this.list = response.data;
        // this.total = response.data.pagination.total;
        this.total = response.data.length
        this.listLoading = false;
      });
    },
    getPage() {
      findStudentByCondition(this.listQuery).then((response) => {
        this.list = response.data.list;
        this.total = response.data.pagination.total;
        this.listLoading = false;
        console.log(this.total);
      });
    },
    
    handleFilter() {
      this.listQuery.currentPage = 1;
      this.getPage();
    },
    handleReset() {
      this.listQuery.studentId = ''
      this.listQuery.studentName = ''
      this.handleFilter();
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "createTime") {
        this.sortByCreateTime(order);
      }
    },
    sortByCreateTime(order) {
      if (order === "ascending") {
        this.listQuery.sorter = "createTime_ascend";
      } else {
        this.listQuery.sorter = "createTime_descend";
      }
      this.handleFilter();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    resetTemp() {
      this.temp = {};
    },
    handleCreate() {
      this.resetTemp();
      this.orgName = "";
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      console.log(this.temp);
      addStudentInfo(this.temp).then((response) => {
        if (response.message === "success") {
          this.list.unshift(this.temp);
          this.dialogFormVisible = false;
          this.$message({
            message: this.$t("common.add-success"),
            type: "success",
            duration: 2000,
          });
          this.handleReset();
        } else {
          this.handleWarning(response);
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      console.log(this.temp);
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
      if (valid) {
        const tempData = {};
        tempData.studentId = this.temp.studentId;
        tempData.studentName = this.temp.studentName;
        tempData.studentSex = this.temp.studentSex;
        tempData.studentCollege = this.temp.studentCollege;
        tempData.studentMajor = this.temp.studentMajor;
        tempData.studentContact = this.temp.studentContact;
        tempData.studentEmail = this.temp.studentEmail;
        tempData.libId = this.temp.libId;
        console.log(tempData);
        updateStudentInfo(tempData).then((response) => {
          if (response.message === "success") {
            this.dialogFormVisible = false;
            this.$message({
              message: this.$t("common.edit-success"),
              type: "success",
              duration: 2000,
            });
            this.handleReset();
          } else {
            this.handleWarning(response);
          }
        });
      }
      })
    },
    handleDelete(row, index) {
      if (row.studentId) {
        this.delete(row.studentId);
      } else {
        if (this.multipleSelection.length === 0) {
          this.handleWarning(this.$t("common.choose-delete"));
          return;
        }
        this.$confirm(
          this.$t("common.confirm-batch-delete"),
          this.$t("common.batch-delete"),
          {
            confirmButtonText: this.$t("common.confirm"),
            cancelButtonText: this.$t("common.cancel"),
            type: "warning",
          }
        )
          .then(() => {
            this.delete(
              this.multipleSelection
                .map((item) => {
                  return item.studentId;
                })
                .join(",")
            );
          })
          .catch(() => {});
      }
    },
    delete(deleteArray) {
      deleteStudent(deleteArray).then((response) => {
        if (response.message === "success") {
          this.$message({
            message: this.$t("common.delete-success"),
            type: "success",
            duration: 2000,
          });
          this.handleReset();
        } else {
          this.handleWarning(response);
        }
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      const listQueryData = {};
      listQueryData.studentId = this.listQuery.studentId;
      listQueryData.studentName = this.listQuery.studentName;
      exportSysUser(qs.stringify(listQueryData)).then((response) => {
        saveAs(response, this.$t("route.sysuser") + ".xlsx");
      });
      this.downloadLoading = false;
    },
    getSortClass: function (key) {
      const sorter = this.listQuery.sorter;
      return sorter === `${key}_ascend` ? "ascending" : "descending";
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: "warning",
        duration: 2000,
      });
    },
    
    validateOrgId() {
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate("orgId");
      });
    },
    handleNodeClickOrgId(data) {
      this.orgName = data.title;
      this.temp.orgId = data.id;
      this.$refs.selectOrgId.blur();
      this.validateOrgId();
    },
    handleClearOrgId() {
      this.orgName = "";
      this.temp.orgId = "";
    },
    checkStudentId(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入学生的学号！'))
        } else {
          callback()
        }
    },
    checkStudentName(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入学生的学号！'))
        } else {
          callback()
        }
    },
    checkStudentSex(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入学生的性别！'))
        } else {
          callback()
        }
    },
    checkStudentCollege(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入所属院系！'))
        } else {
          callback()
        }
    },
    checkStudentMajor(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入所属的专业年级！'))
        } else {
          callback()
        }
    },
    checkStudentContact(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入联系方式！'))
        } else {
          callback()
        }
    },
    checkStudentEmail(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入邮箱地址！'))
        } else {
          callback()
        }
    },
    checkLibId(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入所属实验室的编号！'))
        } else {
          callback()
        }
    },
  },
};
</script>
<style>