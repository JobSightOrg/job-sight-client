export interface IDropdownProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export default function Dropdown({
  className,
  children,
  ...props
}: IDropdownProps) {
  return (
    <button
      {...props}
      type="button"
      className="inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      aria-expanded="true"
      aria-haspopup="true"
    >
      <p className="w-full text-left">Test</p>
      <span className="self-stretch w-[1px] bg-gray-400 box-border"></span>
      <svg
        className="-mr-1 h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
