import { useFormContext } from "react-hook-form";
import { formValuesEnum } from "../values.enum";

interface OwnerStepProps {
  prevStep: () => void;
  nextStep: () => void;
}

const OwnerStep: React.FC<OwnerStepProps> = ({ nextStep, prevStep }) => {
  const {
    register,
    formState: { errors, isValid },
  } = useFormContext();

  return (
    <div className="flex flex-col h-full">
      <div className="flex grow flex-col gap-2">
        <h1>Owner</h1>
        <input
          {...register(formValuesEnum.OWNER_NAME, {
            required: "Name is required",
            minLength: { value: 4, message: "Min length is 4 characters" },
            maxLength: { value: 64, message: "Max length is 64 characters" },
          })}
          placeholder="Name"
          className="border border-gray-300 p-2 w-full"
        />
        <input
          {...register(formValuesEnum.OWNER_EMAIL, {
            required: "Email is required",
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" },
          })}
          placeholder="Email"
          className="border border-gray-300 p-2 w-full"
        />
        <input
          {...register(formValuesEnum.OWNER_PHONE, {
            pattern: { value: /^[0-9]{0,9}$/, message: "Only numbers allowed, up to 9 digits" },
          })}
          placeholder="Phone"
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={prevStep} className="bg-blue-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button
          disabled={!isValid}
          type="button"
          onClick={nextStep}
          className={`${isValid ? "bg-blue-500" : "bg-gray-200"} text-white px-4 py-2 rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OwnerStep;
