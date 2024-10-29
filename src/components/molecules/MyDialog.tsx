import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CgMoon } from "react-icons/cg";

interface IMyDialog {
  dialogTrigger?: React.ReactNode;
  dialogTitle: string;
  dialogDes: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const MyDialog: React.FC<IMyDialog> = ({ dialogTrigger, dialogTitle, dialogDes, body, footer }) => {
  return (
    <Dialog>
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent
        className="fixed  h-max w-full max-w-md bg-white p-6 shadow-lg
          transition-all duration-500 ease-in
           data-[state=open]:-translate-x-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-15"
      >
        <DialogHeader>
          <DialogTitle className="place-self-start">{dialogTitle}</DialogTitle>
          <DialogDescription className="place-self-start">{dialogDes}</DialogDescription>
        </DialogHeader>

        {body}

        <DialogFooter className="flex-row justify-end space-x-2">
          {footer}
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
