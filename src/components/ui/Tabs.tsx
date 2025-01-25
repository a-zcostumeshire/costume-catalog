import React, { ReactNode } from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  activeValue: string;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className }) => {
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child as React.ReactElement<any>, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ value, onValueChange, children, className }) => {
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, { onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, onValueChange, children, className }) => {
  return (
    <button onClick={() => onValueChange(value)} className={className}>
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, activeValue, children, className }) => {
  return activeValue === value ? <div className={className}>{children}</div> : null;
};