"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "../user-provider";
import { Logo } from "./auth-form";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="bg-white w-full flex justify-center items-center">
      <div className=" w-full h-17 flex justify-center items-center container">
        <div className="w-full flex justify-between items-center">
          <Logo />
          {user ? (
            <div>
              <div className="flex gap-3.25">
                <div className="px-3 py-2 flex gap-1 justify-center items-center bg-white rounded-3xl cursor pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="19"
                    viewBox="0 0 15 19"
                    fill="none"
                  >
                    <path
                      d="M14.0833 7.41667C14.0833 12.4167 7.41667 17.4167 7.41667 17.4167C7.41667 17.4167 0.75 12.4167 0.75 7.41667C0.75 5.64856 1.45238 3.95286 2.70262 2.70262C3.95286 1.45238 5.64856 0.75 7.41667 0.75C9.18478 0.75 10.8805 1.45238 12.1307 2.70262C13.381 3.95286 14.0833 5.64856 14.0833 7.41667Z"
                      stroke="#448A5B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.41667 9.91667C8.79738 9.91667 9.91667 8.79738 9.91667 7.41667C9.91667 6.03595 8.79738 4.91667 7.41667 4.91667C6.03596 4.91667 4.91667 6.03595 4.91667 7.41667C4.91667 8.79738 6.03596 9.91667 7.41667 9.91667Z"
                      stroke="#448A5B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[12px] text-[#448A5B]">
                    Delivery address:{" "}
                    <span className="text-[12px] text-[#71717A] cursor pointer">
                      {"Add location"}
                    </span>
                  </p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="#18181B"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="py-2 px-2.5 bg-white rounded-4xl flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M1.36621 1.36621H2.69954L4.47288 9.64621C4.53793 9.94945 4.70666 10.2205 4.95002 10.4128C5.19338 10.605 5.49615 10.7064 5.80621 10.6995H12.3262C12.6297 10.6991 12.9239 10.5951 13.1602 10.4048C13.3966 10.2145 13.561 9.94923 13.6262 9.65288L14.7262 4.69954H3.41288M5.99954 13.9995C5.99954 14.3677 5.70107 14.6662 5.33288 14.6662C4.96469 14.6662 4.66621 14.3677 4.66621 13.9995C4.66621 13.6314 4.96469 13.3329 5.33288 13.3329C5.70107 13.3329 5.99954 13.6314 5.99954 13.9995ZM13.3329 13.9995C13.3329 14.3677 13.0344 14.6662 12.6662 14.6662C12.298 14.6662 11.9995 14.3677 11.9995 13.9995C11.9995 13.6314 12.298 13.3329 12.6662 13.3329C13.0344 13.3329 13.3329 13.6314 13.3329 13.9995Z"
                      stroke="#18181B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="py-2 px-2.5 bg-[#448A5B] rounded-4xl flex justify-center items-center "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12.6663 14V12.6667C12.6663 11.9594 12.3854 11.2811 11.8853 10.781C11.3852 10.281 10.7069 10 9.99967 10H5.99967C5.29243 10 4.61415 10.281 4.11406 10.781C3.61396 11.2811 3.33301 11.9594 3.33301 12.6667V14M10.6663 4.66667C10.6663 6.13943 9.47243 7.33333 7.99967 7.33333C6.52691 7.33333 5.33301 6.13943 5.33301 4.66667C5.33301 3.19391 6.52691 2 7.99967 2C9.47243 2 10.6663 3.19391 10.6663 4.66667Z"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {isOpen && (
                    <div className="absolute top-20 flex flex-col justify-center items-center w-60 h-20 rounded-lg bg-white shadow-lime-200 z-10 transition-all duration-500 ease-in-out border border border-green-100">
                      <ul className="text-[14px] ">{user.email}</ul>
                      <ul
                        onClick={handleSignOut}
                        className="text-[#448A5B] cursor-pointer transition-all duration-200 hover:opacity-80"
                      >
                        Sign out
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="py-[8px] px-[12px] bg-[#448A5B] rounded-4xl text-white text-center cursor-pointer "
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
