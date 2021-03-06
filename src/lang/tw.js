export default {
  route: {
    'dashboard': '首頁',
    'template': '模板實例',
    'guide': '引導頁',
    'permission': '權限測試頁',
    'rolePermission': '角色權限',
    'pagePermission': '頁面權限',
    'directivePermission': '指令權限',
    'icons': '圖標',
    'components': '組件',
    'tinymce': '富文本編輯器',
    'jsonEditor': 'JSON 編輯器',
    'dndList': '列表拖拽',
    'splitPane': 'Splitpane',
    'avatarUpload': '頭像上傳',
    'dropzone': 'Dropzone',
    'sticky': 'Sticky',
    'countTo': 'Count To',
    'componentMixin': '小組件',
    'backToTop': '返回頂部',
    'dragDialog': '拖拽 Dialog',
    'dragSelect': '拖拽 Select',
    'dragKanban': '可拖拽看板',
    'charts': '圖表',
    'keyboardChart': '鍵盤圖表',
    'lineChart': '折線圖',
    'mixChart': '混合圖表',
    'example': '綜合實例',
    'nested': '路由嵌套',
    'menu1': '菜單1',
    'menu1-1': '菜單 1-1',
    'menu1-2': '菜單 1-2',
    'menu1-2-1': '菜單 1-2-1',
    'menu1-2-2': '菜單 1-2-2',
    'menu1-3': '菜單 1-3',
    'menu2': '菜單 2',
    'Table': 'Table',
    'dynamicTable': '動態 Table',
    'dragTable': '拖拽 Table',
    'inlineEditTable': 'Table 內編輯',
    'complexTable': '綜合 Table',
    'tab': 'Tab',
    'form': '表單',
    'createArticle': '創建文章',
    'editArticle': '編輯文章',
    'articleList': '文章列表',
    'errorPages': '錯誤頁面',
    'page401': '401',
    'page404': '404',
    'errorLog': '錯誤日誌',
    'excel': 'Excel',
    'exportExcel': '導出 Excel',
    'selectExcel': '導出 已選擇項',
    'mergeHeader': '導出 多級表頭',
    'uploadExcel': '上傳 Excel',
    'zip': 'Zip',
    'pdf': 'PDF',
    'exportZip': 'Export Zip',
    'theme': '換膚',
    'clipboardDemo': 'Clipboard',
    'i18n': '國際化',
    'externalLink': '外鏈',
    'profile': '個人中心',
    'distributedlog': '分佈式日誌',
    'kibana': 'ELK分佈式日誌',
    'monitors': '配置監控',
    'sentinel': 'Sentinel流量監控',
    'nacos': 'Nacos配置註冊',
    'swagger': 'Swagger接口文檔',
    'authority': '權限管理',
    'sysrole': '角色管理',
    'sysurl': '接口權限',
    'datapermission': '數據權限',
    'admin': '系統管理',
    'sysuser': '用戶管理',
    'sysmenu': '菜單管理',
    'sysorg': '機構管理',
    'sysdict': '字典管理',
    'sysregion': '區域管理',
    'sysparam': '參數管理',
    'appclient': '應用管理',
    'tenant': '多租戶',
    'systenant': '租戶管理',
    'personaloa': '我的辦公',
    'startprocess': '發起流程',
    'myprocess': '我的流程',
    'myprocessdetails': '我的流程詳情',
    'candidatetask': '待簽收任務',
    'assigneetask': '待辦任務',
    'finishedtask': '已辦任務',
    'mytaskdetails': '我的任務詳情',
    'activiti': '工作流管理',
    'model': '模型管理',
    'processdesign': '流程設計',
    'deployment': '部署管理',
    'processdefinition': '流程定義',
    'processinstance': '流程實例',
    'execution': '流程實例執行路徑',
    'task': '流程實例任務',
    'taskdetails': '任務詳情',
    'historicprocessinstance': '流程發起歷史',
    'historicactivityinstance': '節點執行歷史',
    'historicdetail': '流程節點詳細歷史',
    'historicvariableinstance': '流程實例變量歷史',
    'historictaskinstance': '流程任務歷史',
    'historictaskdetails': '任務歷史詳情',
    'devtool': '研發工具',
    'generator': '代碼生成器'
  },
  navbar: {
    'dashboard': '首頁',
    'github': '項目地址',
    'logOut': '退出登錄',
    'profile': '個人中心',
    'theme': '換膚',
    'size': '佈局大小'
  },
  login: {
    'title': 'MSCode微服務平台',
    'logIn': '登錄',
    'username': '用戶名',
    'password': '密碼'
  },
  documentation: {
    'documentation': '文檔',
    'github': 'Github 地址'
  },
  permission: {
    'addRole': '新增角色',
    'editPermission': '編輯權限',
    'roles': '你的權限',
    'switchRoles': '切換權限',
    'tips': '在某些情況下，不適合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它動態渲染 dom 的場景。你只能通過手動設置 v-if 來實現。 ',
    'delete': '刪除',
    'confirm': '確定',
    'cancel': '取消'
  },
  guide: {
    'description': '引導頁對於一些第一次進入項目的人很有用，你可以簡單介紹下項目的功能。本 Demo 是基於',
    'button': '打開引導'
  },
  components: {
    'documentation': '文檔',
    'tinymceTips': '富文本是管理後台一個核心的功能，但同時又是一個有很多坑的地方。在選擇富文本的過程中我也走了不少的彎路，市面上常見的富文本都基本用過了，最終權衡了一下選擇了Tinymce。更詳細的富文本比較和介紹見',
    'dropzoneTips': '由於我司業務有特殊需求，而且要傳七牛 所以沒用第三方，選擇了自己封裝。代碼非常的簡單，具體代碼你可以在這裡看到 @/components/Dropzone',
    'stickyTips': '當頁面滾動到預設的位置會吸附在頂部',
    'backToTopTips1': '頁面滾動到指定位置會在右下角出現返回頂部按鈕',
    'backToTopTips2': '可自定義按鈕的樣式、show/hide、出現的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    'imageUploadTips': '由於我在使用時它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的話，優先還是使用官方版本。 '
  },
  table: {
    'dynamicTips1': '固定表頭, 按照表頭順序排序',
    'dynamicTips2': '不固定表頭, 按照點擊順序排序',
    'dragTips1': '默認順序',
    'dragTips2': '拖拽後順序',
    'title': '標題',
    'importance': '重要性',
    'type': '類型',
    'remark': '點評',
    'search': '搜索',
    'add': '添加',
    'export': '導出',
    'reviewer': '審核人',
    'id': '序號',
    'date': '時間',
    'author': '作者',
    'readings': '閱讀數',
    'status': '狀態',
    'actions': '操作',
    'edit': '編輯',
    'publish': '發布',
    'draft': '草稿',
    'delete': '刪除',
    'cancel': '取 消',
    'confirm': '確 定'
  },
  example: {
    'warning': '創建和編輯頁面是不能被 keep-alive 緩存的，因為keep-alive 的 include 目前不支持根據路由來緩存，所以目前都是基於 component name 來進行緩存的。如果你想類似的實現緩存效果，可以使用 localStorage 等瀏覽器緩存方案。或者不要使用 keep-alive 的 include，直接緩存所有頁面。詳情見'
  },
  errorLog: {
    'tips': '請點擊右上角bug小圖標',
    'description': '現在的管理後台基本都是spa的形式了，它增強了用戶體驗，但同時也會增加頁面出問題的可能性，可能一個小小的疏忽就導致整個頁面的死鎖。好在 Vue 官網提供了一個方法來捕獲處理異常，你可以在其中進行錯誤處理或者異常上報。 ',
    'documentation': '文檔介紹'
  },
  excel: {
    'export': '導出',
    'selectedExport': '導出已選擇項',
    'placeholder': '請輸入文件名(默認excel-list)'
  },
  zip: {
    'export': '導出',
    'placeholder': '請輸入文件名(默認file)'
  },
  pdf: {
    'tips': '這裡使用 window.print() 來實現下載pdf的功能'
  },
  theme: {
    'change': '換膚',
    'documentation': '換膚文檔',
    'tips': 'Tips: 它區別於 navbar 上的 theme-pick, 是兩種不同的換膚方法，各自有不同的應用場景，具體請參考文檔。 '
  },
  tagsView: {
    'refresh': '刷新',
    'close': '關閉',
    'closeOthers': '關閉其它',
    'closeAll': '關閉所有'
  },
  settings: {
    'title': '系統佈局配置',
    'theme': '主題色',
    'tagsView': '開啟 Tags-View',
    'fixedHeader': '固定 Header',
    'sidebarLogo': '側邊欄 Logo'
  },
  common: {
    'yes': '是',
    'no': '否',
    'able': '正常',
    'disable': '禁用',
    'hide': '隱藏',
    'show': '不隱藏',
    'confirm': '確定',
    'cancel': '取消',
    'return': '返回',
    'save': '保存',
    'save-success': '保存成功，請部署。',
    'enter': '請輸入',
    'required': '必填項',
    'choose': '請選擇',
    'choose-tooltip': '如不選擇默認為根節點',
    'create-time': '創建時間',
    'operate': '操作',
    'export': '導出',
    'query': '查詢',
    'reset': '重置',
    'view': '查看',
    'add': '新增',
    'add-row': '新增一行',
    'add-success': '新增成功',
    'edit': '編輯',
    'edit-success': '編輯成功',
    'authorize': '授權',
    'authorize-success': '授權成功',
    'verificationCode': '驗證碼',
    'verificationCode-required': '請輸入驗證碼！',
    'upload': '上傳',
    'download': '下載',
    'success': '成功',
    'warning': '警告',
    'delete': '刪除',
    'batch-delete': '批量刪除',
    'delete-success': '刪除成功',
    'choose-delete': '請勾選需要刪除的記錄！',
    'confirm-delete': '是否要刪除此行？ ',
    'confirm-batch-delete': '確定刪除該些記錄嗎？ '
  },
  sysrole: {
    'roleCode': '角色編碼',
    'roleName': '角色名稱',
    'roleDescription': '角色描述',
    'authorize-menu': '授權菜單',
    'authorize-button': '授權按鈕',
    'authorize-required': '請勾選數據再授權！',
    'authorize-buttontip': '為了更好設計，按鈕默認全部顯示，這裡設置需要隱藏的按鈕',
    'roleCode-required': '請輸入角色編碼！',
    'roleName-required': '請輸入角色名稱！'
  },
  sysurl: {
    'url': 'URL',
    'description': '描述',
    'url-required': '請輸入URL！',
    'url-role-required': '請勾選角色多選框！'
  },
  sysuser: {
    'username': '用戶名',
    'nickname': '暱稱',
    'password': '密碼',
    'email': '郵箱',
    'mobile': '手機號',
    'status': '狀態',
    'roleId': '角色',
    'orgId': '所屬機構',
    'username-required': '請輸入用戶名！',
    'username-length': '用戶名長度最小為3最大為64！',
    'password-required': '請輸入密碼！',
    'password-length': '密碼長度最小為6最大為31！',
    'email-required': '請輸入郵箱地址！',
    'email-format': '請輸入正確的郵箱地址！',
    'prefix-required': '請選擇國家代碼！',
    'mobile-required': '請輸入手機號！',
    'mobile-format': '請輸入正確的手機號！',
    'roleId-required': '請選擇角色！',
    'orgId-required': '請選擇所屬機構！',
    'status-required': '請選擇狀態！'
  },
  sysmenu: {
    'menuCode': '菜單編碼',
    'menuName': '菜單名稱',
    'menuIcon': '菜單圖標',
    'menuPath': '菜單路由',
    'menuComponent': '菜單組件',
    'menuSequence': '菜單排序',
    'menuParent': '上級菜單',
    'menuStatus': '菜單狀態',
    'menuButton': '菜單按鈕',
    'dataTitle': '數據權限',
    'dataFilter': '過濾數據字段，以英文逗號隔開(比如name,createTime)',
    'dataAdd': '新增失敗。角色編碼不能相同，過濾數據字段請以英文逗號隔開',
    'roleCode-required': '請選擇角色編碼！',
    'dataField-required': '請輸入過濾數據字段！',
    'menuCode-required': '請輸入菜單編碼！',
    'menuName-required': '請輸入菜單名稱！',
    'menuPath-required': '請輸入菜單路由！',
    'menuParent-required': '請選擇上級菜單！'
  },
  sysorg: {
    'orgType': '機構類型',
    'orgName': '機構名稱',
    'orgDescription': '機構描述',
    'orgSequence': '排序',
    'orgParent': '上級機構',
    'orgName-required': '請輸入機構名稱！',
    'orgType-required': '請輸入機構類型！',
    'orgParent-required': '請選擇上級機構！'
  },
  sysdict: {
    'dictType': '字典類型',
    'dictName': '字典名稱',
    'dictValue': '字典值',
    'dictSequence': '排序',
    'dictParent': '上級字典',
    'dictType-required': '請輸入字典類型！',
    'dictName-required': '請輸入字典名稱！',
    'dictValue-required': '請輸入字典值！',
    'dictParent-required': '請選擇上級字典！'
  },
  sysregion: {
    'regionName': '區域名稱',
    'regionCode': '區域代碼',
    'regionType': '區域類型',
    'regionParent': '上級區域',
    'regionName-required': '請輸入區域名稱！',
    'regionName-length': '區域名稱長度最大為40，最小為2',
    'regionCode-required': '請輸入區域代碼！',
    'regionCode-length': '區域代碼長度最大為20，最小為6',
    'regionCode-number': '區域代碼必須是數字',
    'regionType-required': '請選擇區域類型！',
    'regionParent-required': '請選擇上級區域！ '
  },
  sysparam: {
    'paramName': '參數名稱',
    'paramKey': '參數鍵名',
    'paramValue': '參數鍵值',
    'paramName-required': '請輸入參數名稱！',
    'paramKey-required': '請輸入參數鍵名！'
  },
  appclient: {
    'clientCode': '應用編碼',
    'clientSecret': '應用密鑰',
    'authType': '授權類型',
    'authScope': '授權範圍',
    'tokenSeconds': '令牌秒數',
    'refreshSeconds': '刷新秒數',
    'fallbackUrl': '回調地址',
    'clientDescription': '應用描述',
    'clientCode-required': '請輸入應用編碼！',
    'clientSecret-required': '請輸入應用密鑰！',
    'authType-required': '請輸入授權類型！',
    'authScope-required': '請輸入授權範圍！',
    'tokenSeconds-required': '請輸入令牌秒數！',
    'refreshSeconds-required': '請輸入刷新秒數！',
    'fallbackUrl-required': '請輸入回調地址！'
  },
  systenant: {
    'tenantCode': '租戶編碼',
    'tenantName': '租戶名稱',
    'tenantContact': '聯繫人',
    'tenantEmail': '聯繫郵箱',
    'tenantTel': '聯繫電話',
    'tenantCode-required': '請輸入租戶編碼！',
    'tenantName-required': '請輸入租戶名稱！'
  },
  process: {
    'processDefinitionKey': '流程定義編號',
    'processDefinitionName': '流程定義名稱',
    'processDefinitionResourcename': '流程資源名稱',
    'processDefinitionVersion': '流程定義版本',
    'processDefinitionCategory': '流程定義類別',
    'processDefinition-suspendSuccess': '流程定義掛起成功',
    'processDefinition-activateSuccess': '流程定義激活成功',
    'processInstanceId': '流程實例ID',
    'processInstanceName': '流程實例名稱',
    'processInstanceHistoric': '流程發起歷史',
    'processInstanceExecution': '流程實例執行路徑',
    'processInstance-suspendSuccess': '流程實例掛起成功',
    'processInstance-activateSuccess': '流程實例激活成功',
    'fold': '折疊',
    'activity': '節點',
    'detail': '詳細',
    'details': '詳情',
    'variable': '變量',
    'activate': '激活',
    'suspend': '掛起',
    'preview': '預覽',
    'track': '跟踪',
    'execution': '路徑',
    'startUserId': '發起者',
    'start': '發起',
    'startProcess': '預覽流程圖，支持自定義流程表單',
    'customField': '自定義字段',
    'startSuccess': '流程發起成功',
    'myProcess': '高亮跟踪流程，顯示當前流程節點的具體狀態',
    'candidate': '審批人員',
    'rangeTime': '起止時間',
    'description': '備註',
    'suspended': '是否掛起',
    'ended': '是否結束',
    'status': '流程狀態',
    'running': '運行中',
    'over': '已結束',
    'startTime': '發起時間',
    'endTime': '結束時間',
    'comments': '批註',
    'executionId': '執行路徑ID',
    'executionName': '執行名稱',
    'activityId': '節點ID',
    'activityKey': '節點編號 ',
    'activityName': '節點名稱',
    'activityType': '節點類型',
    'activityAssignee': '簽收者',
    'activity-starttime': '開始時間',
    'activity-endtime': '結束時間',
    'activityDetail': '流程節點詳細歷史',
    'variableName': '變量名稱',
    'variableType': '變量類型',
    'variableValue': '變量值',
    'variableInstance': '流程實例變量歷史',
    'processCandidate-required': '請選擇審批人員！ ',
    'processRangetime-required': '請選擇起止時間！ ',
    'processDescription-required': '請輸入備註！ ',
    'processDescription-length': '備註長度最大為512'
  },
  task: {
    'id': '任務ID',
    'name': '任務名稱',
    'status': '任務狀態',
    'current': '當前任務',
    'startTime': '請假開始時間',
    'endTime': '請假結束時間',
    'description': '請假備註',
    'candidatetask': '高亮跟踪流程，顯示當前流程節點的具體狀態',
    'assigneetask': '高亮跟踪流程，顯示當前流程節點的具體狀態',
    'finishedtask': '高亮跟踪流程，顯示當前流程節點的具體狀態',
    'assign': '簽收',
    'assign-success': '簽收任務成功',
    'complete': '通過',
    'complete-success': '通過任務成功',
    'delegate': '委派',
    'delegate-success': '委派任務成功',
    'handle-delegate-success': '處理委派任務成功',
    'regress': '回退',
    'regress-success': '回退任務成功',
    'reject': '駁回',
    'reject-success': '駁回任務成功',
    'terminate': '終止',
    'terminate-success': '終止任務成功',
    'assignee': '當前簽收者',
    'claimTime': '當前簽收時間',
    'instance': '流程實例任務',
    'historic': '流程任務歷史',
    'taskComment-required': '請輸入批註！'
  },
  model: {
    'modelName': '模型名稱',
    'modelCategory': '模型類別',
    'modelDescription': '模型描述',
    'modelVersion': '模型版本',
    'modelRevision': '模型修訂',
    'deploy': '部署',
    'deploySuccess': '部署成功',
    'deploymentTime': '部署時間',
    'modelName-required': '請輸入模型名稱！',
    'modelCategory-required': '請輸入模型類別！'
  },
  notification: {
    'title': '標題',
    'content': '內容',
    'type': '類型',
    'priority': '優先級',
    'publisher': '發布者',
    'create-time': '發佈時間',
    'start-time': '開始時間',
    'end-time': '結束時間',
    'period': '時間段',
    'period-tooltip': '如不選擇默認不限定時間段',
    'publish-object': '發布對象',
    'choose-tooltip': '如不選擇默認發佈到所有用戶',
    'title-required': '請輸入標題！',
    'content-required': '請輸入內容！',
    'type-required': '請選擇類型！',
    'priority-required': '請選擇優先級！'
  },
  file: {
    'upload-download': '上傳下載',
    'original-filename': '文件名稱',
    'file-size': '文件大小(KB)',
    'content-type': '數據類型',
    'upload-file': '上傳文件',
    'upload-success': '上傳成功',
    'isst10m': '文件必須小於10MB！',
    'isnotempty': '文件不能為空！',
    'cannotfind': '找不到此文件'
  },
  generator: {
    'moduleName': '模塊名',
    'serviceName': '服務名',
    'packageName': '包名',
    'entityName': '實體名',
    'tableName': '表名',
    'idName': '主鍵名',
    'generate': '生成',
    'choose-generate': '請勾選需要生成的記錄！',
    'generate-success': '生成成功',
    'moduleName-required': '請輸入模塊名！',
    'serviceName-required': '請輸入服務名！',
    'packageName-required': '請輸入包名！',
    'entityName-required': '請輸入實體名！',
    'tableName-required': '請輸入表名！',
    'idName-required': '請輸入主鍵名！'
  }
}
