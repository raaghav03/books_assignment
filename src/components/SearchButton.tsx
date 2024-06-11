import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the type for a book (simplified version)
interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        imageLinks?: {
            thumbnail: string;
        };
    };
}

// Define the props interface for the SearchButton component
interface SearchButtonProps {
    setSearchResults: (results: Book[]) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ setSearchResults }) => {
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
        if (!apiKey) {
            console.error("API key is not defined");
            return;
        }

        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
            );
            setSearchResults(response.data.items);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <>
            <div className="flex flex-row gap-2">
                <Input
                    type="text"
                    placeholder="Search Now"
                    className="w-64"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={handleSearch} className="bg-black">
                    Search
                </Button>
            </div>
        </>
    );
};

export default SearchButton;
