import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  children: React.ReactNode;
  actionState: ActionState;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionsState: ActionState) => void;
};
export default function Form({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
      onError?.(actionState);
    },
  });
  return (
    <form action={action} className="flex flex-col gap-3">
      {children}
    </form>
  );
}
