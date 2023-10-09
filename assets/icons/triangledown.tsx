import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const TriangleDownIcon = (props: SvgProps) => (
  <Svg
    width={8}
    height={5}
    fill="none"
    {...props}
  >
    <Path fill="#6E6893" d="M4 5 0 0h8L4 5Z" />
  </Svg>
);

export default TriangleDownIcon;
