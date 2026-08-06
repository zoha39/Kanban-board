import { Circle, LoaderCircle, CircleCheckBig } from "lucide-react";

export const STATUS_CONFIG = {
  todo: {
    icon: Circle,
    color: "text-gray-500",
  },

  "in-progress": {
    icon: LoaderCircle,
    color: "text-blue-500",
  },

  completed: {
    icon: CircleCheckBig,
    color: "text-green-500",
  },
};
