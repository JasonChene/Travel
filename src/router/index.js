/**
 * 路由配置
 * @版权所有 广东国星科技有限公司
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/componentsRouter'
import chartsRouter from './modules/chartsRouter'
import tableRouter from './modules/tableRouter'
import authorityRouter from './modules/authorityRouter'
import adminRouter from './modules/adminRouter'
import personaloaRouter from './modules/personaloaRouter'
import activitiRouter from './modules/activitiRouter'
import commentRouter from './modules/commentRouter'
import libRouter from './modules/libRouter'
import createmanageRouter from './modules/createmanageRouter'
import databaseRouter from './modules/databaseRouter'
import SystemRouter from './modules/SystemRouter'
import nestedRouter from './modules/nestedRouter'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['ROLE_ADMIN', 'ROLE_EDITOR']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const templateRoutes = [
  {
    path: 'guide',
    component: () => import('@/views/guide/index'),
    name: 'Guide',
    meta: { title: 'guide', icon: 'guide', noCache: true }
  },
  {
    path: 'icon',
    component: () => import('@/views/icons/index'),
    name: 'Icons',
    meta: { title: 'icons', icon: 'icon', noCache: true }
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: () => import('@/views/example'),
    redirect: 'noRedirect',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },
  {
    path: 'tab',
    component: () => import('@/views/tab/index'),
    name: 'Tab',
    meta: { title: 'tab', icon: 'tab' }
  },
  {
    path: '/error',
    component: () => import('@/views/error-page'),
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  {
    path: 'error-log',
    component: () => import('@/views/error-log/index'),
    name: 'ErrorLog',
    meta: { title: 'errorLog', icon: 'bug' }
  },
  {
    path: '/excel',
    component: () => import('@/views/excel'),
    redirect: 'noRedirect',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },
  {
    path: '/zip',
    component: () => import('@/views/zip'),
    redirect: 'noRedirect',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/zip'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },
  {
    path: 'pdf',
    component: () => import('@/views/pdf/index'),
    name: 'PDF',
    meta: { title: 'pdf', icon: 'pdf' }
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },
  {
    path: 'theme',
    component: () => import('@/views/theme/index'),
    name: 'Theme',
    meta: { title: 'theme', icon: 'theme' }
  },
  {
    path: 'clipboard',
    component: () => import('@/views/clipboard/index'),
    name: 'ClipboardDemo',
    meta: { title: 'clipboardDemo', icon: 'clipboard' }
  },
  {
    path: 'i18n',
    component: () => import('@/views/i18n-demo/index'),
    name: 'I18n',
    meta: { title: 'i18n', icon: 'international' }
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.mscodecloud.com',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  authorityRouter,
  adminRouter,
  personaloaRouter,
  activitiRouter,
  commentRouter,
  libRouter,
  createmanageRouter,
  databaseRouter,
  SystemRouter,
  // {
  //   path: '/devtool',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   alwaysShow: true,
  //   name: 'devtool',
  //   meta: { title: 'devtool', icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: 'generator',
  //       component: () => import('@/views/devtool/generator'),
  //       name: 'Generator',
  //       meta: { title: 'generator', icon: 'el-icon-folder-add' }
  //     }
  //   ]
  // },
  // {
  //   path: '/distributedlog',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   alwaysShow: true,
  //   name: 'distributedlog',
  //   meta: { title: 'distributedlog', icon: 'el-icon-notebook-2' },
  //   children: [
  //     {
  //       path: "https://www.mscodecloud.com/kibana/app/kibana#/discover?_g=(refreshInterval:(pause:!t,value:0),time:(from:now-150m,to:now))&_a=(columns:!(_source),index:'627bcfe0-b9b2-11ea-be85-63ebeebd2047',interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))",
  //       meta: { title: 'kibana', icon: 'nested' }
  //     }
  //   ]
  // },
  // {
  //   path: '/monitors',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'monitors',
  //   meta: { title: 'monitors', icon: 'el-icon-monitor' },
  //   children: [
  //     {
  //       path: 'http://120.79.98.208:10006',
  //       meta: { title: 'sentinel', icon: 'link' }
  //     },
  //     {
  //       path: 'https://www.mscodecloud.com/nacos/',
  //       meta: { title: 'nacos', icon: 'link' }
  //     },
  //     {
  //       path: 'http://120.79.98.208:10003/swagger-ui.html',
  //       meta: { title: 'swagger', icon: 'link' }
  //     }
  //   ]
  // },
  // {
  //   path: '/template',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'template',
  //   meta: {
  //     title: 'template',
  //     icon: 'table'
  //   },
  //   children: templateRoutes
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['ROLE_ADMIN111', 'ROLE_EDITOR'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['ROLE_ADMIN'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['ROLE_ADMIN']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode:"hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
