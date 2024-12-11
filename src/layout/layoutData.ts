import React from "react";
import { AppleFilled, ContainerOutlined,TagOutlined, PictureOutlined} from "@ant-design/icons";

interface LayoutData {
  id: number;
  label: string;
  path: string;
  icon: React.ComponentType;
}

export const LayoutData: LayoutData[] = [
  {
    id: 1,
    label: "Category List",
    path: "/app",
    icon: ContainerOutlined,
  },
  {
    id: 2,
    label: "Sub Category List",
    path: "/app/sub-category",
    icon: TagOutlined,
  },
  {
    id: 3,
    label: "Banner",
    path: "/app/banner-list",
    icon: PictureOutlined,
  },
  {
    id: 4,
    label: "Brand",
    path: "/app/brand-list",
    icon: AppleFilled,
  }
];