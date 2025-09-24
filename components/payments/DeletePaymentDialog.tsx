import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeletePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeletePaymentDialog: React.FC<DeletePaymentDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  loading,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ödemeyi Sil</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Bu ödemeyi silmek istediğinizden emin misiniz?
      </DialogDescription>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={loading}
        >
          Vazgeç
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={loading}>
          {loading ? "Siliniyor..." : "Sil"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeletePaymentDialog;
