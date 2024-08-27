import Image from "next/image";
import LoginForm from "./login-form";
import Waterfall from '@/public/waterfall.webp';

export default function Page() {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>

      <div className="w-1/2">
        <Image src={Waterfall} width={1920} height={1086} alt="Form picture" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
