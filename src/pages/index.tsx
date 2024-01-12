import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Text, Label, Badge, Checkbox, Input } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="p-8 h-screen flex bg-gray-100">
      <div className="items-center flex flex-col gap-4 m-auto">
        <Text as="h1">Apollo Todo</Text>
        <Text as="lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
        <div className="flex gap-2">
          <Input />
          <Button>Button</Button>
        </div>
      </div>
    </div>
  );
}
