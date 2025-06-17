import { Breadcrumbs } from "../../components/Breadcrumbs";

export type Breadcrumb = {
  label: string;
  href?: string;
};

export const AppBreadcrumbs = ({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) => {
  return (
    <Breadcrumbs>
      {breadcrumbs.map((breadcrumb) => (
        <Breadcrumbs.Item key={breadcrumb.label} href={breadcrumb.href}>
          {breadcrumb.label}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
};
