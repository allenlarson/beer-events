import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SwitchProps {
  onChange: (isChecked: boolean) => void;
  id: string;
  className: string;
  checked: boolean;
}

const SwitchComponent = ({ onChange }: SwitchProps) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center space-x-2 justify-center pb-8">
      <Label htmlFor="weekly-event">Weekly Event</Label>
      <Switch
        id="weekly-event"
        className=""
        checked={isChecked}
        onChange={handleToggle}
      />
      <Label htmlFor="big-event">Big Event</Label>
    </div>
  );
};

export default SwitchComponent;
