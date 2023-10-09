import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const MoreVerticalIcon = (props: SvgProps) => (
  <Svg
    width={6}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#8B83BA"
      d="M2.993 7.805c1.19 0 2.143.975 2.143 2.195 0 1.22-.953 2.195-2.143 2.195S.85 11.22.85 10c0-1.22.952-2.195 2.143-2.195ZM.85 2.195c0 1.22.952 2.195 2.143 2.195 1.19 0 2.143-.975 2.143-2.195C5.136.975 4.183 0 2.993 0S.85.976.85 2.195Zm0 15.61c0 1.22.952 2.195 2.143 2.195 1.19 0 2.143-.976 2.143-2.195 0-1.22-.953-2.195-2.143-2.195S.85 16.585.85 17.805Z"
    />
  </Svg>
)
export default MoreVerticalIcon;
