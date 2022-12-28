import LoginForm from "components/LoginForm";
import { useFirebase } from "context/firebase";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const auth = useFirebase();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

Login.noAuth = true

export default Login;
