import { Field } from "react-final-form";

export function PersonalInfo() {
  return (
    <>
      <div className="flex gap-4">
        <Field name="firstName" type="text">
          {({ input, meta }) => (
            <fieldset className="flex flex-col gap-2 w-full mb-10">
              <label htmlFor="firstName">First name</label>
              <input {...input} className="rounded-full" />
            </fieldset>
          )}
        </Field>

        <Field name="lastName" type="text">
          {({ input, meta }) => (
            <fieldset className="flex flex-col gap-2 w-full mb-10">
              <label htmlFor="lastName">Last name</label>
              <input {...input} className="rounded-full" />
            </fieldset>
          )}
        </Field>
      </div>


      <div className="mb-10 gap-2 flex flex-col items-center">
        <p>Gender</p>
        <fieldset className="flex gap-5">
          <label className="flex gap-1 items-center">
            <Field name="gender" type="radio" component="input" value="male" />
            male
          </label>
          <label className="flex gap-1 items-center">
            <Field name="gender" type="radio" component="input" value="female" />
            female
          </label>
          <label className="flex gap-1 items-center">
            <Field name="gender" type="radio" component="input" value="other" />
            other
          </label>
        </fieldset>
      </div>

      {/* TODO: Change field type from date to number */}
      <Field name="dob" type="number">
        {({ input, meta }) => (
          <fieldset className="flex flex-col gap-2 mb-10">
            <label htmlFor="dob">Age</label>
            <input {...input} min="16" className="rounded-full" />
          </fieldset>
        )}
      </Field>

      {/* <Field name="location" type="text">
        {({ input, meta }) => (
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="location">Location</label>
            <input {...input} />
          </div>
        )}
      </Field> */}
    </>
  );
}
