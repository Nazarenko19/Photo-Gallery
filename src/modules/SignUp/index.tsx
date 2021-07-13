import React, { FC, FormEvent, MouseEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "components/Input";
import Message from "components/Message";
import Button from "components/Button";

import { signup, setError } from "store/modules/auth/actions";
import { RootState } from "store";

const SingUp: FC = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
        <form className="form">
          {error && <Message type="danger" msg={error} />}
          <Input
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.currentTarget.value)}
            placeholder="First name"
            label="First name"
          />
          <Input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
            placeholder="Password"
            label="Password"
          />
          <Button
            text={loading ? "Loading..." : "Sign Up"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
            onClick={submitHandler}
          />
        </form>
      </div>
    </section>
  );
};

export default SingUp;
