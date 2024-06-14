# Problem Statement
The task was to create a simple web application that allows users to search for books using the Google Books API and display the results.


# ToDo List
Requirements:
- Homepage: Create a homepage with a search bar and a button to initiate the search.
- Search Functionality: Implement a search feature where users can enter keywords (e.g., title, author) and initiate a search.
- Display Results: Display the search results in a visually appealing manner, showing at least the book title, author, and thumbnail (if available).
- Responsive Design: Ensure that the application is responsive and works well on both desktop and mobile devices.
- Error Handling: Implement error handling for cases such as failed API requests or no search results found.
- Code Quality: Write clean, well-structured code with proper comments where necessary. Follow best practices for HTML, CSS, and JavaScript.
- Framework: You are free to choose any frontend framework or library you're comfortable with (eg., React, Vue.js, Angular), or you can use vanilla JavaScript if you prefer.


Bonus (Optional):
- Implement pagination for search results.
- Add filtering options for search results (e.g., by category, publication year).
- Implement caching to improve performance and reduce API requests.
- Add a feature to allow users to save/bookmark their favorite books locally.


## HomePage && Search Functionality

Implemented a simple search text box input that searches based on relevance
<img width="578" alt="Screenshot 2024-06-14 at 8 54 54 PM" src="https://github.com/raaghav03/books_assignment/assets/121729910/67cbb2c2-4f98-4956-98c3-1e8422200854">
![image](https://github.com/raaghav03/books_assignment/assets/121729910/30a0b9d7-2e4f-4e69-a968-379190099b23)


## Display Results
Fetched multiple items from the data received through google api like title, price , subititle and genre. Used conditional rendering based on input received such as showing "No authors listed in case of no author data in api"

https://github.com/raaghav03/books_assignment/assets/121729910/b0cf8eef-ca7c-4725-ab44-5a57e5824880
![image](https://github.com/raaghav03/books_assignment/assets/121729910/79daa1ed-9601-4bee-8b33-04bb65c872eb)







