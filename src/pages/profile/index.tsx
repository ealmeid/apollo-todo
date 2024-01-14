import { useAuth, useUser } from "@clerk/nextjs";
import { Button, Text } from "@/components";
import * as z from "zod";
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

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
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

  const onSignOut = (e: any) => {
    e.preventDefault();
    signOut();
    router.push(routes.home);
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
            onClick={(e) => onSignOut(e)}
          >
            Sign out
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
