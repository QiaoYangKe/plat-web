export const appConsts = {
  userType: {
    0: "teacher",
    1: "student",
    2: "admin"
  },
  vmType: {
    1: "克隆",
    2: "系统模板",
    3: "测试"
  },
  managerType: {
    0: "登录",
    1: "退出",
    2: "注册",
    3: "克隆虚拟机",
    4: "删除虚拟机",
    5: "修改课程权限",
    6: "提交反馈信息",
    7: "提交实验报告",
    8: "评分"
  },
  serverUrlWithSplit: "/baseUrl",
  serverUrl: "/serverUrl",
  vncUrl: "http://10.10.0.2:8790/",
  uploadUrl: process.env.VUE_APP_BASE_API
};
