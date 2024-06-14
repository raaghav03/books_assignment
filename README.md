The project is documented below but the best way is to check the deployed link

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



## Responsiveness
have implemented the entire application for phone as well as desktop. can be improved further without time constraint (had exams)

<img width="675" alt="Screenshot 2024-06-14 at 9 03 02 PM" src="https://github.com/raaghav03/books_assignment/assets/121729910/c565495e-773e-4d33-b261-642daea614ab">


## Error Handling

Implemented strict error handling in api handling 
![image](https://github.com/raaghav03/books_assignment/assets/121729910/0ca3a364-1576-4466-a349-1f14c1f23d0a)


Framework used is React Typescript , Tailwind , localstorage for bookmarking and caching. Ui libraries used are radix and shadcn.



Now comes the tougher part of the assignement, the optional features.

## Implement pagination for search results.
implemented pagination based on number of results received . also deactivated "previous" and "next button" dependent on current position
![image](https://github.com/raaghav03/books_assignment/assets/121729910/5f68a838-cc2a-494d-84bc-d56766a4ed39)
https://github.com/raaghav03/books_assignment/assets/121729910/8f96a37f-11cc-4665-ba55-c2970c23ab68


## Add filtering options for search results (e.g., by category, publication year).
Created a modal to advanced filter based on author , category , language and publishing year. the langauge options shows only when results have more than one language 
![image](https://github.com/raaghav03/books_assignment/assets/121729910/754ef1d8-0e6e-444c-b7b9-51315d29c8a8)


https://github.com/raaghav03/books_assignment/assets/121729910/03de209d-31e7-469b-9053-099a2780b37a




## Implement caching to improve performance and reduce API requests

Implemented caching to reduce the load on api calls by implementing local storage caching. Hits the api in case of a new query but checks in the cache before hitting the api. keep a look at console tab in this video. Hits the api on first ever call of "chemistry" but checks and returns data from cache in case of "physics"

https://github.com/raaghav03/books_assignment/assets/121729910/d41abf60-a008-4438-b1fe-3d66c6c9e8ee

## Add a feature to allow users to save/bookmark their favorite books locally.
Implemented local storage of bookmarked books and a list to show bookmarked items

https://github.com/raaghav03/books_assignment/assets/121729910/c115ccbe-6ba5-4b0c-92b9-5f0658fa7613








