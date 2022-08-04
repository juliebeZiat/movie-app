import { FC } from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import Input from "../../../components/Input";
import { FormValues } from "../SigninScreen";

type TypeHookForm = {
  control: Control<FormValues, object>;
};

const Form: FC<TypeHookForm> = ({ control }) => {
  return (
    <>
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
            error={!!error}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
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
    </>
  );
};

export default Form;
