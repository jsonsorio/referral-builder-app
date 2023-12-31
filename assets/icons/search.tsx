import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#8B83BA"
      d="M13.41 14.882a8.308 8.308 0 0 1-11.331-1.065A8.318 8.318 0 0 1 8.052.004a8.309 8.309 0 0 1 8.534 7.533 8.318 8.318 0 0 1-1.711 5.88l4.819 4.803a1.042 1.042 0 1 1-1.474 1.474l-4.8-4.812h-.01Zm-5.09-.332a6.23 6.23 0 0 0 5.758-3.85 6.238 6.238 0 0 0-5.759-8.623 6.232 6.232 0 0 0-6.233 6.236 6.238 6.238 0 0 0 6.233 6.236Z"
    />
  </Svg>
);

export default SearchIcon;
