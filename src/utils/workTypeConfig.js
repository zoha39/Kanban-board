import { Zap, Bookmark, SquareCheckBig } from "lucide-react";

export const WORK_TYPE_CONFIG = {
  Epic: {
    icon: Zap,
    color: "text-purple-500",
    fill: "fill-purple-500",
  },

  Task: {
    icon: SquareCheckBig,
    color: "text-blue-500",
    fill: "",
  },

  Story: {
    icon: Bookmark,
    color: "text-green-500",
    fill: "fill-green-500",
  },
};
