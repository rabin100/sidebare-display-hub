
import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}
interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {}
interface TimelineSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {}
interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative", className)}
      {...props}
    />
  )
);
Timeline.displayName = "Timeline";

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-6 flex last:mb-0", className)}
      {...props}
    />
  )
);
TimelineItem.displayName = "TimelineItem";

export const TimelineSeparator = React.forwardRef<HTMLDivElement, TimelineSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mr-4 flex flex-col items-center", className)}
      {...props}
    />
  )
);
TimelineSeparator.displayName = "TimelineSeparator";

export const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 pt-0.5", className)}
      {...props}
    />
  )
);
TimelineContent.displayName = "TimelineContent";

export const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "h-4 w-4 rounded-full bg-primary flex items-center justify-center",
        className
      )}
      {...props}
    />
  )
);
TimelineDot.displayName = "TimelineDot";

export const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto h-full w-0.5 bg-border mt-1", className)}
      {...props}
    />
  )
);
TimelineConnector.displayName = "TimelineConnector";
