import type { ExtractPropTypes } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

const propsOptions = {
  icon: {
    type: String,
    required: false
  }
} as const;

function FBaseIcon(props: ExtractPropTypes<typeof propsOptions>): JSX.Element {
  return <div class="w-1em h-1em">{props.icon && <i class={['block', props.icon]}></i>}</div>;
}

FBaseIcon.props = propsOptions;

export default FBaseIcon;
