import Vue from "vue";
import VueScrollTo from "vue-scrollto";

Vue.use(VueScrollTo);

export function createChildrenElements (h, children, instance) {
  if (!children) return

  let objType = Object.prototype.toString.call(children)
  if (objType === '[object String]') {
    return children
  } else if (objType === '[object Array]' && children.length === 0) {
    return
  }
  return children.map(child => {
    if (Object.prototype.toString.call(child) === '[object String]') {
      return child
    }

    if (!child.prop || !!child.slot) {
      return renderItemType(h, child, instance)
    }
    return renderFormItemType(h, child, instance)
  })
}

export function renderItemType (h, option, instance) {
  return h(
    option.type,
    {
      model: {
        value: option.prop ? instance.fatherForm.formModel[option.prop] : '',
        callback: newVal => {
          if (option.prop) instance.fatherForm.formModel[option.prop] = newVal
        }
      },
      props: {
        ...instance.$attrs,
        ...option.props
      },
      class: option.class,
      style: option.style,
      attrs: option.attrs,
      domProps: option.domProps,
      on: {
        ...instance.$listeners,
        ...option.on
      },
      directives: option.directives,
      slot: option.slot,
      ref: option.ref
    },
    createChildrenElements(h, option.children, instance)
  )
}

export function renderFormItemType (h, option, instance) {
  let typeCLass = `${(option.props && option.props.inputClass) ||
    ''} ${option.class || ''} ${option.inputClass || ''}`
  return h(
    'el-form-item',
    {
      props: {
        label: option.label || (option.props && option.props.label),
        prop: option.prop || (option.props && option.props.prop),
        rules: option.rules
      },
      class:
        option.formItemClass || (option.props && option.props.formItemClass)
    },
    [
      h(
        option.type,
        {
          model: {
            value: option.prop ? instance.fatherForm.formModel[option.prop] : '',
            callback: newVal => {
              if (option.prop) instance.fatherForm.formModel[option.prop] = newVal
            }
          },
          props: {
            ...instance.$attrs,
            ...option.props
          },
          class: typeCLass,
          style: option.style,
          attrs: {
            ...option.attrs,
            placeholder: option.props && option.props.placeholder
          },
          domProps: option.domProps,
          on: {
            ...instance.$listeners,
            ...option.on
          },
          directives: option.directives,
          slot: option.slot,
          ref: option.ref
        },
        createChildrenElements(h, option.children, instance)
      )
    ]
  )
}

const scrollToErrorNode = (el) => {
  let node = document.createElement("div");
  node.id = "error-scroll-to-target";
  el.parentNode.insertBefore(node, el);
  Vue.prototype.$scrollTo("#error-scroll-to-target");
  el.parentNode.removeChild(node);
}

const scrollToErrorNodeView = el => {
  let node = document.createElement("div");
  node.id = "error-scroll-to-target";
  el.parentNode.insertBefore(node, el);
  node.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    el.parentNode.removeChild(node);
  }, 2000); // 移除时间可以稍微长一点，尽量保证能找到该锚点
}


// 滚动到有错误提示处
export function socrllToErrorMessageItem(bodyContainer = true) {
  Vue.prototype.$nextTick(() => {
    let eles = document.getElementsByClassName("el-form-item__error");
    if(eles && eles[0]) {
      if(bodyContainer) {
        scrollToErrorNode(eles[0]);
      } else {
        scrollToErrorNodeView(eles[0]);
      }
    } else {
      Vue.prototype.$nextTick(() => {
        eles = document.getElementsByClassName("el-form-item__error");
        if (bodyContainer) {
          scrollToErrorNode(eles[0]);
        } else {
          scrollToErrorNodeView(eles[0]);
        }
      })
    }
  })
}

// 同时校验多个表单，直接传入多个表单引用
export function validateForms() {
  let formRefs = Array.prototype.slice.call(arguments);
  let formPromises = formRefs.map(
    item =>
      new Promise((resolve, reject) => {
        item.validate(success => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      })
  );
  return Promise.all(formPromises).catch(err => {
    socrllToErrorMessageItem()
    throw err;
  });
}

/*
  apis：为调用的接口配置，参考dy-button，必需的
  vm：为当前vue实例，必需的
  propName：当前vue实例中按钮绑定loading的属性名称，非必需的
*/
export function mergeRequest(apis, vm, propName) {
  let res;
  if (vm && propName !== undefined) {
    vm[propName] = true;
  }

  return new Promise((resolve, reject) => {
    vm.$nextTick(async () => {
      let tp = Object.prototype.toString.call(apis);
      if (tp === "[object Object]" && !apis.cancel) {
        try {
          let param;
          if (typeof apis.param === "function") {
            param = apis.param();
          } else {
            // 如果没有传入param对象，则默认为表单model
            param = apis.param || {};
          }
          param = Object.assign({...vm.model}, param); // param优先级更高
          res = await vm.$http[apis["method"].toLowerCase()](
            apis.url,
            param
          );
          if (vm && propName !== undefined) {
            vm[propName] = false;
          }
          resolve(res);
        } catch (err) {
          if (vm && propName !== undefined) {
            vm[propName] = false;
          }
          console.log(err);
          reject(err);
        }
      } else if (tp === "[object Array]") {
        let useApis = apis.filter(o => !o.cancel);
        let param,
          end = 0,
          length = useApis.length;
        // foreach,map 循环不能中止(在异步请求，抛出异常也不能中断)，所以考虑用for循环
        let fn = async () => {
          for (let i = 0; i < length; i++) {
            try {
              if (typeof useApis[i].param === "function") {
                param = useApis[i].param(res);
              } else {
                param = useApis[i].param;
                if(i === 0) {
                  param = param || {};
                  param = Object.assign({...vm.model}, param);
                }
              }
              res = await vm.$http[useApis[i]["method"].toLowerCase()](
                useApis[i].url,
                param
              );
              end++;
              if (end === length) {
                if (vm && propName !== undefined) {
                  vm[propName] = false;
                }
                resolve(res);
              }
            } catch (er) {
              if (vm && propName !== undefined) {
                vm[propName] = false;
              }
              reject(er);
              break;
            }
          }
        };
        fn();
      } else {
        resolve("do nothing");
      }
    });
  });
}

const createFormModel = (option, formModel) => {
  if(option.prop) {
    formModel[option.prop] = formModel[option.prop] || ""
  }
  if(Array.isArray(option.children)) {
    option.children.forEach(i => createFormModel(i, formModel))
  }
}

// formItems 必须是一个二维数组
export function createFormModelByFormItems(formItems, formModel) {
  formItems.forEach(item => {
    item.forEach(i => createFormModel(i, formModel))
  })
}
