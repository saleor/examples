import { type HTMLAttributes } from "react";
import { Box, type PropsWithBox } from "@saleor/macaw-ui/next";
import classNames from "classnames";
import { skeleton } from "./Skeleton.css";

export type SkeletonProps = Omit<
  PropsWithBox<Omit<HTMLAttributes<HTMLDivElement>, "color">>,
  "dangerouslySetInnerHTML"
>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <Box
      className={classNames(skeleton, className)}
      backgroundColor="interactiveNeutralSecondaryPressing"
      width="100%"
      height={1}
      borderRadius={2}
      {...props}
    />
  );
};
