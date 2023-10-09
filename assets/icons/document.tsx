import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const DocumentIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M2.75 2.25c-.69 0-1.25.56-1.25 1.25v14c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V7.914a.25.25 0 0 0-.073-.177L8.513 2.323a.25.25 0 0 0-.177-.073H2.75ZM0 3.5A2.75 2.75 0 0 1 2.75.75h5.586c.464 0 .909.184 1.237.513l5.414 5.414c.329.328.513.773.513 1.237V17.5a2.75 2.75 0 0 1-2.75 2.75h-10A2.75 2.75 0 0 1 0 17.5v-14Zm4 7a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6A.75.75 0 0 1 4 10.5Zm0 4a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6A.75.75 0 0 1 4 14.5Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default DocumentIcon;
