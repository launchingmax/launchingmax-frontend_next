import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CgMoon } from "react-icons/cg";

interface IMyDialog {
  dialogTrigger?: React.ReactNode;
  dialogTitle?: string;
  dialogDes?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  showFooter?: boolean;
  open?: boolean;
  setOpen?: any
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
}) => {
  return (
    <Dialog open={open}  onOpenChange={setOpen}>
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent className="bg-white dark:bg-launchingBlack">
        <DialogHeader>
          <DialogTitle className="place-self-start">{dialogTitle}</DialogTitle>
          <DialogDescription className="place-self-start">{dialogDes}</DialogDescription>
        </DialogHeader>

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
