import React, { FC, FormEvent, useState, useEffect } from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { sendPasswordResetEmail, setError, setSuccess } from "store/modules/auth/actions";

import Input from "components/Input";
import Message from "components/Message";
import Button from "components/Button";

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
      if (success) {
        dispatch(setSuccess(""));
      }
    };
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (success) {
      dispatch(setSuccess(""));
    }
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, "Email sent!"));
    setLoading(false);
  };

  return (
    <section>
      <div>
        <h2>Reset password</h2>
        <form>
          {error && <Message type="danger" msg={error} />}
          {success && <Message type="success" msg={success} />}
          <Input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Button
            text={loading ? "Loading..." : "Send password reset email"}
            disabled={loading}
            onClick={submitHandler}
          />
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
