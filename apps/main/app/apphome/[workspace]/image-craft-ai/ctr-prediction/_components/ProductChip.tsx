import classNames from "@nyx-frontend/main/utils/classNames";
import EditIcon from "./EditIcon";

type Product = {
  id: string;
  product_name: string;
};

type ProductChipProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onClick: (id: string, index: number) => void;
  index: number;
  selectedId: string;
};

function ProductChip({
  product,
  onEdit,
  onClick,
  index,
  selectedId,
}: ProductChipProps) {
  const isActive = selectedId === product.id;

  const onEditHandler = () => {
    onEdit(product);
  };

  const onClickHandler = () => {
    onClick(product.id, index);
  };

  return (
    <button
      className={classNames(
        "text-center  transition-colors group relative w-max p-2 rounded-md flex items-center gap-2 cursor-pointer hover:shadow-gray-800 shadow-none shadow-[#1D1138] hover:shadow-md",
        isActive ? "bg-[#5E32FF] text-nyx-yellow " : "bg-[#1D1138] text-white",
      )}
      onClick={onClickHandler}
      title={product?.product_name}
    >
      <span className="text-sm font-medium w-full">
        {product?.product_name}
      </span>
      <span
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer pt-0.5"
        onClick={onEditHandler}
      >
        <EditIcon className="w-3 h-3 text-white" />
      </span>
    </button>
  );
}

export default ProductChip;
