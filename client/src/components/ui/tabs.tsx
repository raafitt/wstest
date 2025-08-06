import React from "react";

export interface Tab {
  label: string;
  value: 'param1' | 'param2';
}

interface TabsProps {
  tabs: Tab[];
  selected: string;
  onChange: (value: 'param1' | 'param2') => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, selected, onChange, className }) => {
  return (
    <div className={`flex border-b ${className || ""}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors ${
            selected === tab.value
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300"
          }`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
