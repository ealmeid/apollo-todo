import NextLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

import * as z from "zod";

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
import { useApolloClient } from "@apollo/client";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username required",
  }),
  password: z.string().min(1, {
    message: "Password required",
  }),
});

export default function Login() {
  const apolloClient = useApolloClient();
  const { isLoaded, signIn, setActive } = useSignIn();
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

    await signIn
      .create({
        identifier: values.username,
        password: values.password,
      })
      .then((result: any) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          apolloClient.resetStore();
          router.push(routes.home);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  };

  return (
    <div className="w-full max-w-[350px] m-auto mt-12 flex flex-col gap-8">
      <Text as="h3" className="text-center">
        Login
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
            Login
          </Button>
        </form>
      </Form>
      <div className="inline-flex items-center gap-2 m-auto">
        <Text as="muted">Don&apos;t have an account?</Text>
        <NextLink
          href="/signup"
          className="text-sm text-primary underline underline-offset-4"
        >
          Sign up
        </NextLink>
      </div>
    </div>
  );
}
