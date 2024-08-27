import { Input } from "@nextui-org/react";
import { BiSolidEnvelope } from "react-icons/bi";
import {getSession} from "./auth";

export default function Page() {
  const session = getSession();

  return (
    <div>

    </div>
  );
}
