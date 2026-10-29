# Task Management Dashboard

A responsive Task Management Dashboard built with **React.js**. Users can view, create, edit, delete,
search, filter, sort and paginate tasks. Data comes from the [DummyJSON Todos API](https://dummyjson.com/docs/todos).

## Features
- **Dashboard overview:** total, completed and pending cards plus a progress bar. They update instantly when tasks change.
- **Task management:** fetch tasks from the API, create, edit, delete (with a confirmation popup), and mark as completed or pending.
- **Search, filter and sort:** search by text, filter by status, and sort by ID or title. All three work together.
- **Pagination:** 10 tasks per page. Page numbers stay correct while searching or filtering.
- **Task details:** a popup that loads `GET /todos/:id`.
- **Validation and errors:** form validation (required, 3 to 120 characters), loading state, error state with Retry, and error messages for failed actions.
- **Persistence:** changes are saved in `localStorage` and survive a page refresh. "Reset data" downloads the original tasks again.
- **Responsive:** works on phones, tablets and desktops (Tailwind CSS).

## Tech stack
React 18, Vite, Tailwind CSS v4, Axios.

## Setup
Requirements: Node.js 18 or newer.

## Project structure
```
src/
├── api/todosApi.js          all API calls (axios) in one place
├── hooks/useTodos.js        custom hook: loading, saving, add / edit / delete logic
├── components/
│   ├── StatsCards.jsx       summary cards + progress bar
│   ├── Toolbar.jsx          search, filter, sort, add button
│   ├── TaskList.jsx         list + empty state
│   ├── TaskItem.jsx         one task row
│   ├── Pagination.jsx       page controls
│   ├── TaskForm.jsx         add / edit popup with validation
│   ├── ConfirmDialog.jsx    reusable "are you sure?" popup
│   ├── TaskDetails.jsx      details popup (GET /todos/:id)
│   └── Modal.jsx            reusable popup shell
├── App.jsx                  screen state + search/filter/sort/pagination pipeline
└── main.jsx
```

## API usage
| Action | Endpoint |
|---|---|
| Load all tasks | `GET /todos?limit=0` |
| Task details | `GET /todos/:id` |
| Create | `POST /todos/add` |
| Update | `PUT /todos/:id` |
| Delete | `DELETE /todos/:id` |

## Design decisions
- **Fetch all tasks once (`limit=0`)** and do search, filter, sort and pagination in the browser. One list goes through
  search, then filter, then sort, then pagination, so every feature works together and page counts are always right.
- **Statistics are calculated from the task list** instead of being stored, so they can never get out of date.
- **DummyJSON does not really save changes.** Changes are kept in React state and copied to `localStorage`.
- **Tasks created in the app get their own unique ID.** The fake API returns the same ID for every new task, and these
  tasks do not exist on the server, so update and delete for them skip the API call (it would return 404).

## Possible improvements
Toast notifications, undo for delete, task due dates and priorities, unit tests, React Query for data fetching.