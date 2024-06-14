import { useEffect, useState } from "react";
import SearchButton from "./components/SearchButton";
import Modal from "./components/Modal";
import PaginationComponent from "./components/Comp_Pagination";
import { Book } from "./components/SearchButton";

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

  const [years, setYears] = useState<{ value: string; label: string }[]>([]);
  const [startYear, setStartYear] = useState<string | null>(null);
  const [endYear, setEndYear] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const [bookmarkedBooks, setBookmarkedBooks] = useState<Book[]>([]);

  // Load bookmarks from local storage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedBooks");
    if (savedBookmarks) {
      setBookmarkedBooks(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      const newCategories: Category[] = [];
      const newAuthors: Authors[] = [];
      const newLanguages: Language[] = [];
      const yearSet: Set<number> = new Set();

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
        if (book.volumeInfo.publishedDate) {
          const publishedYear = new Date(book.volumeInfo.publishedDate as string).getFullYear();
          yearSet.add(publishedYear);
        }
      });

      setCategories(newCategories);
      setAuthors(newAuthors);
      setLanguages(newLanguages);
      setYears(Array.from(yearSet).sort((a, b) => a - b).map(year => ({ value: year.toString(), label: year.toString() })));
      setFilteredResults(searchResults);
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

    const filtered = searchResults.filter((book) => {
      const bookYear = book.volumeInfo.publishedDate ? new Date(book.volumeInfo.publishedDate as string).getFullYear() : null;
      return (
        (selectedCategoryValues.length === 0 || selectedCategoryValues.every((category) =>
          book.volumeInfo.categories?.includes(category)
        )) &&
        (selectedAuthorValues.length === 0 || selectedAuthorValues.every((author) =>
          book.volumeInfo.authors?.includes(author)
        )) &&
        (selectedLanguageValues.length === 0 || selectedLanguageValues.includes(book.volumeInfo.language)) &&
        (startYear === null || (bookYear !== null && bookYear >= parseInt(startYear))) &&
        (endYear === null || (bookYear !== null && bookYear <= parseInt(endYear)))
      );
    });

    setFilteredResults(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Calculate the results to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  // Handle bookmark toggle
  const handleBookmarkToggle = (book: Book) => {
    const isBookmarked = bookmarkedBooks.some((b) => b.id === book.id);
    const updatedBookmarks = isBookmarked
      ? bookmarkedBooks.filter((b) => b.id !== book.id)
      : [...bookmarkedBooks, book];

    setBookmarkedBooks(updatedBookmarks);
    localStorage.setItem("bookmarkedBooks", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (book: Book) => {
    return bookmarkedBooks.some((b) => b.id === book.id);
  };

  return (
    <div className="flex flex-col items-start   md:m-12 m-4 gap-8">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl text-neutral-800">Book Search Assignment</h1>
        <p className="text-neutral-500 text-md">by raghav nagpal</p>
      </div>
      <SearchButton setSearchResults={setSearchResults} setError={setError} />

      {error && <p>Error: {error}</p>}
      <div className="flex flex-col items-start">
        {currentResults.length > 0 && (
          <>
            <div className="flex md:flex-row flex-col gap-8 items-start justify-between w-full mb-10">
              <h1>
                Not satisfied with the results? Try{" "}
                <Modal
                  categories={categories}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  authors={authors}
                  selectedAuthors={selectedAuthors}
                  setSelectedAuthors={setSelectedAuthors}
                  languages={languages}
                  selectedLanguages={selectedLanguages}
                  setSelectedLanguages={setSelectedLanguages}
                  years={years}
                  startYear={startYear}
                  setStartYear={setStartYear}
                  endYear={endYear}
                  setEndYear={setEndYear}
                  onFilter={filterResults}
                />
              </h1>
              <div className="">
                <h2 className="text-xl font-bold mb-4">Bookmarked Items</h2>
                {bookmarkedBooks.length > 0 ? (
                  <div className="flex md:flex-col gap-4">
                    {bookmarkedBooks.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-start p-4 border border-gray-300 rounded-md w-full"
                      >
                        <div className="flex-none mr-4">
                          {book.volumeInfo.imageLinks && (
                            <img
                              src={book.volumeInfo.imageLinks.thumbnail}
                              alt={book.volumeInfo.title}
                              className="w-24 h-32 object-cover hidden md:inline-flex"
                            />
                          )}
                        </div>
                        <div className="flex flex-col flex-1 ">
                          <h3 className=" font-medium md:text-md text-sm">{book.volumeInfo.title}</h3>
                          <p className="text-gray-600 md:text-sm text-xs">
                            {book.volumeInfo.authors && book.volumeInfo.authors.length > 0
                              ? book.volumeInfo.authors.join(", ")
                              : "No authors listed"}
                          </p>

                          <div className="flex items-center mt-2">
                            <a
                              className="text-blue-800 hover:underline text-sm md:text-md"
                              href={book.volumeInfo.previewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Preview Link
                            </a>
                            <button
                              className="ml-auto p-2 rounded"
                              onClick={() => handleBookmarkToggle(book)}
                              aria-label={isBookmarked(book) ? "Remove Bookmark" : "Bookmark"}
                            >
                              {isBookmarked(book) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" fill="#131313" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No items bookmarked yet.</p>
                )}
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 overflow-y-auto">
              {currentResults.map((book) => (

                <div
                  key={book.id}
                  className="flex flex-col gap-3 items-start  p-4 border-[1px] border-gray-200 rounded-md w-fill"
                >
                  {book.volumeInfo.imageLinks && (

                    <img className="object-fill"
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                    />

                  )}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-5xl text-neutral-800 font-semibold">{book.volumeInfo.title}</h2>
                    <p className="text-neutral-600 text-sm">{book.volumeInfo.subtitle}</p>
                  </div>
                  <p className="text-neutral-400 ">
                    {book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors.length > 0
                      ? `Author: ${book.volumeInfo.authors.join(",")}`
                      : "No authors listed"}
                  </p>


                  <p>
                    {book.volumeInfo.categories && book.volumeInfo.categories.length > 0
                      ? ` Categories - ${book.volumeInfo.categories.join(", ")}`
                      : "No categories listed"}
                  </p>


                  <p className="text-neutral-400">Published by {book.volumeInfo.publisher} on {book.volumeInfo.publishedDate}</p>

                  <p>
                    Language:{" "}
                    {book.volumeInfo.language === "en"
                      ? "English"
                      : book.volumeInfo.language === "hi"
                        ? "Hindi"
                        : book.volumeInfo.language}
                  </p>
                  <div className="flex flex-row items-center w-full justify-between">
                    <a
                      className="text-blue-800 hover:underline"
                      href={book.volumeInfo.previewLink}
                    >
                      {book.saleInfo?.retailPrice && (
                        <p>
                          Buy now for ₹{book.saleInfo.retailPrice.amount}
                        </p>
                      )}
                    </a>
                    <button
                      className="p-2 mt-2 rounded"
                      onClick={() => handleBookmarkToggle(book)}
                      aria-label={isBookmarked(book) ? "Remove Bookmark" : "Bookmark"}
                    >
                      {isBookmarked(book) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" fill="#131313" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <PaginationComponent
              totalItems={filteredResults.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>)}
      </div>


    </div>
  );
}
