import * as React from "react";

export interface TextProps extends React.InputHTMLAttributes<HTMLDivElement> {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "p"
    | "blockquote"
    | "code"
    | "lead"
    | "muted";
}

const Text = React.forwardRef<HTMLDivElement, TextProps>(
  ({ className, as = "p", children, ...props }, ref) => {
    switch (as) {
      case "h1":
        return (
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
          </h4>
        );
      case "p":
        return (
          <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
        );
      case "blockquote":
        return (
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
          </blockquote>
        );
      case "code":
        return (
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
          </code>
        );
      case "lead":
        return <p className="text-xl text-muted-foreground">{children}</p>;
      case "muted":
        return <p className="text-sm text-muted-foreground">{children}</p>;
      default:
        return <></>;
    }
  }
);

Text.displayName = "Text";

export { Text };
