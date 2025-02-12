import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Select = SelectPrimitive.Root;

export const SelectTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className="inline-flex items-center justify-between rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  >
    {children}
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

export const SelectValue = SelectPrimitive.Value;

export const SelectContent = React.forwardRef(({ children, ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    className="overflow-hidden rounded-md border border-gray-700 bg-gray-800 text-white"
    {...props}
  >
    <SelectPrimitive.ScrollUpButton>
      <ChevronUp className="h-4 w-4 opacity-50" />
    </SelectPrimitive.ScrollUpButton>
    <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    <SelectPrimitive.ScrollDownButton>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.ScrollDownButton>
  </SelectPrimitive.Content>
));

export const SelectItem = React.forwardRef(({ children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focus:bg-gray-700"
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));