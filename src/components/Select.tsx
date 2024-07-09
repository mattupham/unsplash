import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  Select as SelectShadcn,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  selectedValue: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
}

export const Select = ({
  selectedValue,
  placeholder,
  options,
  onValueChange,
}: SelectProps) => (
  <SelectShadcn value={selectedValue} onValueChange={onValueChange}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{placeholder} Options</SelectLabel>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </SelectShadcn>
);
