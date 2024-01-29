import * as z from "zod";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button, Text } from "@/components";
import { useRouter } from "next/router";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const apolloClient = useApolloClient();
  const router = useRouter();

  const formSchema = z.object({
    username: z.string().min(1, {
      message: "Username required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username ?? "fdsfds",
    },
  });

  const onSignOut = async (e: any) => {
    e.preventDefault();
    await signOut()
      .then(() => {
        apolloClient.resetStore();
        router.push(routes.home);
      })
      .catch(() => {
        setIsSigningOut(false);
      });
  };

  return (
    <div className="w-full flex flex-col items-center p-4 h-auto gap-8 pt-8">
      <Text as="h3">Profile</Text>
      <Form {...form}>
        <form
          onSubmit={() => {} /*form.handleSubmit(onSubmit)*/}
          className="space-y-8"
        >
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
          <Button type="submit" className="w-full m-auto block my-4">
            Save Changes
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={async (e) => {
              setIsSigningOut(true);
              await onSignOut(e);
            }}
          >
            {isSigningOut ? (
              <Loader2 className="animate-spin"></Loader2>
            ) : (
              "Sign out"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
