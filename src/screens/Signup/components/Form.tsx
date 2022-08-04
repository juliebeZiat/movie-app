import { FC } from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import Input from "../../../components/Input";
import { FormValues } from "../SignupScreen";

type TypeHookForm = {
  control: Control<FormValues, object>;
  watch: UseFormWatch<FormValues>;
};

const Form: FC<TypeHookForm> = ({ control, watch }) => {
  return (
    <>
      <Controller
        control={control}
        name="username"
        rules={{
          required: "Username should not be empty",
          minLength: {
            value: 4,
            message: "Username must be longer than or equal to 4 characters",
          },
          pattern: {
            value: /^\S*$/,
            message: "No whitespace allowed",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            placeholder="Username"
            value={value}
            onChangeText={onChange}
            error={!!error}
            errorDetails={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email should not be empty",
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Email must be an email",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            error={!!error}
            errorDetails={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password should not be empty",
          minLength: {
            value: 4,
            message: "Password must be longer than or equal to 4 characters",
          },
          validate: {
            gotNumber: (value) =>
              /([0-9])/.test(value) ||
              "Password must contain at least one number",
            gotUppercase: (value) =>
              /([A-Z])/.test(value) ||
              "Password must contain at least one uppercase",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!error}
            errorDetails={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === watch("password") || "Password do not match",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            placeholder="Repeat Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!error}
            errorDetails={error?.message}
          />
        )}
      />
    </>
  );
};

export default Form;
