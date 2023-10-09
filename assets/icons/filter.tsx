import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const FilterIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path fill="#00A87B" d="m12 12 8-8V0H0v4l8 8v8l4-4v-4Z" />
  </Svg>
);

export default FilterIcon;
