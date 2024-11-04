import { SearchIcon } from 'lucide-react';

export default function SearchBar() {
  return (
    <form
      action="#"
      method="GET"
      className="relative flex flex-1"
    >
      <label
        htmlFor="search-field"
        className="sr-only"
      >
        Search
      </label>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
      />
      <input
        id="search-field"
        name="search"
        placeholder="Search..."
        className="block h-full w-full border-0 py-0 pl-8 pr-0 bg-gray-900 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
      />
    </form>
  );
}
