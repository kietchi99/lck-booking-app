import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })

  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: ()=>{
      toast.success("New cabin successfully created")
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      reset();
    },
    onError: (err) => toast.error(err.message)
  })
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData, id})=>createEditCabin(newCabinData, id),
    onSuccess: ()=>{
      toast.success("Cabin successfully edited")
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      reset();
    },
    onError: (err) => toast.error(err.message)
  })

  const { errors } = formState;
  const isWorking = isCreating || isEditing

  function onSubmit(data){
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId})
    else createCabin({...data, image: image})
  }
  function onError(errors){
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input 
          type="text" 
          id="name" 
          disabled={isCreating}
          {...register("name", {
            required: "This is field is required"
        })}/>
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity", {
          required: "This is field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice", {
          required: "This is field is required"
        })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isCreating} {...register("discount", {
          required: "This is field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regurlar price"
        })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking} {...register("description", {
          required: "This is field is required"
        })}/>
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput 
          id="image" 
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required"
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;