# plan

## List Page

-incorporate Create Functionality
-form
-input for name of item and rating (1-10) and submit button
-ul
-append each li based on info from supabase
-delete button

1. Database Setup
   -make a table in Supabase
   -foreign key relationship to users table (uuid)
   -rls for user_id = uid()

2. Create from
   -fetch function in fetch utils
   -add submit event listener
   -grab data using new FormData and send it to Supabase
3. List all items (ul)
   -fetch function in fetch utils
   render function in render-utils
   -write a display function in app.js
   -call display function on page load

4. Update Item
   (crossing out the item)
   -update function in fetch'
   -an event handler on our li elements
   clickable
   -re-display to the list

5. Delete (button)
   -delete function in fetch
   -add event listener to call the delete function
