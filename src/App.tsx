import { useEffect, useState } from "react";
import SearchButton from "./components/SearchButton";
import Modal from "./components/Modal";
import { Book } from "./components/SearchButton"


interface Category {
  value: string;
  label: string;
}

interface Authors {
  value: string;
  label: string;
}
interface Language {
  value: string;
  label: string;
}
export default function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const [authors, setAuthors] = useState<Authors[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Authors[]>([]);

  const [filteredResults, setFilteredResults] = useState<Book[]>([]);

  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const newCategories: Category[] = [];
      const newAuthors: Authors[] = [];
      const newLanguages: Language[] = [];
      searchResults.forEach((book) => {
        book.volumeInfo.categories?.forEach((category) => {
          if (!newCategories.find((c) => c.value === category)) {
            newCategories.push({ value: category, label: category });
          }
        });
        book.volumeInfo.authors?.forEach((author) => {
          if (!newAuthors.find((a) => a.value === author)) {
            newAuthors.push({ value: author, label: author });
          }
        });
        if (book.volumeInfo.language && !newLanguages.find((l) => l.value === book.volumeInfo.language)) {
          newLanguages.push({ value: book.volumeInfo.language, label: book.volumeInfo.language });
        }
      });
      setCategories(newCategories);
      setAuthors(newAuthors);
      setLanguages(newLanguages);
    }
  }, [searchResults]);
  const filterResults = () => {
    const selectedCategoryValues = selectedCategories.map(
      (category) => category.value
    );
    const selectedAuthorValues = selectedAuthors.map(
      (author) => author.value
    );
    const selectedLanguageValues = selectedLanguages.map(
      (language) => language.value
    );

    const filtered = searchResults.filter((book) =>
      selectedCategoryValues.every((category) =>
        book.volumeInfo.categories.includes(category)
      ) &&
      selectedAuthorValues.every((author) =>
        book.volumeInfo.authors.includes(author)
      ) &&
      selectedLanguageValues.includes(book.volumeInfo.language)
    );
    setFilteredResults(filtered);
  };
  return (
    <div className="flex flex-col items-start w-screen h-screen m-12 gap-8">
      <h1 className="text-2xl text-neutral-800">Book Search Assignment</h1>
      <SearchButton setSearchResults={setSearchResults} setError={setError} />
      <h1>
        Not satisfied with the results? Try{" "}
        <Modal
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          onFilter={filterResults}
          authors={authors}
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
          languages={languages}
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}

        />
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      {(filteredResults.length > 0 ? filteredResults : searchResults).length >
        0 && (
          <div className="grid grid-cols-1 justify-between w-full">
            {(filteredResults.length > 0 ? filteredResults : searchResults).map(
              (book) => (
                <div
                  key={book.id}
                  className="flex flex-col gap-2 items-start m-8 p-4 border-2 border-gray-300 rounded-md w-5/6"
                >
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
                      ? book.volumeInfo
                        .authors.join(", ")
                      : "No authors listed"}
                  </p>
                  <p>{book.volumeInfo.subtitle}</p>
                  <p>{book.volumeInfo.description}</p>
                  <p>
                    {book.volumeInfo.categories &&
                      book.volumeInfo.categories.length > 0
                      ? book.volumeInfo.categories.join(", ")
                      : "No categories listed"}
                  </p>
                  <a
                    className="text-blue-800 hover:underline"
                    href={book.volumeInfo.previewLink}
                  >
                    Preview Link
                  </a>
                  <p>Published by {book.volumeInfo.publisher}</p>
                  <p>Published on {book.volumeInfo.publishedDate}</p>
                  <p>
                    Language:{" "}
                    {book.volumeInfo.language === "en"
                      ? "English"
                      : book.volumeInfo.language === "hi"
                        ? "Hindi"
                        : book.volumeInfo.language}
                  </p>
                </div>
              )
            )}
          </div>
        )}
    </div>
  );
}