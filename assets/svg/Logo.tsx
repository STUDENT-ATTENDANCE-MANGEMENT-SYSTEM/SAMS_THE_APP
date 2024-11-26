import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SvgComponent = (props: SvgProps) => {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withTiming(1, {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });
  }, [scale]);

  const animatedProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Svg viewBox='0 0 220 220' {...props}>
      <Defs>
        <LinearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <Stop offset='0%' stopColor='#213756' stopOpacity={1} />
          <Stop offset='50%' stopColor='#3a4a6b' stopOpacity={1} />
          <Stop offset='100%' stopColor='#f2f2f2' stopOpacity={1} />
        </LinearGradient>
      </Defs>
      <Rect width='220' height='220' fill='url(#grad)' />
      <Path
        d='m42.4 146.5-.6-79.4L108.5 24l70.8 41.7.7 79.5-68.4 40.4z'
        fill='#f2f2f2'
        stroke='#010101'
        strokeMiterlimit={10}
      />
      <Path
        d='m48.3 143.2-.4-72.7 61-39.7 64.5 38.1.5 72.9-62.6 37.1z'
        fill='#213756'
      />
      <Path
        d='m94.3 142.8-37.5-24.4 8.6-13.2L92.8 123l61.1-54.4 10.5 11.8z'
        fill='#213756'
      />
      <AnimatedPath
        animatedProps={animatedProps}
        d='M110 110 L130 130 L150 90'
        fill='none'
        stroke='#fff'
        strokeWidth={10}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default SvgComponent;

// import * as React from 'react';
// import Svg, { SvgProps, Path } from 'react-native-svg';
// /* SVGR has dropped some elements not supported by react-native-svg: style */
// const SvgComponent = (props: SvgProps) => (
//   <Svg
//     xmlns='http://www.w3.org/2000/svg'
//     xmlSpace='preserve'
//     id='Layer_1'
//     x={0}
//     y={0}
//     style={{
//       enableBackground: 'new 0 0 220 220',
//     }}
//     viewBox='0 0 220 220'
//     {...props}
//   >
//     <Path
//       d='m42.4 146.5-.6-79.4L108.5 24l70.8 41.7.7 79.5-68.4 40.4z'
//       style={{
//         fill: '#f2f2f2',
//         stroke: '#010101',
//         strokeMiterlimit: 10,
//       }}
//     />
//     <Path
//       d='m48.3 143.2-.4-72.7 61-39.7 64.5 38.1.5 72.9-62.6 37.1z'
//       style={{
//         fill: '#213756',
//       }}
//     />
//     <Path
//       d='m94.3 142.8-37.5-24.4 8.6-13.2L92.8 123l61.1-54.4 10.5 11.8z'
//       className='st2'
//     />
//   </Svg>
// );
// export default SvgComponent;
