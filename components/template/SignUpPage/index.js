import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.status === "success") router.push("/signin");
  };

  return (
    <div className="signin-form">
      <h3>Registration</h3>
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <div>
        <p>Have an account ? </p> <Link href="/signin">Sign in</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
