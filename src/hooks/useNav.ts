import { useContext } from "react";
import { NavContext } from "@/app/home/context";

export const useNav = () => useContext(NavContext);
