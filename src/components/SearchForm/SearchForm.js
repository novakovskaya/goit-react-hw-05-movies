import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

import styles from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.error("Enter something");
    }

    onSubmit(searchQuery);
    setSearchQuery("");
  };

  const handleInput = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={searchQuery}
          onChange={handleInput}
          autoComplete="off"
          autoFocus
          placeholder="Search..."
        />

        <button type="submit" className={styles.button}>
          <BsSearch style={{ width: 20, height: 20 }} />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
