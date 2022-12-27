import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import SignupForm from "components/SignupForm";
import { useFirebase } from "context/firebase";

const Signup = () => {
  const auth = useFirebase();
  const { error, setError } = auth;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, setError]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await auth.registerWithCredentials(username!, password!);
    } catch (e) {
      toast((e as any).message);
    }
  }

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      emailRef={emailRef}
      passwordRef={passwordRef}
    />
  );
};

export default Signup;
