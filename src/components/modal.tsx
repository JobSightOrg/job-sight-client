import React from "react";

export type Props = {
  isVisible: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  isVisible,
  title,
  children,
  onClose,
}: Props): JSX.Element | null {
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLElement>): void => {
    if ((e.target as HTMLElement)?.id === "wrapper") onClose();
  };

  return (
    <div
      className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[500px] bg-white items-start border-b rounded dark:border-gray-600">
        <div className="h-[60px] flex justify-between items-center px-4 border-b-2 border-black">
          <h3 className="text-gray-900 text-xl lg:text-2xl font-bold dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => onClose()}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
