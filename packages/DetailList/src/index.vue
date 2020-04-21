<script>
import VDetailList from "./List";
import { getObjProperty } from "./utils";
const DetailItem = VDetailList.Item;
export default {
  name: "DetailList",
  functional: true,
  components: {
    VDetailList,
    DetailItem
  },
  props: {
    rules: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  render(h, context) {
    const { rules, data } = context.props;
    const items = rules.map(rule => {
      let value = "";
      if (typeof rule.prop == "string") {
        value = getObjProperty(data, rule.prop);
      } else {
        value = rule.prop(data, h);
      }
      return h(DetailItem, { props: { label: rule.label } }, [value]);
    });
    return h(VDetailList, { props: { ...context.data.attrs } }, [items]);
  }
};
</script>
