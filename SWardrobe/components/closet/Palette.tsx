import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";

const Palette = ({ children }: { children?: React.ReactNode }) => {
  const [color, setColor] = useColor("#561ecb");

  return <ColorPicker height={70} color={color} onChange={setColor} />;
}

export default Palette;