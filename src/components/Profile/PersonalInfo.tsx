import { Field } from "react-final-form";

export function PersonalInfo() {
  return (
    <>
      <Field name="firstName" type="text">
        {({ input, meta }) => (
          <fieldset className="flex flex-col gap-2 w-full mb-10">
            <label htmlFor="firstName">First name</label>
            <input {...input} />
          </fieldset>
        )}
      </Field>

      <Field name="lastName" type="text">
        {({ input, meta }) => (
          <fieldset className="flex flex-col gap-2 w-full mb-10">
            <label htmlFor="lastName">Last name</label>
            <input {...input} />
          </fieldset>
        )}
      </Field>

      <div className="mb-10 gap-2 flex flex-col items-center">
        <p>Gender</p>
        <fieldset className="flex gap-5">
          <label>
            <Field name="gender" type="radio" component="input" value="male" />
            male
          </label>
          <label>
            <Field name="gender" type="radio" component="input" value="female" />
            female
          </label>
          <label>
            <Field name="gender" type="radio" component="input" value="other" />
            other
          </label>
        </fieldset>
      </div>

      <Field name="dob" type="date">
        {({ input, meta }) => (
          <fieldset className="flex flex-col gap-2 mb-10">
            <label htmlFor="dob">Date of Birth</label>
            <input {...input} min="1980-01-01" />
          </fieldset>
        )}
      </Field>

      <Field name="location" type="text">
        {({ input, meta }) => (
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="location">Location</label>
            <input {...input} />
          </div>
        )}
      </Field>
    </>
  );
}
