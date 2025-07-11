import React from "react";
import { StarField } from "starfield-react";

const AnimatedHero = () => {
  return (
    <StarField
      style={{
        width: "100%",
        height: "100vh",
      }}
      count={4000}
      speed={2}
      starRatio={100}
      starSize={0.2}
      starStyle={"#fff"}
      starShape={"round"}
      clear={true}
      bgStyle={"#000"}
      noBackground={false}
    />
  );
};

export default AnimatedHero;
