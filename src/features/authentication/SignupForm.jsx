import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
    const { reset, register, formState, getValues, handleSubmit } = useForm(); 
    const { errors } = formState;

    function onSubmit({ fullName, email, password }) {
      signup({ fullName, email, password }, {
        onSettled: () => reset
      })
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input 
            type="text" 
            id="fullName" 
            {...register("fullName", {
                require: "This field is required"
            })}
            disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input 
            type="email" 
            id="email" 
            {...register("email", {
                require: "This field is required",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address"
                }
            })}
            disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input 
            type="password" 
            id="password" 
            {...register("password", {
                require: "This field is required",
                minLength: {
                    value: 8,
                    message: "Password needs a minium of 8 charaters"
                }
            })}
            disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input 
            type="password" 
            id="passwordConfirm" 
            {...register("passwordConfirm", {
                require: "This field is required",
                validate: (value) => value === getValues().password || "Password need to match"
            })}
            disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
