import { useState } from "react";

export function SearchInput({ onChange, placeholderText, className }: any) {
  const [search, setSearch] = useState("");

  function handleChange(e: any) {
    const noLeadingSpace = e.target.value.replace(/^\s+/, "");
    setSearch(noLeadingSpace);
    onChange(noLeadingSpace);
  }

  return (
    <input
      className={`bg-search-input w-1/2 rounded-md p-2 ${className}`}
      type="text"
      placeholder={placeholderText}
      onChange={handleChange}
      value={search}
    />
  );
}
