(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a2e0f"],{"0092":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-input filter-item",attrs:{placeholder:"系统角色名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}}}),a("el-button",{staticClass:"filter-item",attrs:{type:"primary"}},[e._v(" 查询 ")]),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-refresh-right"}},[e._v(" 重置 ")]),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.dialogVisible=!0}}},[e._v(" 新增 ")]),a("el-button",{staticClass:"filter-item",attrs:{type:"primary"}},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"excel"}}),e._v(" 导入 ")],1),a("el-button",{staticClass:"filter-item",attrs:{type:"primary"}},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"excel"}}),e._v(" 导出 ")],1),a("el-button",{staticClass:"filter-item",attrs:{type:"danger",plain:"",icon:"el-icon-delete"},on:{click:e.delete1}},[e._v(" 删除 ")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.tableSys,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"50"}}),a("el-table-column",{attrs:{label:"用户名",prop:"userName",sortable:"custom"}}),a("el-table-column",{attrs:{label:"所属角色",prop:"userType",width:"200"}}),a("el-table-column",{attrs:{label:"状态",prop:"userParam",sortable:"custom"}}),a("el-table-column",{attrs:{label:"所属单位",prop:"userWork",width:"300"}}),a("el-table-column",{attrs:{label:"操作",width:"300px"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-zoom-in",size:"small"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-edit",size:"small"},on:{click:function(t){e.updatelogVisible=!0}}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:e.delete2}})],1)],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.currentPage,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"currentPage",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),a("el-dialog",{attrs:{title:"增加角色",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{model:e.editForm,"label-width":"70px",rules:e.rules}},[a("el-form-item",{attrs:{label:"用户名",prop:"title"}},[a("el-input",{staticStyle:{width:"205px"},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),a("el-form-item",{attrs:{label:"所属角色",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}},e._l(e.option1s,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"状态",prop:"sex"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"所属单位",prop:"tutor"}},[a("el-input",{model:{value:e.editForm.tutor,callback:function(t){e.$set(e.editForm,"tutor",t)},expression:"editForm.tutor"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改角色",visible:e.updatelogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.updatelogVisible=t}}},[a("el-form",{attrs:{model:e.editForm1,"label-width":"70px",rules:e.rules}},[a("el-form-item",{attrs:{label:"用户名",prop:"title"}},[a("el-input",{staticStyle:{width:"300px"},model:{value:e.editForm1.name,callback:function(t){e.$set(e.editForm1,"name",t)},expression:"editForm1.name"}})],1),a("el-form-item",{attrs:{label:"所属角色",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}},e._l(e.option1s,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"状态",prop:"sex"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"所属单位",prop:"tutor"}},[a("el-input",{model:{value:e.editForm1.tutor,callback:function(t){e.$set(e.editForm1,"tutor",t)},expression:"editForm1.tutor"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updatelogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updatelogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},s=[],r=(a("a15b"),a("d81d"),a("ade3")),l=a("50fc"),n=a("6724"),o=a("333d"),u=a("4328"),c=a.n(u),d=a("21a6"),m={name:"SysUser",components:{Pagination:o["a"]},directives:{waves:n["a"]},filters:{statusFilter:function(e){var t={1:"success",0:"danger"};return t[e]}},data:function(){var e;return e={value1:"",tableKey:0,labelPosition:"right",list:[],dialogVisible:!1,updatelogVisible:!1,options:[{value:"正常",label:"正常"},{value:"禁用",label:"禁用"}],option1s:[{value:"普通角色",label:"普通角色"},{value:"指导老师",label:"指导老师"},{value:"admin",label:"admin"}]},Object(r["a"])(e,"value1",""),Object(r["a"])(e,"value",""),Object(r["a"])(e,"tableSys",[{userName:"罗健",userType:"普通角色",userParam:"正常",userWork:"体育学院（体育工作委员会）"},{userName:"杨倩",userType:"指导老师",userParam:"禁用",userWork:"石油与天然气工程学院"},{userName:"杨帆",userType:"admin",userParam:"正常",userWork:"体育学院（体育工作委员会）"},{userName:"田华",userType:"普通角色",userParam:"正常",userWork:"土木工程与建筑学院"},{userName:"李国军",userType:"普通角色",userParam:"正常",userWork:"石油与天然气工程学院"},{userName:"关岩",userType:"admin",userParam:"禁用",userWork:"石油与天然气工程学院"},{userName:"李文静",userType:"admin",userParam:"正常",userWork:"计算机科学学院"},{userName:"刘云波",userType:"指导老师",userParam:"正常",userWork:"石油与天然气工程学院"},{userName:"杨雪松",userType:"普通角色",userParam:"禁用",userWork:"体育学院（体育工作委员会）"},{userName:"李欣然",userType:"admin",userParam:"正常",userWork:"石油与天然气工程学院"}]),Object(r["a"])(e,"editForm",{name:"",type:"",sex:"",tutor:"",comp:"",tele:"",time:""}),Object(r["a"])(e,"editForm1",{name:"",type:"",sex:"",tutor:"",comp:"",tele:"",time:""}),Object(r["a"])(e,"total",0),Object(r["a"])(e,"listLoading",!0),Object(r["a"])(e,"listQuery",{currentPage:1,pageSize:10,username:void 0,status:void 0,sorter:"createTime_descend"}),Object(r["a"])(e,"roleIdOptions",[]),Object(r["a"])(e,"orgIdOptions",[]),Object(r["a"])(e,"orgName",""),Object(r["a"])(e,"statusOptions",[{key:"1",display_name:this.$t("common.able")},{key:"0",display_name:this.$t("common.disable")}]),Object(r["a"])(e,"temp",{id:void 0,status:1,prefix:"86"}),Object(r["a"])(e,"multipleSelection",[]),Object(r["a"])(e,"dialogFormVisible",!1),Object(r["a"])(e,"dialogStatus",""),Object(r["a"])(e,"textMap",{update:this.$t("common.edit"),create:this.$t("common.add")}),Object(r["a"])(e,"rules",{username:[{required:!0,validator:this.checkUsername,trigger:["blur","change"]}],password:[{required:!0,validator:this.checkPassword,trigger:["blur","change"]}],email:[{required:!0,type:"email",validator:this.checkEmail,trigger:["blur","change"]}],mobile:[{required:!0,validator:this.checkMobile,trigger:["blur","change"]}],roleId:[{required:!0,validator:this.checkRoleId,trigger:"change"}],orgId:[{required:!0,validator:this.checkOrgId,trigger:"change"}],status:[{required:!0}]}),Object(r["a"])(e,"downloadLoading",!1),e},created:function(){window.innerWidth<700&&(this.labelPosition="top"),this.getList()},methods:{delete1:function(){var e=this;this.$confirm("此操作将批量删除选中的系统用户信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"删除成功!"})})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},delete2:function(){var e=this;this.$confirm("此操作将永久删除该系统用户信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"删除成功!"})})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},getList:function(){var e=this;this.listLoading=!0,Object(l["m"])(this.listQuery).then((function(t){e.list=t.data.list,e.total=t.data.pagination.total,e.listLoading=!1})),Object(l["i"])().then((function(t){e.roleIdOptions=t.data})),Object(l["l"])().then((function(t){e.orgIdOptions=t.data.list}))},handleFilter:function(){this.listQuery.currentPage=1,this.getList()},handleReset:function(){this.listQuery.username="",this.listQuery.status="",this.handleFilter()},sortChange:function(e){var t=e.prop,a=e.order;"createTime"===t&&this.sortByCreateTime(a)},sortByCreateTime:function(e){this.listQuery.sorter="ascending"===e?"createTime_ascend":"createTime_descend",this.handleFilter()},handleSelectionChange:function(e){this.multipleSelection=e},resetTemp:function(){this.temp={id:void 0,status:1,prefix:"86"}},handleCreate:function(){var e=this;this.resetTemp(),this.orgName="",this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},createData:function(){var e=this;this.$refs.selectOrgId.value&&this.validateOrgId(),this.$refs["dataForm"].validate((function(t){t&&Object(l["a"])(e.temp).then((function(t){"success"===t.message?(e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$message({message:e.$t("common.add-success"),type:"success",duration:2e3}),e.handleReset()):e.handleWarning(t)}))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.orgName=this.temp.orgIdCn,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs.selectOrgId.value&&this.validateOrgId(),this.$refs["dataForm"].validate((function(t){if(t){var a={};a.id=e.temp.id,a.username=e.temp.username,a.email=e.temp.email,a.mobile=e.temp.mobile,a.prefix=e.temp.prefix,a.roleId=e.temp.roleId,a.orgId=e.temp.orgId,a.status=e.temp.status,Object(l["n"])(a).then((function(t){"success"===t.message?(e.dialogFormVisible=!1,e.$message({message:e.$t("common.edit-success"),type:"success",duration:2e3}),e.handleReset()):e.handleWarning(t)}))}}))},handleDelete:function(e,t){var a=this;if(e.id)this.delete(e.id);else{if(0===this.multipleSelection.length)return void this.handleWarning(this.$t("common.choose-delete"));this.$confirm(this.$t("common.confirm-batch-delete"),this.$t("common.batch-delete"),{confirmButtonText:this.$t("common.confirm"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then((function(){a.delete(a.multipleSelection.map((function(e){return e.id})).join(","))})).catch((function(){}))}},delete:function(e){var t=this;Object(l["d"])(e).then((function(e){"success"===e.message?(t.$message({message:t.$t("common.delete-success"),type:"success",duration:2e3}),t.handleReset()):t.handleWarning(e)}))},handleDownload:function(){var e=this;this.downloadLoading=!0;var t={};t.username=this.listQuery.username,t.status=this.listQuery.status,Object(l["e"])(c.a.stringify(t)).then((function(t){Object(d["saveAs"])(t,e.$t("route.sysuser")+".xlsx")})),this.downloadLoading=!1},getSortClass:function(e){var t=this.listQuery.sorter;return t==="".concat(e,"_ascend")?"ascending":"descending"},handleWarning:function(e){this.$message({message:e.message||e,type:"warning",duration:2e3})},checkUsername:function(e,t,a){return t?t.length>2&&t.length<65?void a():a(new Error(this.$t("sysuser.username-length"))):a(new Error(this.$t("sysuser.username-required")))},checkPassword:function(e,t,a){return t?t.length>5&&t.length<32?void a():a(new Error(this.$t("sysuser.password-length"))):a(new Error(this.$t("sysuser.password-required")))},checkEmail:function(e,t,a){if(!t)return a(new Error(this.$t("sysuser.email-required")));var i=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;if(!i.test(t))return a(new Error(this.$t("sysuser.email-format")));a()},checkMobile:function(e,t,a){if(!t)return a(new Error(this.$t("sysuser.mobile-required")));var i=/^1\d{10}$/;if(!i.test(t))return a(new Error(this.$t("sysuser.mobile-format")));a()},checkRoleId:function(e,t,a){if(!t)return a(new Error(this.$t("sysuser.roleId-required")));a()},checkOrgId:function(e,t,a){if(!t)return a(new Error(this.$t("sysuser.orgId-required")));a()},validateOrgId:function(){var e=this;this.$nextTick((function(){e.$refs["dataForm"].clearValidate("orgId")}))},handleNodeClickOrgId:function(e){this.orgName=e.title,this.temp.orgId=e.id,this.$refs.selectOrgId.blur(),this.validateOrgId()},handleClearOrgId:function(){this.orgName="",this.temp.orgId=""}}},p=m,h=a("2877"),g=Object(h["a"])(p,i,s,!1,null,null,null);t["default"]=g.exports}}]);