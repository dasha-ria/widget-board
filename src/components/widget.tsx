export default function Widget({
  size = "small",
  className = "",
  children,
}: {
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
}) {
  const classes = ["rounded-xl", ...className.split(" ")];

  if (size === "small") {
    classes.push("col-span-1", "row-span-1");
  } else if (size === "medium") {
    classes.push("col-span-2", "row-span-1");
  } else if (size === "large") {
    classes.push("col-span-2", "row-span-2");
  }
  return <div className={classes.join(" ")}>{children}</div>;
}
