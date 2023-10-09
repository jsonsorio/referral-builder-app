import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const BriefcaseIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M7.5 4.5a2.75 2.75 0 0 1 2.75-2.75h4A2.75 2.75 0 0 1 17 4.5v1.25h2.25A2.75 2.75 0 0 1 22 8.5v10a2.75 2.75 0 0 1-2.75 2.75h-14A2.75 2.75 0 0 1 2.5 18.5v-10a2.75 2.75 0 0 1 2.75-2.75H7.5V4.5ZM5.25 7.25C4.56 7.25 4 7.81 4 8.5v4.744a23.196 23.196 0 0 0 8.25 1.506c2.906 0 5.687-.533 8.25-1.506V8.5c0-.69-.56-1.25-1.25-1.25h-14Zm10.25-1.5H9V4.5c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v1.25Zm5 9.091a24.71 24.71 0 0 1-8.25 1.409A24.71 24.71 0 0 1 4 14.841V18.5c0 .69.56 1.25 1.25 1.25h14c.69 0 1.25-.56 1.25-1.25v-3.659Zm-9-2.341a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default BriefcaseIcon;
