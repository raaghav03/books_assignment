import { useState } from "react";
import SearchButton from "./components/SearchButton";

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

export default function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  return (
    <div className="flex flex-col items-start w-screen h-screen m-12 gap-8">
      <h1 className="text-2xl text-neutral-800">Book Search Assignment</h1>

      <SearchButton setSearchResults={setSearchResults} />

      {searchResults.length > 0 && (
        <div>
          {searchResults.map((book) => (
            <div key={book.id}>
              <h2>{book.volumeInfo.title}</h2>
              <p>{book.volumeInfo.authors.join(", ")}</p>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
