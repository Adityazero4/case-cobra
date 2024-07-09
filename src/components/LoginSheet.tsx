import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui/drawer";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "./ui/button";

const LoginSheet = ({
  open,
  setOpen,
  onClose,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const windowSize = useWindowSize();
  const { width } = windowSize;
  return (
    <>
      {width >= 1024 ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="absolute z-[999999]">
            <DialogHeader>
              <div className="relative mx-auto w-24 h-24 mb-2">
                <Image
                  src="/snake-1.png"
                  alt="snake image"
                  className="object-contain"
                  fill
                />
              </div>
              <DialogTitle className="text-3xl text-center tracking-tight font-bold text-gray-900">
                Login to continue
              </DialogTitle>
              <DialogDescription className="text-base text-center py-2 text-zinc-400">
                <span className="font-medium text-zinc-900">
                  Your configuration was saved!
                </span>{" "}
                Please login to create an account to complete your purchase.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
              <LoginLink
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Login
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  variant: "default",
                })}
              >
                Sign up
              </RegisterLink>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen} onClose={onClose}>
          <DrawerContent className="p-6 pt-0 absolute z-[999999]">
            <DrawerHeader>
              <div className="relative mx-auto w-24 h-24 mb-2">
                <Image
                  src="/snake-1.png"
                  alt="snake image"
                  className="object-contain"
                  fill
                />
              </div>
              <DrawerTitle className="text-3xl text-center tracking-tight font-bold text-gray-900">
                Login to continue
              </DrawerTitle>
              <DrawerDescription className="text-base text-center py-2">
                <span className="font-medium text-zinc-900">
                  Your configuration was saved!
                </span>{" "}
                Please login to create an account to complete your purchase.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
              <LoginLink
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Login
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  variant: "default",
                })}
              >
                Sign up
              </RegisterLink>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default LoginSheet;
