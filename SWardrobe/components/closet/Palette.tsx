import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Palette: React.FC = () => {
  const [color, setColor] = useColor("#561ecb");

  return (
    <ColorPicker height={100} color={color} onChange={setColor} />
  );
};
export default Palette;