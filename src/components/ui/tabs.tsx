import React, { useState, ReactNode } from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

interface TabsListProps {
  children: ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  return (
    <div>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps & { value: string; onValueChange: (value: string) => void }> = ({ value, onValueChange, children }) => {
  return (
    <div>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps & { value: string; onValueChange: (value: string) => void }> = ({ value, onValueChange, children }) => {
  return (
    <button onClick={() => onValueChange(value)}>
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps & { value: string; activeValue: string }> = ({ value, activeValue, children }) => {
  return activeValue === value ? <div>{children}</div> : null;
};
