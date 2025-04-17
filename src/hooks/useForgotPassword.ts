"use client";

import { useContext } from "react";
import { ForgotPasswordContext } from "@/app/auth/forgot-password/context";

export const useForgotPassword = () => useContext(ForgotPasswordContext);
