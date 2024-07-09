import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectComponentProps {
  selectedValue: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
}

export const SelectComponent = ({
  selectedValue,
  placeholder,
  options,
  onValueChange,
}: SelectComponentProps) => (
  <Select value={selectedValue} onValueChange={onValueChange}>
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
  </Select>
);
