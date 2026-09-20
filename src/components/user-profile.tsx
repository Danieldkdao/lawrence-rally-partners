import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserProfile = ({
  name,
  image,
  className,
  textClassName,
}: {
  name: string;
  image?: string | null | undefined;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <Avatar className={cn("shrink-0", className)}>
      <AvatarImage src={image || undefined} alt={`${name} profile image`} />
      <AvatarFallback className={cn(textClassName)}>
        {name
          .split(" ")
          .map((part) => part?.[0].toUpperCase())
          .filter(Boolean)
          .slice(0, 2)
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};
