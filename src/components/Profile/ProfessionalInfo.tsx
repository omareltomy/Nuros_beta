import { useState } from "react";
import { Field } from "react-final-form";

export function ProfessionalInfo() {
  const [profileType, setProfileType] = useState("caretaker");
  const isCareGiver = profileType === "caregiver";

  return (
    <>
      <div className="mb-10 gap-2 flex flex-col items-center">
        <p>Profile Type</p>
        <fieldset className="flex gap-5">
          <label>
            <Field
              name="profileType"
              type="radio"
              value="caretaker"
              render={({input}) => {
                return <input {...input} onChange={(e) => {
                  setProfileType(e.target.value)
                  input.onChange(e)
                }} />
              }}
            />
            caretaker
          </label>
          <label>
            <Field
              name="profileType"
              type="radio"
              value="caregiver"
              checked
              render={({input}) => {
                return <input {...input} onChange={(e) => {
                  setProfileType(e.target.value)
                  input.onChange(e)
                }} />
              }}
            />
            caregiver
          </label>
        </fieldset>
      </div>

      { isCareGiver &&
        <>
          <Field name="specialty" type="text">
            {({ input, meta }) => (
              <fieldset className="flex flex-col gap-2 w-full mb-10">
                <label htmlFor="specialty">Specialty</label>
                <input {...input} />
              </fieldset>
            )}
          </Field>

          <div className="gap-2 flex flex-col items-center">
            <p>Languages</p>
            <fieldset className="flex flex-col gap-2 w-full mb-10">
              <label>
                <Field
                  name="languages"
                  component="input"
                  type="checkbox"
                  value="en-US"
                />
                english
              </label>
              <label>
                <Field
                  name="languages"
                  component="input"
                  type="checkbox"
                  value="fr-FR"
                />
                french
              </label>
            </fieldset>
          </div>
        </>
      }
    </>
  );
}
