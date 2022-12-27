import LoginForm from "components/LoginForm";
import { useFirebase } from "context/firebase";

import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const Login = () => {
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
      await auth.loginWithCredentials(username!, password!);

    } catch (e) {
      toast((e as any).message);
    }
  }

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      emailRef={emailRef}
      passwordRef={passwordRef}
    />
  );
};

export default Login;
