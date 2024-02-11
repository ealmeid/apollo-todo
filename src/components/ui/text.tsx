import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextProps extends React.InputHTMLAttributes<HTMLDivElement> {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "p"
    | "link"
    | "blockquote"
    | "code"
    | "lead"
    | "muted";
  href?: string;
}

const Text = React.forwardRef<HTMLDivElement, TextProps>(
  ({ className, as = "p", href = "#", children, ...props }, ref) => {
    switch (as) {
      case "h1":
        return (
          <h1
            className={cn(
              className,
              "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
            )}
          >
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2
            className={cn(
              className,
              "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
            )}
          >
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3
            className={cn(
              className,
              "scroll-m-20 text-2xl font-semibold tracking-tight"
            )}
          >
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4
            className={cn(
              className,
              "scroll-m-20 text-xl font-semibold tracking-tight"
            )}
          >
            {children}
          </h4>
        );
      case "p":
        return (
          <p className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}>
            {children}
          </p>
        );
      case "link":
        return (
          <a
            href={href}
            className="font-medium text-primary underline underline-offset-4"
          >
            {children}
          </a>
        );
      case "blockquote":
        return (
          <blockquote className={cn(className, "mt-6 border-l-2 pl-6 italic")}>
            {children}
          </blockquote>
        );
      case "code":
        return (
          <code
            className={cn(
              className,
              "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
            )}
          >
            {children}
          </code>
        );
      case "lead":
        return (
          <p className={cn(className, "text-xl text-muted-foreground")}>
            {children}
          </p>
        );
      case "muted":
        return (
          <p className={cn(className, "text-sm text-muted-foreground")}>
            {children}
          </p>
        );
      default:
        return <></>;
    }
  }
);

Text.displayName = "Text";

export { Text };
