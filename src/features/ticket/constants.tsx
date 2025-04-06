import { CircleCheck, FileText, Pencil } from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <FileText />,
  IN_PROGRESS: <Pencil />,
  DONE: <CircleCheck />,
};

export const TICKET_ICONS_LABELS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
