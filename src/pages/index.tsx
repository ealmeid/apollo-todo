import { Button, Text, Input } from "@/components";

export default function Home() {
  return (
    <div className="items-center flex flex-col gap-8 m-auto mt-24">
      <Text as="h1">apollo todo</Text>
      <Text as="lead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <div className="flex gap-2">
        <Input placeholder="Pick up pasta..." />
        <Button>Add</Button>
      </div>
    </div>
  );
}
