import NextLink from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components";
import { routes } from "@/routes";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username required",
  }),
  password: z.string().min(1, {
    message: "Password required",
  }),
});

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isLoaded) return;

    await signUp
      .create({
        username: values.username,
        password: values.password,
      })
      .then((result) => {
        setActive({ session: result.createdSessionId });
        router.push(routes.home);
      });
  };

  return (
    <div className="w-full max-w-[350px] m-auto mt-12 flex flex-col gap-8">
      <Text as="h3" className="text-center">
        Signup
      </Text>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full m-auto block my-4">
            Signup
          </Button>
        </form>
      </Form>
      <div className="inline-flex items-center gap-2 m-auto">
        <Text as="muted">Already have an account?</Text>
        <NextLink
          href="/login"
          className="text-sm text-primary underline underline-offset-4"
        >
          Log in
        </NextLink>
      </div>
    </div>
  );
}
