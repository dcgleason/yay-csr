import React from "react";

const LoadingSpinner = () => {

    return (
     <button type="button" className="bg-[#f8ad9d] hover:bg-[#f4978e] text-white font-bold pt-2 pb-2 px-4 mt-4 w-full rounded focus:outline-none focus:shadow-outline" disabled>
            <svg className="animate-spin h-5 w-5 mr-3 inline border-4 rounded-full" viewBox="0 0 24 24" xmlns='https://www.w3.org/TR/SVG2/' fill='none'>
                <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
            </svg>
            Processing...
      </button>
    );
};

export default LoadingSpinner;