"use client";

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

export function SubmitButton({
  children,
  disabled,
  loading = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium leading-5 text-white transition bg-zinc-800 disabled:opacity-20"
    >
      {children}
    </button>
  );
}
