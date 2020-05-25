export default {
  required(errMsg) {
    return {
      message: errMsg,
      trigger: "blur",
      required: true,
      validator: (rule, val, cb) => {
        if (!val || (val && val.trim && val.trim() === "")) {
          return cb(new Error(errMsg));
        }
        return cb();
      }
    };
  },
  
  validatePhone: {
    message: "请输入正确的手机号码",
    trigger: "blur",
    pattern: /^[1]([3-9])[0-9]{9}$/
  },

  validateMacaoPhone: {
    message: "请输入正确的联系电话",
    trigger: "blur",
    pattern: /^[0-9]{8}$/
  },

  validateHkPhone: {
    message: "请输入正确的联系电话",
    trigger: "blur",
    pattern: /^[0-9]{8}$/
  },
}