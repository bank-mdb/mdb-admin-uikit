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
        value: option.prop ? instance.fatherForm.model[option.prop] : '',
        callback: newVal => {
          if (option.prop) instance.fatherForm.model[option.prop] = newVal
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
            value: option.prop ? instance.fatherForm.model[option.prop] : '',
            callback: newVal => {
              if (option.prop) instance.fatherForm.model[option.prop] = newVal
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