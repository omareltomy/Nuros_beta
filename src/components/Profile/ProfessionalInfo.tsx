import { Field } from "react-final-form";

export function ProfessionalInfo() {
  return (
    <>
      <div className="mb-10 gap-2 flex flex-col items-center">
        <p>I am a ...</p>
        <fieldset className="flex gap-5">
          <label className="flex gap-1 items-center">
            <Field
              name="profileType"
              type="radio"
              value="caretaker"
              component="input"
            />
            caretaker
          </label>
          <label className="flex gap-1 items-center">
            <Field
              name="profileType"
              type="radio"
              value="caregiver"
              component="input"
            />
            caregiver
          </label>
        </fieldset>
      </div>
    </>
  );
}
