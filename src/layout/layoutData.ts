import React from "react";
import { UserOutlined } from "@ant-design/icons";

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
    icon: UserOutlined,
  },
];