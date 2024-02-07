export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "none"
    | "primary"
    | "danger"
    | "success"
    | "warning"
    | "outline-danger"
    | "outline-warning"
    | "outline-success"
    | "outline-primary"
    | "github"
    | "google";
  square?: boolean;
  paddingLess?: boolean;
}

export default function Button({
  className,
  children,
  variant,
  square,
  paddingLess,
  type = "button",
  ...props
}: IButtonProps): JSX.Element {
  const getVariant = () => {
    switch (variant) {
      case "none":
        return "text-black";
      case "primary":
        return "bg-customLogoColor-500 text-white";
      case "danger":
        return "bg-red-500 hover:bg-red-700 text-white";
      case "success":
        return "bg-green-500 hover:bg-green-700 text-white";
      case "warning":
        return "bg-amber-500 hover:bg-amber-700 text-white";
      case "outline-danger":
        return "bg-white text-red-500 border border-red-500 hover:text-white hover:bg-red-700";
      case "outline-danger":
        return "bg-white text-red-500 border border-red-500 hover:text-white hover:bg-red-700";
      case "outline-success":
        return "bg-white text-green-500 border border-green-500 hover:text-white hover:bg-green-700";
      case "outline-warning":
        return "bg-white text-amber-400 border border-amber-500 hover:text-white hover:bg-amber-500";
      case "outline-primary":
        return "bg-white text-black border border-customLogoColor-500 hover:text-white hover:bg-customLogoColor-100";
      case "github":
        return "bg-black text-white border border-black-500 hover:bg-gray-700";
      case "google":
        return "bg-white text-black border border-black hover:bg-gray-200";
      default:
        return "bg-customLogoColor-500 hover:bg-customLogoColor-800 text-white shadow shadow-violet-600/25 hover:shadow-violet-600/75";
    }
  };

  return (
    <button
      {...props}
      type={type}
      className={`${getVariant()}  transition duration-300  ${
        !paddingLess && "py-2 px-4"
      }  ${!square && "rounded-lg"} active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
