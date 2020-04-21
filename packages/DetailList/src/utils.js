/**
 * @author wulin
 * @param {*} obj 访问的对象。 {a:{b:{c:1}}}
 * @param {*} tree 属性树，如:"a.b.c" ==>1
 */
export function getObjProperty(obj, tree) {
  if (!obj || obj == "undefined" || obj == undefined) {
    return "";
  }
  let tempValue = "";
  tree.split(".").forEach(key => {
    tempValue = tempValue[key] || obj[key];
  });
  return tempValue;
}
