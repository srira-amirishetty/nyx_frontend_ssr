/* eslint-disable @next/next/no-img-element */
import Button from "@nyx-frontend/main/components/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "./AddProductSchema";
import classNames from "@nyx-frontend/main/utils/classNames";
import { useMutation } from "@tanstack/react-query";
import { addProductServices } from "@nyx-frontend/main/services/brandService";
import FileFrame from "./FileFrame";

export default function AddProduct({
  onClose = () => {},
  onSuccess = (res) => {},
}: {
  onClose: () => void;
  onSuccess: (res: any) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(AddProductSchema),
  });

  const mutateAddProductFile = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProductServices,
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("productName", data.productName);
    if (data.logo?.length > 0) {
      formData.append("productLogo", data.logo[0]);
    }
    formData.append("description", data.productDescription);

    mutateAddProductFile.mutate(formData, {
      onSuccess: (response: any) => {
        onSuccess(response);
      },
      onError: () => {
        console.log("ERROR !");
      },
    });
  };

  const fileLogo = watch("logo");

  const onCloseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between mt-5 overflow-y-scroll max-h-64">
        <div className="text-xl font-bold text-white">Add Product</div>
        <button className="pr-3 cursor-pointer" onClick={onCloseHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="#FFFFFF"
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
            />
          </svg>
        </button>
      </div>
      <div className="w-full my-5 flex flex-col gap-5">
        <div className="w-full flex flex-col gap-2">
          <div className="text-white text-base">Product Name *</div>
          <input
            type="text"
            className="placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-white"
            placeholder="Add Product Name"
            {...register("productName", { required: true })}
          />
          {errors?.productName ? (
            <p className="text-red-300 text-sm">{`${errors?.productName?.message}`}</p>
          ) : null}
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-white text-base">Product Description *</div>
          <input
            type="text"
            className="placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-white"
            placeholder="Product Description"
            {...register("productDescription")}
          />
          {errors?.productDescription ? (
            <p className="text-red-300 text-sm">{`${errors?.productDescription?.message}`}</p>
          ) : null}
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-white text-base">Product Logos</div>
          {fileLogo?.length > 0 ? <FileFrame file={fileLogo?.[0]} /> : null}
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <div
                className={classNames(
                  "w-full mt-3",
                  fileLogo?.length > 0 ? "hidden" : ""
                )}
              >
                <div className="bg-[#452A80] w-[150px] h-[55px] rounded-t-lg text-[#FFF] p-2">
                  Add Logo
                </div>
                <div className="bg-[#6653B4] w-[150px] h-[99px] rounded-b-lg flex justify-center items-center flex-col">
                  <label className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal">
                    <input
                      type="file"
                      className="hidden border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                      placeholder="Product Logo"
                      onChange={(e) => field.onChange(e.target?.files)}
                    />
                    <svg
                      viewBox="0 0 17 17"
                      className="w-4 h-4 fill-current text-nyx-yellow"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                    </svg>
                  </label>
                </div>
              </div>
            )}
          />
        </div>

        <div className="w-full flex gap-4 mt-6 justify-center items-center">
          <Button className="rounded-full w-40" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button
            className="rounded-full w-40"
            type="submit"
            disabled={mutateAddProductFile.isPending}
          >
            {mutateAddProductFile.isPending ? "Creating..." : "Next"}
          </Button>
        </div>
      </div>
    </form>
  );
}
