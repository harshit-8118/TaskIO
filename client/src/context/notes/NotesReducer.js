export const NotesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "SET_NOTES_SUCCESS":
      return {
        notes: [...state.notes, action.payload].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        isFetching: false,
        error: false,
      };
    case "SET_NOTES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "GET_NOTES_START":
      return {
        notes: [],
        isFetching: true,
        error: false,
      };
    case "GET_NOTES_SUCCESS":
      return {
        notes: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_NOTES_FAILURE":
      return {
        notes: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_NOTE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_NOTE_SUCCESS":
      return {
        notes: [...state.notes, action.payload].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        isFetching: false,
        error: false,
      };
    case "CREATE_NOTE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_NOTE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_NOTE_SUCCESS":
      return {
        notes: state.notes
          .filter((note) => {
            if (note._id === action.payload._id) {
              return action.payload;
            } else {
              return note;
            }
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        isFetching: false,
        error: false,
      };
    case "UPDATE_NOTE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_NOTE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_NOTE_SUCCESS":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_NOTE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CLEAN_NOTE_LOGOUT":
      return {
        notes: [],
        isFetching: false,
        error: false,
      };
    default:
      return {
        ...state,
      };
  }
};
