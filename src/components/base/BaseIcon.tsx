/*
 * @FileName: 基础组件-图标
 * @FilePath: \cloud-disk\src\components\base\BaseIcon.tsx
 * @Author: YH
 * @Date: 2024-05-20 13:41:25
 * @LastEditors: YH
 * @LastEditTime: 2024-05-24 14:11:30
 * @Description:
 */
import type { ExtractPublicPropTypes, HTMLAttributes, SetupContext, SlotsType } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

type Slots = {};

type Emits = {};

BaseIcon.emits = [] as (keyof Emits)[];

BaseIcon.props = {
  text: {
    type: Boolean
  }
};

function BaseIcon(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: Pick<HTMLAttributes, 'class'> & ExtractPublicPropTypes<typeof BaseIcon.props>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: SetupContext<Emits, SlotsType<Slots>>
): JSX.Element {
  return <i class="inline-block before:content-[''] before:block"></i>;
}

export default BaseIcon;
