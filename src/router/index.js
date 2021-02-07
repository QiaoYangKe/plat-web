import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
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
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true  }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/teach-manager',
    component: Layout,
    name: "ClassManager",
    meta: { title: '教学管理', icon: 'teach-manager', affix: true },
    children: [
      {
        path: '/class-manager',
        component: () => import('@/views/teach-manager/class-manager'),
        name: 'ClassManager',
        meta: { title: '班级管理', affix: true }
      },
      {
        path: '/student-manager',
        component: () => import('@/views/teach-manager/student-manager'),
        name: 'StudentManager',
        meta: { title: '学生管理', affix: true }
      }
    ]
  },
  {
    path: '/course-setting',
    component: Layout,
    redirect: '/course-setting',
    children: [
      {
        path: '/course-setting',
        component: () => import('@/views/course-setting'),
        name: 'CourseSetting',
        meta: { title: '课程设置', icon: 'course-setting', affix: true }
      }
    ]
  },
  {
    path: '/course-manager',
    component: Layout,
    redirect: '/course-manager',
    children: [
      {
        path: '/course-manager',
        component: () => import('@/views/course-manager/index'),
        name: 'CourseManager',
        meta: { title: '课程管理', icon: 'course-manager', affix: true }
      },
      {
        path: '/course-detail',
        component: () => import('@/views/course-manager/courseDetail'),
        name: 'CourseDetail',
        hidden: true,
        meta: { title: '课程管理', icon: 'course-manager', affix: true }
      }
    ]
  },
  {
    path: '/log-manager',
    component: Layout,
    redirect: '/log-manager',
    children: [
      {
        path: '/log-manager',
        component: () => import('@/views/log-manager'),
        name: 'LogManager',
        meta: { title: '日志管理', icon: 'log-manager', affix: true }
      }
    ]
  },
  {
    path: '/course-learn',
    component: Layout,
    redirect: '/course-learn',
    children: [
      {
        path: '/course-learn',
        component: () => import('@/views/course-learn'),
        name: 'CourseLearn',
        meta: { title: '课程学习', icon: 'course-learn', affix: true }
      },
      {
        path: '/course-learn-detail',
        component: () => import('@/views/course-learn/courseLearnDetail'),
        name: 'CourseLearnDetail',
        hidden: true,
        meta: { title: '课程学习', icon: 'course-learn', affix: true }
      }
    ]
  },
  {
    path: '/lab-report',
    component: Layout,
    redirect: '/lab-report',
    children: [
      {
        path: '/lab-report',
        component: () => import('@/views/lab-report'),
        name: 'LabReport',
        meta: { title: '实验报告', icon: 'lab-report', affix: true }
      }
    ]
  },
  {
    path: '/report-view',
    component: () => import('@/views/lab-report/report-view'),
    name: 'ReportView',
    hidden: true,
    meta: { title: '实验报告预览'}
  },
  {
    path: '/question-answer',
    component: Layout,
    redirect: '/question-answer',
    children: [
      {
        path: '/question-answer',
        component: () => import('@/views/question-answer'),
        name: 'QuestionAnswer',
        meta: { title: '问题解答', icon: 'question-answer', affix: true }
      },
      {
        path: '/answer-detail/:id',
        component: () => import('@/views/question-answer/answerDetail.vue'),
        name: 'AnswerDetail',
        hidden: true,
        meta: { title: '反馈详情', affix: true }
      },
    ]
  },
  {
    path: '/question-feedback',
    component: Layout,
    redirect: '/question-feedback',
    children: [
      {
        path: '/question-feedback',
        component: () => import('@/views/question-feedback'),
        name: 'QuestionFeedback',
        meta: { title: '问题反馈', icon: 'question-feedback', affix: true }
      }
    ]
  },
  {
    path: '/student-grade',
    component: Layout,
    redirect: '/student-grade',
    children: [
      {
        path: '/student-grade',
        component: () => import('@/views/student-grade'),
        name: 'StudentGrade',
        meta: { title: '成绩展示', icon: 'student-grade', affix: true }
      }
    ]
  },
  {
    path: '/teacher-manager',
    component: Layout,
    redirect: '/teacher-manager',
    children: [
      {
        path: '/teacher-manager',
        component: () => import('@/views/teacher-manager'),
        name: 'TeacherManager',
        meta: { title: '教师管理', icon: 'teacher-manager', affix: true }
      }
    ]
  },
  {
    path: '/jurisdiction-manager',
    component: Layout,
    redirect: '/jurisdiction-manager',
    children: [
      {
        path: '/jurisdiction-manager',
        component: () => import('@/views/jurisdiction-manager'),
        name: 'JurisdictionManager',
        meta: { title: '权限管理', icon: 'jurisdiction-manager', affix: true }
      }
    ]
  },
  {
    path: '/template-manager',
    component: Layout,
    redirect: '/template-manager',
    children: [
      {
        path: '/template-manager',
        component: () => import('@/views/template-manager'),
        name: 'TemplateManager',
        meta: { title: '模板管理', icon: 'template', affix: true }
      }
    ]
  },
  {
    path: '/virtual-machine-manager',
    component: Layout,
    redirect: '/virtual-machine-manager',
    children: [
      {
        path: '/virtual-machine-manager',
        component: () => import('@/views/virtual-machine-manager'),
        name: 'VirtualMachineManager',
        meta: { title: '虚拟机管理', icon: 'virtual', affix: true }
      }
    ]
  },
  {
    path: '/platform-management',
    component: Layout,
    redirect: '/platform-management',
    children: [
      {
        path: '/platform-management',
        component: () => import('@/views/platform-management'),
        name: 'PlatformManagement',
        meta: { title: '平台管理', icon: 'platform-management', affix: true}
      }
    ]
  },
  {
    path: '/system-detection',
    component: Layout,
    redirect: '/system-detection',
    children: [
      {
        path: '/system-detection',
        component: () => import('@/views/system-detection'),
        name: 'SystemDetection',
        meta: { title: '系统运行检测', icon: 'system-detection', affix: true }
      }
    ]
  },
  {
    path: '/data-backup',
    component: Layout,
    redirect: '/data-backup',
    children: [
      {
        path: '/data-backup',
        component: () => import('@/views/data-backup'),
        name: 'DataBackup',
        meta: { title: '数据备份', icon: 'data-backup', affix: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
