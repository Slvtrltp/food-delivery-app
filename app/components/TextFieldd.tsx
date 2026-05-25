import React from "react";
type TextFieldProps = {
  error: string;
  placeholder: string;
  type: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required: boolean;
};

export const TextField = ({
  error,
  placeholder,
  type,
  onChange,
  value,
}: TextFieldProps) => {
  return (
    <div className="flex flex-col">
      <input
        className={`outline-none border border-[#E4E4E7] w-full h-[36px] rounded-md p-2 focus:ring-1  `}
        placeholder={placeholder}
        type={type}
        id="input"
        onChange={onChange}
        value={value}
        required={true}
      ></input>
      {error && (
        <div className="text-[#E14942] whitespace-pre-line text-[14px]">
          {error}
        </div>
      )}
    </div>
  );
};
