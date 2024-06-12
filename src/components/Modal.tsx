import React from "react";
import MultiSelect from "./MultiSelect";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface Category {
    value: string;
    label: string;
}

interface Authors {
    value: string;
    label: string;
}

interface ModalProps {
    categories: Category[];
    selectedCategories: Category[]; // Ensure this is initialized as an empty array
    setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    onFilter: () => void;
    authors: Authors[];
    selectedAuthors: Authors[];
    setSelectedAuthors: React.Dispatch<React.SetStateAction<Authors[]>>;
}

const Modal: React.FC<ModalProps> = ({
    categories,
    selectedCategories,
    setSelectedCategories,
    onFilter,
    authors,
    selectedAuthors,
    setSelectedAuthors,
}) => {
    const handleFilterResults = () => {
        onFilter();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Advanced Search</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex flex-col items-start gap-2">
                        <h1>Search based on categories</h1>
                        <MultiSelect
                            options={categories}
                            selected={selectedCategories} // Ensure selected categories are empty initially
                            setSelected={setSelectedCategories}
                        />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h1>Search based on authors</h1>
                        <MultiSelect
                            options={authors}
                            selected={selectedAuthors}
                            setSelected={setSelectedAuthors}
                        />
                    </div>
                    <Button onClick={handleFilterResults}>Filter Results</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
