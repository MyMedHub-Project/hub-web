"use client";

import { useContext } from "react";
import { SignInContext } from "@/app/auth/sign-in/context";

export const useSignIn = () => useContext(SignInContext);
