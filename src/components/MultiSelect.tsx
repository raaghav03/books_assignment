import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export type Category = {
    value: string;
    label: string;
};

const CATEGORIES: Category[] = [
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'biography', label: 'Biography' },
    { value: 'history', label: 'History' },
    { value: 'science', label: 'Science' },
    { value: 'technology', label: 'Technology' },
    { value: 'travel', label: 'Travel' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'art', label: 'Art' },
    { value: 'business', label: 'Business' },
];

interface MultiSelectProps {
    selectedCategories: Category[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function MultiSelect({ selectedCategories, setSelectedCategories }: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = React.useCallback((category: Category) => {
        setSelectedCategories((prev) => prev.filter((s) => s.value !== category.value));
    }, [setSelectedCategories]);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelectedCategories((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [setSelectedCategories]
    );

    const selectables = CATEGORIES.filter(
        (category) => !selectedCategories.includes(category)
    );

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent "
        >
            <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-1">
                    {selectedCategories.map((category) => {
                        return (
                            <Badge key={category.value} variant="secondary">
                                {category.label}
                                <button
                                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(category);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(category)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        );
                    })}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder="Choose your genre..."
                        className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectables.length > 0 ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((category) => {
                                    return (
                                        <CommandItem
                                            key={category.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() => {
                                                setInputValue("");
                                                setSelectedCategories((prev) => [...prev, category]);
                                            }}
                                            className={"cursor-pointer"}
                                        >
                                            {category.label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    );
}
