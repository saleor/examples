import { Text } from "@saleor/macaw-ui/next";
import Link from "next/link";
import { separator, link } from "./Breadcrumbs.css";

type Breadcrumb = { text: string; link?: string };
type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <Text as="h1" variant="hero" size="medium">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={`${breadcrumb.text}_${index}`} title={`Go to ${breadcrumb.text} page`}>
          {breadcrumb.link ? (
            <Link className={link} href={breadcrumb.link}>
              {breadcrumb.text}
            </Link>
          ) : (
            breadcrumb.text
          )}
          <span className={separator}>{index < breadcrumbs.length - 1 && " / "}</span>
        </span>
      ))}
    </Text>
  );
};
