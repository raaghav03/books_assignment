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
    subtitle: string;
    categories: string[];
    previewLink: string;
  };
}

export default function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  console.log(searchResults);
  return (
    <div className="flex flex-col items-start w-screen h-screen m-12 gap-8">
      <h1 className="text-2xl text-neutral-800">Book Search Assignment</h1>

      <SearchButton setSearchResults={setSearchResults} />

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 justify-between w-full">
          {searchResults.map((book) => (
            <div key={book.id} className="flex flex-col items-start m-8">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
              )}
              <h2>{book.volumeInfo.title}</h2>
              <p>{book.volumeInfo.authors.join(", ")}</p>
              <p>{book.volumeInfo.subtitle}</p>
              <p>{book.volumeInfo.categories}</p>
              <a href={book.volumeInfo.previewLink}>Preview Link</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
