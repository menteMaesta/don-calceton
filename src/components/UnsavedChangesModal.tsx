import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogProps,
} from "@reach/alert-dialog";
import { es } from "helpers/strings";
import { UNSAVED_CHANGES_MODAL_SELECTORS } from "helpers/test";
import Button from "components/Button";

interface UnsavedChangesModalProps extends Omit<AlertDialogProps, "children"> {
  onAccept: () => void;
  onCancel: () => void;
}
export default function UnsavedChangesModal({
  onAccept,
  onCancel,
  ...props
}: UnsavedChangesModalProps) {
  const dialogRef = useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={dialogRef}
      className={
        "px-4 py-2 rounded " +
        "bg-white dark:bg-slate-800 dark:text-slate-200 " +
        "w-11/12 sm:w-6/12 lg:w-4/12"
      }
      data-testid={UNSAVED_CHANGES_MODAL_SELECTORS.dialog}
      {...props}
    >
      <AlertDialogLabel className="text-lg text-center font-bold">
        {es.unsavedChangesModal.title}
      </AlertDialogLabel>
      <AlertDialogDescription className="my-2">
        {es.unsavedChangesModal.description}
      </AlertDialogDescription>
      <div className="flex w-full justify-between">
        <Button
          onClick={onCancel}
          className={
            "mr-2 bg-slate-200 " +
            "hover:bg-slate-300 active:bg-slate-400 " +
            "focus:bg-slate-400 text-slate-800"
          }
          data-testid={UNSAVED_CHANGES_MODAL_SELECTORS.cancel}
          ref={dialogRef}
        >
          {es.unsavedChangesModal.return}
        </Button>
        <Button
          onClick={onAccept}
          data-testid={UNSAVED_CHANGES_MODAL_SELECTORS.accept}
        >
          {es.unsavedChangesModal.continue}
        </Button>
      </div>
    </AlertDialog>
  );
}
