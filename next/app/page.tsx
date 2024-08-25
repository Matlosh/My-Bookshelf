import { Input } from '@nextui-org/react';

export default function Page() {
  return (
    <div>
      <p>Yahello</p>
      <Input type="email" label="Email" labelPlacement="outside" startContent={<p>a</p>} />
    </div>
  );
}
