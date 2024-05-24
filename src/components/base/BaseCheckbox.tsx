/*
 * @FileName: 基础组件-复选框
 * @FilePath: \cloud-disk\src\components\base\BaseCheckbox.tsx
 * @Author: YH
 * @Date: 2024-05-20 13:41:25
 * @LastEditors: YH
 * @LastEditTime: 2024-05-23 16:28:31
 * @Description:
 */
import type {
  ExtractPropTypes,
  ExtractPublicPropTypes,
  HTMLAttributes,
  SetupContext,
  SlotsType
} from 'vue';
import type { JSX } from 'vue/jsx-runtime';
import BaseIcon from './BaseIcon';

type Slots = {
  default?: () => any;
};

type Emits = {};

BaseCheckbox.emits = [] as (keyof Emits)[];

BaseCheckbox.props = {
  // 选中状态
  checked: {
    type: Boolean,
    default: false
  },
  // 不确定状态
  indeterminate: {
    type: Boolean,
    default: false
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: false
  }
};

function BaseCheckbox(
  props: Pick<HTMLAttributes, 'class'> & ExtractPublicPropTypes<typeof BaseCheckbox.props>,
  context: SetupContext<Emits, SlotsType<Slots>>
): JSX.Element {
  const { checked, indeterminate, disabled } = toRefs(
    props as ExtractPropTypes<typeof BaseCheckbox.props>
  );

  const getContainerClass = () => {
    const normalClass = 'flex items-center select-none cursor-pointer';

    if (disabled.value) {
      return [normalClass, 'cursor-no-drop'];
    }

    return normalClass;
  };

  const getCheckboxClass = () => {
    const normalClass =
      'flex flex-shrink-0 items-center justify-center w-4 h-4 text-3 border border-solid border-gray-300 rounded-1 text-gray-100';

    if (disabled.value) {
      return [normalClass, 'bg-gray-100 text-gray-400'];
    } else if (indeterminate.value || checked.value) {
      return [normalClass, 'border-primary-600 bg-primary-600'];
    }

    return [normalClass, 'hover:border-primary-600'];
  };

  const getLabelClass = () => {
    return 'm-l-2';
  };

  const getCheckboxIcon = () => {
    if (indeterminate.value) {
      return 'i-ep:semi-select';
    } else if (checked.value) {
      return 'i-ep:select';
    } else {
      return '';
    }
  };

  return (
    <div class={getContainerClass()}>
      <div class={getCheckboxClass()}>
        <BaseIcon class={getCheckboxIcon()} />
      </div>
      {context.slots.default && <div class={getLabelClass()}>{context.slots.default()}</div>}
    </div>
  );
}

export default BaseCheckbox;
