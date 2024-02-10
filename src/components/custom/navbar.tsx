import NextLink from "next/link";
import {
  GanttChartSquare,
  HomeIcon,
  Info,
  User2,
  UserRoundX,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Text,
} from "@/components";

export const NavBar = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <div className="bg-gray-200 rounded-2xl p-3 px-6 flex gap-8 m-auto max-w-max shadow-md">
      <NextLink href="/">
        <HomeIcon />
      </NextLink>
      <NextLink href="/lists">
        <GanttChartSquare />
      </NextLink>
      {isSignedIn ? (
        <NextLink href="/profile">
          <User2 />
        </NextLink>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NextLink href="/login">
                <UserRoundX />
              </NextLink>
            </TooltipTrigger>
            <TooltipContent>
              <Text as="p">Login or Signup</Text>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <Info />
    </div>
  );
};
