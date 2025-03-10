import { useFormContext } from "react-hook-form";
import { formValuesEnum } from "../values.enum";

interface OwnerStepProps {
  prevStep: () => void;
  nextStep: () => void;
}

const OwnerStep: React.FC<OwnerStepProps> = ({ nextStep, prevStep }) => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col h-full">
      <div className="flex grow flex-col gap-2">
        <h1>Owner</h1>
        <input {...register(formValuesEnum.OWNER_NAME)} placeholder="Name" className="border border-gray-300 p-2 w-full" />
        <input {...register(formValuesEnum.OWNER_EMAIL)} placeholder="Email" className="border border-gray-300 p-2 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={prevStep} className="bg-blue-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default OwnerStep;
