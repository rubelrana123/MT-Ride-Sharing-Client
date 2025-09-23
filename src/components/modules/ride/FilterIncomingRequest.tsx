import { Button } from "@/components/ui/button";
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { sortOptions } from "@/constants";
import type { Dispatch, SetStateAction } from "react";

interface IFilterIncomingRequest {

  sortValue: string;
  setSortValue: Dispatch<SetStateAction<string>>;
  handleResetFilterr: () => void
}

export default function FilterIncomingRequest( {   sortValue,   setSortValue, handleResetFilterr }: IFilterIncomingRequest ) {
  return (
    <div className="mb-10 flex items-center flex-wrap gap-5">
      <div className="flex items-center h-8 max-w-52 bg-card w-fit p-0 rounded border">
 

        <Separator orientation="vertical" color="#fff" />
 
      </div>
      <Select value={sortValue} onValueChange={setSortValue}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleResetFilterr} size="lg" className="cursor-pointer">
        Reset
      </Button>
    </div>
  );
}
