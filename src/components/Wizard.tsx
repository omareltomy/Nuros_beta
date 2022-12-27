import React, { ComponentProps, createContext, useState } from "react";
import { Form } from "react-final-form";


type WizardProps = ComponentProps<"div"> & {
  onSubmit: (values: any) => void;
  submitting: boolean;
  children: React.ReactNode;
};

export const WizardPage = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <div>
    <h2 className="text-lg font-bold mb-10 underline">{title}</h2>
    <div className="w-full">{children}</div>
  </div>
);

const WizardContext = createContext<any>({});

/**
 * Wizard component
 */
const Wizard: React.FC<WizardProps> = ({ onSubmit, submitting, children }) => {
  const [page, setPage] = useState(0);
  const [formValues, setValues] = useState<any | undefined>(undefined);
  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;

  // next page
  const next = (values: any) => {
    setPage(Math.min(page + 1, React.Children.count(children)));
    setValues(values);
  };

  // previous page
  const previous = () => {
    setPage(Math.max(page - 1, 0));
  };

  /**
   * Show next wizard step, or submit the form if it's the last page
   */
  const handleSubmit = (values: any) => {
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      next(values);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={formValues}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className="flex flex-col justify-between border-[4px] border-zinc-600 h-[500px] overflow-y-auto rounded-xl py-4 px-[50px]">
          <WizardContext.Provider value={values}>
            {activePage}
          </WizardContext.Provider>
          <div className="mt-10">
            {page > 0 && (
              <button
                type="button"
                className="bg-zinc-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={previous}
              >
               Back
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              {submitting ? (
                "loading ..."
              ) : (
                <>
                  {!isLastPage && "Next"} {isLastPage && "Continue"}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    />
  );
};

/**
 * Hook to get the values from the Wizard
 */
export const useWizard = () => {
  const context = React.useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a Wizard");
  }
  return context;
};

export default Wizard;
