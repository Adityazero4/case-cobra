"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { Rnd } from "react-rnd";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Description,
  Radio,
  RadioGroup,
  Label as RadioGroupLabel,
} from "@headlessui/react";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option.validator";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckIcon, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
  SaveConfigArgs,
  saveConfig as _saveConfig,
} from "@/app/configure/design/action";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: {
    width: number;
    height: number;
  };
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDimensions, setRenderedDimensions] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { startUpload } = useUploadThing("imageUploader");
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: saveConfig } = useMutation({
    mutationKey: ["saveConfig"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([_saveConfig(args), saveCongiguration()]);
    },
    onError: (err) => {
      toast({
        title: "Something went wrong",
        description: "There was a error on our end, please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  async function saveCongiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOfferset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOfferset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => {
        userImage.onload = resolve;
      });
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimensions.width,
        renderedDimensions.height
      );
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64toBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      const res = await startUpload([file], { configId });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          "There was a problem saving your config, please try again later",
        variant: "destructive",
      });
    }
  }

  function base64toBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        className="relative h-[37.5rem] overflow-hidden cols-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        ref={containerRef}
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
            ref={phoneCaseRef}
          >
            <NextImage
              alt="phone image"
              src="/phone-template.png"
              fill
              className="pointer-events-none z-50 select-none "
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-3px bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            width: imageDimensions.height / 4,
            height: imageDimensions.width / 4,
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
          onResizeStop={(_, __, ref, ____, { x, y }) => {
            setRenderedDimensions({
              width: parseInt(ref.style.width.slice(0, -2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            });
            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
        >
          <div className="relative h-full w-full">
            <NextImage
              src={imageUrl}
              alt="your image"
              fill
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] w-full col-span-full mt-6 lg:col-span-1 lg:mt-0 flex flex-col bg-white">
        <div className="h-px w-full bg-zinc-200 flex lg:hidden" />
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 top-0 h-12 bg-gradient-to-b from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customise your case
            </h2>
            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({ ...prev, color: val }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={({ focus, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: checked || focus,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        ></span>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex flex-col w-full gap-3">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"outline"}
                        role="combobox"
                        className="w-full justify-between focus:outline-none focus-visible:ring-0"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full mt-2">
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 p-1.5 items-center cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 w-4 h-4 text-primary",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          //name can be material or finish
                          [name]: val,
                        }));
                      }}
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <Radio
                            key={option.value}
                            value={option}
                            className={({ focus, checked }) =>
                              cn(
                                "relative cursor-pointer rounded-lg block bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 ring-0 focus:ring-0 sm:flex sm:justify-between focus:outline-none",
                                {
                                  "border-primary": checked || focus,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioGroupLabel className="font-md text-gray-900">
                                  {option.label}
                                </RadioGroupLabel>
                                {option.description && (
                                  <Description
                                    as="span"
                                    className="text-gray-500 "
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </Description>
                                )}
                              </span>
                            </span>

                            <Description
                              as="span"
                              className={
                                "mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                              }
                            >
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </Description>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.material.price + options.finish.price) /
                    100
                )}
              </p>
              <Button
                className="w-full"
                size={"sm"}
                onClick={() => {
                  saveCongiguration();
                }}
              >
                Continue <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
