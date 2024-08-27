import {Button, Input} from "@nextui-org/react";
import {BiSolidLock, BiSolidUser} from "react-icons/bi";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl font-bold">My Bookshelf</h2>

      <div className="flex flex-col gap-2">
        <p className="text-xl">Login</p>

        <Input type="text" placeholder="User" startContent={<BiSolidUser className="w-6 h-6 fill-neutral-400" />} className="shadow-md rounded-xl" />
        <Input type="password" placeholder="Password" startContent={<BiSolidLock className="w-6 h-6 fill-neutral-400" />} className="shadow-md rounded-xl" />

        <Button color="primary" variant="shadow">
          Sign in
        </Button>
      </div>
    </div>
  );
}
