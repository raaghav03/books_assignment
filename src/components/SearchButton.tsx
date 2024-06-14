import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the type for a book (simplified version)
export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        imageLinks?: {
            thumbnail: string;
        };
        subtitle: string;
        categories: string[];
        previewLink: string;
        publisher: string;
        description: string;
        language: string;
        publishedDate: React.ReactNode;
    };
    saleInfo: {
        retailPrice: { amount: number; currencyCode: string };
    };
}
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;
export interface Language {
    value: string;
    label: string;
}
// Define the props interface for the SearchButton component
interface SearchButtonProps {
    setSearchResults: (results: Book[]) => void;
    setError: (error: string | null) => void;
}
axios.defaults.baseURL = "https://www.googleapis.com";
const SearchButton: React.FC<SearchButtonProps> = ({
    setSearchResults,
    setError,
}) => {
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        setError(null);

        if (!query.trim()) {
            setError("Please enter a search query.");
            return;
        }

        // Check for cached data
        const cachedData = localStorage.getItem(`search_${query}`);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (Date.now() - parsedData.timestamp < CACHE_EXPIRY) {
                console.log("Using cached data for query:", query);
                console.log("Cached data:", parsedData.results);
                setSearchResults(parsedData.results);
                return;
            } else {
                console.log("Cached data expired for query:", query);
                localStorage.removeItem(`search_${query}`); // Remove expired cache
            }
        } else {
            console.log("Hitting Api Call", query);
        }

        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`);
            if (response.data.items && response.data.items.length > 0) {
                // Cache the fetched data
                const dataToCache = {
                    timestamp: Date.now(),
                    results: response.data.items,
                };
                localStorage.setItem(`search_${query}`, JSON.stringify(dataToCache));

                setSearchResults(response.data.items);
                setError(null); // Clear any previous errors
            } else {
                setError("No search results found."); // Set error message
                setSearchResults([]); // Clear search results
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError("An error occurred while fetching data. Please try again."); // Set error message
            setSearchResults([]);
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
