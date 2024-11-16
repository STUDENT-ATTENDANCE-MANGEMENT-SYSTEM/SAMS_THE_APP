import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg viewBox='0 0 220 220' {...props}>
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
  </Svg>
);

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
