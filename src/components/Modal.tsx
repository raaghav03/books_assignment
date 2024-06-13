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
interface Language {
    value: string;
    label: string;
}
interface Authors {
    value: string;
    label: string;
}

interface ModalProps {
    categories: Category[];
    selectedCategories: Category[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    onFilter: () => void;
    authors: Authors[];
    selectedAuthors: Authors[];
    setSelectedAuthors: React.Dispatch<React.SetStateAction<Authors[]>>;
    languages: Language[];
    selectedLanguages: Language[];
    setSelectedLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

const Modal: React.FC<ModalProps> = ({
    categories,
    selectedCategories,
    setSelectedCategories,
    onFilter,
    authors,
    selectedAuthors,
    setSelectedAuthors,
    languages,
    selectedLanguages,
    setSelectedLanguages,
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
                            selected={selectedCategories}
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
                    {languages.length > 1 && (
                        <div className="flex flex-col items-start gap-2">
                            <h1>Search based on languages</h1>
                            <MultiSelect
                                options={languages}
                                selected={selectedLanguages}
                                setSelected={setSelectedLanguages}
                            />
                        </div>
                    )}
                    <Button onClick={handleFilterResults}>Filter Results</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;