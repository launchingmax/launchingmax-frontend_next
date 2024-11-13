import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface IDialogStyle {
  dialogContent?: string;
}

interface IMyDialog {
  dialogTrigger?: React.ReactNode;
  dialogTitle?: string;
  dialogDes?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  showFooter?: boolean;
  open?: boolean;
  setOpen?: any;
  className?: IDialogStyle;
}

const MyDialog: React.FC<IMyDialog> = ({
  dialogTrigger,
  dialogTitle,
  dialogDes,
  body,
  footer,
  showFooter = "true",
  open,
  setOpen,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent
        className={cn(
          `bg-white dark:bg-launchingBlue-8 dark:border-launchingBlue-8 w-auto max-w-full`,
          className?.dialogContent
        )}
      >
        {dialogTitle && (
          <DialogHeader>
            <DialogTitle className="place-self-start">{dialogTitle}</DialogTitle>
            <DialogDescription className="place-self-start">{dialogDes}</DialogDescription>
          </DialogHeader>
        )}

        {body}

        {showFooter && (
          <DialogFooter className="flex-row justify-end space-x-2">
            {footer}
            {/* <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose> */}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
