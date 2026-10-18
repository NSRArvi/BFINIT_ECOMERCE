import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentMethodSkeleton({ count = 3 }) {
  return (
    <ItemGroup>
      {Array.from({ length: count }, (_, i) => (
        <Item key={i} variant="outline">
          <ItemMedia variant="icon">
            <Skeleton className="size-4" />
          </ItemMedia>

          <ItemContent>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <Skeleton className="h-3.5 w-64 max-w-full" />
          </ItemContent>

          <ItemActions>
            <Skeleton className="h-5 w-9 rounded-full" />
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
