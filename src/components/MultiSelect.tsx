import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Option = Record<"value" | "label", string>;

interface MultiSelectProps {
    options: Option[];
    selected: Option[];
    setSelected: React.Dispatch<React.SetStateAction<Option[]>>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selected, setSelected }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = React.useCallback((option: Option) => {
        setSelected((prev) => prev.filter((s) => s.value !== option.value));
    }, [setSelected]);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelected((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
            }
        },
        [setSelected]
    );

    return (
        <CommandPrimitive className="relative">
            <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
                <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div className="flex flex-wrap gap-1">
                        <CommandList>
                            {selected.map((option) => (
                                <Badge
                                    key={option.value}
                                    className="flex items-center space-x-1"
                                    variant="secondary"
                                >
                                    {option.label}
                                    <X
                                        onClick={() => handleUnselect(option)}
                                        className="h-4 w-4 cursor-pointer"
                                    />
                                </Badge>
                            ))}
                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="border-none focus:ring-0"
                            />
                        </CommandList>
                    </div>
                </div>
                <CommandGroup>
                    {options
                        .filter((option) =>
                            option.label.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    setSelected((prev) =>
                                        prev.find((s) => s.value === option.value)
                                            ? prev
                                            : [...prev, option]
                                    );
                                    setInputValue("");
                                }}
                            >
                                {option.label}
                            </CommandItem>
                        ))}
                </CommandGroup>
            </Command>
        </CommandPrimitive>
    );
};

export default MultiSelect;
