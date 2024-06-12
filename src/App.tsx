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
    publisher: string;
    description: string
    language: string
    publishedDate: React.ReactNode
  };
}

export default function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log(searchResults);
  return (
    <div className="flex flex-col items-start w-screen h-screen m-12 gap-8">
      <h1 className="text-2xl text-neutral-800">Book Search Assignment</h1>

      <SearchButton setSearchResults={setSearchResults} setError={setError} />

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 justify-between w-full">
          {searchResults.map((book) => (
            <div key={book.id} className="flex flex-col gap-2 items-start m-8 p-4 border-2 border-gray-300 rounded-md w-5/6">
              {book.volumeInfo.imageLinks && (
                <div className="border border-2-black p-2">
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                </div>
              )}
              <h2>{book.volumeInfo.title}</h2>
              <p>
                {book.volumeInfo.authors && book.volumeInfo.authors.length > 0
                  ? book.volumeInfo.authors.join(", ")
                  : "No authors listed"}
              </p>
              <p>{book.volumeInfo.subtitle}</p>
              <p>{book.volumeInfo.description}</p>
              <p>{book.volumeInfo.categories}</p>
              <a className="text-blue-800 hover:underline" href={book.volumeInfo.previewLink}>Preview Link</a>
              <p>Published by {book.volumeInfo.publisher}</p>
              <p>Published on {book.volumeInfo.publishedDate}</p>
              <p>
                Language:{' '}
                {book.volumeInfo.language === 'en'
                  ? 'English'
                  : book.volumeInfo.language === 'hi'
                    ? 'Hindi'
                    : book.volumeInfo.language}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
