import React, { useEffect, useState } from "react";
import MultiSelect from "./MultiSelect";
import Dropdown from "./Dropdown";
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
    years: { value: string; label: string }[];
    startYear: string | null;
    setStartYear: React.Dispatch<React.SetStateAction<string | null>>;
    endYear: string | null;
    setEndYear: React.Dispatch<React.SetStateAction<string | null>>;
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
    years,
    startYear,
    setStartYear,
    endYear,
    setEndYear,
}) => {
    const [endYearOptions, setEndYearOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        if (startYear) {
            const filteredYears = years.filter((year) => parseInt(year.value) > parseInt(startYear));
            setEndYearOptions(filteredYears);
        } else {
            setEndYearOptions(years);
        }
    }, [startYear, years]);

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
                    <div className="flex flex-col items-start gap-2">
                        <h1>Search based on publication years</h1>
                        <Dropdown
                            items={years}
                            selectedValue={startYear}
                            setSelectedValue={setStartYear}
                            label="Start Year"
                        />
                        <Dropdown
                            items={endYearOptions}
                            selectedValue={endYear}
                            setSelectedValue={setEndYear}
                            label="End Year"
                        />
                    </div>
                    <Button onClick={handleFilterResults}>Filter Results</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
