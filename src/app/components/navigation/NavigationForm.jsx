export default function NavigationForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="label" className="text-sm font-medium text-gray-700">
          Nazwa
        </label>
        <input
          type="text"
          id="label"
          name="label"
          placeholder="np. Promocje"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="url" className="text-sm font-medium text-gray-700">
          Link
        </label>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="Wklej lub wyszukaj"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="text-sm font-medium text-white bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Dodaj
        </button>
      </div>
    </form>
  )
}
