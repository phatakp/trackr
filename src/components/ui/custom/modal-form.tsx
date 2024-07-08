"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/media-query";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type ModalContextProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext({} as ModalContextProps);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal not used within Modal Context");

  const { open, setOpen } = context;
  const closeModal = useCallback(() => setOpen(false), [setOpen]);
  const openModal = useCallback(() => setOpen(true), [setOpen]);
  return { open, setOpen, closeModal, openModal };
}

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  form: ReactNode;
  defaultOpen?: boolean;
};
export function ModalForm({
  children,
  title,
  description,
  form,
  defaultOpen,
}: Props) {
  const [open, setOpen] = useState(!!defaultOpen ?? false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="capitalize">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="my-8">{form}</div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle className="capitalize">{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-8">{form}</div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </ModalContext.Provider>
  );
}
