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
  serverUrlWithSplit: "http://10.10.0.2:88/",
  serverUrl: "http://10.10.0.2:88",
  echarsUrl: "http://10.10.0.2:19999/api/v1/data",
  vncUrl: "http://10.10.0.2:8790/vnc.html?path=?token=",
  uploadUrl: process.env.VUE_APP_BASE_API
};
