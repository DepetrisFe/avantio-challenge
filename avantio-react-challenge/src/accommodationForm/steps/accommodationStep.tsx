import { useFormContext } from "react-hook-form";
import { formValuesEnum } from "../values.enum";
import { accommodationTypesEnum } from "../values.enum";

interface AccommodationStepProps {
  nextStep: () => void;
}

const AccommodationStep: React.FC<AccommodationStepProps> = ({ nextStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  console.log("errors", errors);

  return (
    <div className="flex flex-col h-full">
      <div className="flex grow flex-col gap-2">
        <h1>Accommodation</h1>
        <input
          {...register(formValuesEnum.ACCOMMODATION_NAME, {
            required: "Name is required",
            maxLength: { value: 10, message: "Max length is 10 characters" },
          })}
          placeholder="Name"
          className="border border-gray-300 p-2 w-full"
        />
        <input
          {...register(formValuesEnum.ACCOMMODATION_ADDRESS)}
          placeholder="Address"
          className="border border-gray-300 p-2 w-full"
        />
        <textarea
          {...register(formValuesEnum.ACCOMMODATION_DESCRIPTION)}
          placeholder="Description"
          className="border border-gray-300 p-2 w-full resize-none"
          rows={4}
        />
        <select {...register(formValuesEnum.ACCOMMODATION_TYPE)} className="border border-gray-300 p-2 w-full">
          {Object.values(accommodationTypesEnum).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={nextStep} className="col-start-2 bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default AccommodationStep;
