/*
 * @FileName: 基础组件-文本
 * @FilePath: \cloud-disk\src\components\base\BaseText.tsx
 * @Author: YH
 * @Date: 2024-05-20 13:41:25
 * @LastEditors: YH
 * @LastEditTime: 2024-05-24 14:56:39
 * @Description:
 */
import type {
  ExtractPropTypes,
  ExtractPublicPropTypes,
  HTMLAttributes,
  PropType,
  SetupContext,
  SlotsType
} from 'vue';
import type { JSX } from 'vue/jsx-runtime';

type Slots = {
  default?: () => any;
};

type Emits = {};

BaseText.emits = [] as (keyof Emits)[];

BaseText.props = {
  // 文本类型
  type: {
    type: String as PropType<'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'>,
    default: 'default'
  },
  // 是否是可点击的
  clickable: {
    type: Boolean,
    default: false
  },
  // 是否链接文本 (具有下划线)
  isLink: {
    type: Boolean,
    required: false
  }
};

function BaseText(
  props: Pick<HTMLAttributes, 'class'> & ExtractPublicPropTypes<typeof BaseText.props>,
  context: SetupContext<Emits, SlotsType<Slots>>
): JSX.Element {
  const innerProps = props as ExtractPropTypes<typeof BaseText.props>;

  const typeColors = {
    default: 'text-inherit',
    primary: 'text-primary-600',
    success: 'text-success-600',
    info: 'text-gray-600',
    warning: 'text-warning-600',
    danger: 'text-danger-600'
  };

  const clickableClass = ['cursor-pointer', 'hover:opacity-75', 'select-none'];

  const linkClass = [...clickableClass, 'hover:underline'];

  return (
    <span
      class={[
        typeColors[innerProps.type],
        innerProps.clickable && clickableClass,
        innerProps.isLink && linkClass
      ]}
    >
      {context.slots.default?.()}
    </span>
  );
}

export default BaseText;
