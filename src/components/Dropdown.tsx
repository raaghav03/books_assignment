import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownProps {
    items: { value: string; label: string }[];
    selectedValue: string | null;
    setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
    label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ items, selectedValue, setSelectedValue, label }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {selectedValue ? `${label}: ${selectedValue}` : `Select ${label}`}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select {label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedValue || ""} onValueChange={setSelectedValue}>
                    <DropdownMenuRadioItem value="">
                        None
                    </DropdownMenuRadioItem>
                    {items.map((item) => (
                        <DropdownMenuRadioItem key={item.value} value={item.value}>
                            {item.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Dropdown;
