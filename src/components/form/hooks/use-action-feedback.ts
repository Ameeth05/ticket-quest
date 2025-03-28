import { useEffect } from "react";
import { ActionState } from "../utils/to-action-state";

type UseActionFeedbackOptions = {
  onSuccess?: ({ actionState }: { actionState: ActionState }) => void;
  onError?: ({ actionState }: { actionState: ActionState }) => void;
};

export const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      //   console.log(actionState.message);
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      //   console.log(actionState.message);
      options.onError?.({ actionState });
    }
  }, [actionState, options]);
};
