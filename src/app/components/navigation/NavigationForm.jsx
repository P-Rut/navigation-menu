import FormInput from "./FormInput"
import FormButton from "./FormButton"

export default function NavigationForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <FormInput
          label={"Nazwa"}
          type="text"
          id="label"
          name="label"
          placeholder="np. Promocje"
        />
      </div>
      <div>
        <FormInput
          label={"Link"}
          type="text"
          id="url"
          name="url"
          placeholder="Wklej lub wyszukaj"
        />
      </div>
      <div className="flex gap-2">
        <FormButton
          type="button"
          variant="secondary"
          additionalStyle="border border-gray-300 rounded-md"
        >
          Anuluj
        </FormButton>
        <FormButton type="submit" additionalStyle="rounded-md">
          Dodaj
        </FormButton>
      </div>
    </form>
  )
}
