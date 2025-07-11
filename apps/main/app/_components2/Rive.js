import React, { useEffect, useState } from "react";
import { useRive } from "rive-react";

const Rive = ({ src, isHovered, delay }) => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const TRIGGER_NAME = "Boolean 1";

  const { RiveComponent, rive } = useRive({
    src, // Dynamic Rive animation file path
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!rive) return;

    const stateMachineInputs = rive.stateMachineInputs(STATE_MACHINE_NAME);
    const trigger = stateMachineInputs?.find(
      (input) => input.name === TRIGGER_NAME,
    );

    if (trigger && isHovered && !isTriggered) {
      setTimeout(() => {
        trigger.value = !trigger.value;
        setIsTriggered(true);
      }, delay);
    } else if (!isHovered) {
      setIsTriggered(false);
    }
  }, [rive, isHovered, isTriggered, delay]);

  return (
    <div className="w-[250px] md:w-[394px] h-[224px] md:h-[357px] mt-[20px]">
      <RiveComponent />
    </div>
  );
};

export default Rive;
