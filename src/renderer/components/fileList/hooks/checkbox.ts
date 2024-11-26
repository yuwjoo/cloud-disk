import type { CheckboxValueType } from 'element-plus';
import type { Ref, MaybeRefOrGetter } from 'vue';
import type { ItemType, PropsType } from '../FileList.vue';

/**
 * @description: 多选框逻辑-hook
 */
export function useCheckbox<T extends ItemType>(
  checkedList: Ref<T[]>,
  list: MaybeRefOrGetter<PropsType<T>['list']>
) {
  const checkAll = ref(false); // 是否全选

  const isIndeterminate = ref(false); // 是否中间状态

  /**
   * @description: 处理全选
   * @param {CheckboxValueType} isChecked 选中状态
   */
  const handleCheckAll = (isChecked: CheckboxValueType) => {
    checkedList.value = isChecked ? [...toValue(list)] : [];
    isIndeterminate.value = false;
  };

  /**
   * @description: 处理选中复选框
   * @param {CheckboxValueType[]} value 选中数据列表
   */
  const handleChecked = (value: CheckboxValueType[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount > 0 && checkedCount === toValue(list).length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < toValue(list).length;
  };

  return { checkAll, isIndeterminate, handleCheckAll, handleChecked };
}
