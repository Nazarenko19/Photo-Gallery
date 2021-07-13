import React, { FC, MouseEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { publicRoutes } from "routes/routes-list";
import { Link } from "react-router-dom";

import { signin, setError } from "store/modules/auth/actions";
import { RootState } from "store";

import Input from "components/Input";
import Button from "components/Button";
import Message from "components/Message";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
    dispatch(signin({ email, password }, () => setLoading(false)));
  };

  return (
    <section>
      <div>
        <h2>Sign In</h2>
        <form>
          {error && <Message type="danger" msg={error} />}
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
          <p>
            <Link to={publicRoutes.forgotPassword}>Forgot password ?</Link>
          </p>
          <Button onClick={submitHandler} text={loading ? "Loading..." : "Sign In"} disabled={loading} />
        </form>
      </div>
    </section>
  );
};

export default SignIn;
