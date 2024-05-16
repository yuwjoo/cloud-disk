import type { ExtractPropTypes } from 'vue';

const propsOptions = {
  icon: {
    type: String,
    required: false
  }
} as const;

function FBaseIcon(props: ExtractPropTypes<typeof propsOptions>) {
  return <i class={['inline-block', props.icon]}></i>;
}

FBaseIcon.props = propsOptions;

export default FBaseIcon;
