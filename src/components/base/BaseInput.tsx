/*
 * @FileName: 基础组件-输入框
 * @FilePath: \cloud-disk\src\components\base\BaseInput.tsx
 * @Author: YH
 * @Date: 2024-05-20 13:41:25
 * @LastEditors: YH
 * @LastEditTime: 2024-05-24 17:44:03
 * @Description:
 */
import type {
  ExtractPublicPropTypes,
  ExtractPropTypes,
  HTMLAttributes,
  SetupContext,
  SlotsType
} from 'vue';
import type { JSX } from 'vue/jsx-runtime';
import BaseIcon from './BaseIcon';

type Slots = {
  // 前缀内容
  prefix?: () => any;
  // 后缀内容
  suffix?: () => any;
};

type Emits = {
  'update:modelValue': (value: ExtractPropTypes<typeof BaseInput.props>['modelValue']) => void;
  change: (value: ExtractPropTypes<typeof BaseInput.props>['modelValue']) => void;
  focus: () => void;
  blur: () => void;
};

BaseInput.emits = ['update:modelValue', 'change', 'focus', 'blur'] as (keyof Emits)[];

BaseInput.props = {
  // 输入值
  modelValue: {
    type: [String, Number],
    required: false
  },
  // 类型
  type: {
    type: String as PropType<'text' | 'number' | 'password'>,
    default: 'text'
  },
  // 占位符
  placeholder: {
    type: String,
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  // 原生 autocomplete 属性
  autocomplete: {
    type: String,
    default: 'off'
  },
  // 自动获取焦点
  autofocus: {
    type: Boolean,
    default: false
  },
  // 自定义前缀图标
  prefixIcon: {
    type: String,
    required: false
  },
  // 自定义后缀图标
  suffixIcon: {
    type: String,
    required: false
  }
};

function BaseInput(
  props: Pick<HTMLAttributes, 'class'> & ExtractPublicPropTypes<typeof BaseInput.props>,
  context: SetupContext<Emits, SlotsType<Slots>>
): JSX.Element {
  const innerProps = props as ExtractPropTypes<typeof BaseInput.props>;

  const getContainerClass = () => {
    return 'relative flex items-center p-y-1.5 p-x-3 rounded-md dark:bg-white/5';
  };

  const getPrefixIconClass = () => {
    return 'flex m-r-1.5';
  };

  const getInputClass = () => {
    return 'peer flex-grow-1 placeholder:text-gray-400 bg-transparent';
  };

  const getSuffixIconClass = () => {
    return 'flex m-l-1.5';
  };

  const getRingClass = () => {
    return 'absolute pointer-events-none w-full h-full top-0 left-0 rounded-md ring-inset ring-1 ring-gray-300 dark:ring-white/10 peer-focus:ring-2 peer-focus:ring-primary-600';
  };

  const prefixIconVNode =
    context.slots.prefix?.() ||
    (innerProps.prefixIcon && <BaseIcon class={innerProps.prefixIcon} />);

  const suffixIconVNode =
    context.slots.suffix?.() ||
    (innerProps.suffixIcon && <BaseIcon class={innerProps.suffixIcon} />);

  return (
    <div class={getContainerClass()}>
      {prefixIconVNode && <div class={getPrefixIconClass()}>{prefixIconVNode}</div>}
      <input
        class={getInputClass()}
        value={innerProps.modelValue}
        type={innerProps.type}
        placeholder={innerProps.placeholder}
        disabled={innerProps.disabled}
        readonly={innerProps.readonly}
        autocomplete={innerProps.autocomplete}
        autofocus={innerProps.autofocus}
        onInput={(ev) => context.emit('update:modelValue', (ev.target as HTMLInputElement).value)}
        onChange={(ev) => context.emit('change', (ev.target as HTMLInputElement).value)}
        onFocus={() => context.emit('focus')}
        onBlur={() => context.emit('blur')}
      />
      {suffixIconVNode && <div class={getSuffixIconClass()}>{suffixIconVNode}</div>}
      <div class={getRingClass()}></div>
    </div>
  );
}

export default BaseInput;
