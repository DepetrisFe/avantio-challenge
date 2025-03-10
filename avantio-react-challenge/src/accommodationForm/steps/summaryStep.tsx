import { useFormContext } from "react-hook-form";
import { formValuesEnum } from "../values.enum";

interface SummaryStepProps {
  prevStep: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ prevStep }) => {
  const { watch } = useFormContext();

  return (
    <div className="flex flex-col h-full">
      <div className="flex grow flex-col gap-2">
        <h1>Summary</h1>
        <p>
          <strong>Accommodation Name:</strong> {watch(formValuesEnum.ACCOMMODATION_NAME)}
        </p>
        <p>
          <strong>Accommodation Address:</strong> {watch(formValuesEnum.ACCOMMODATION_ADDRESS)}
        </p>
        <p>
          <strong>Accommodation Description:</strong> {watch(formValuesEnum.ACCOMMODATION_DESCRIPTION)}
        </p>
        <p>
          <strong>Accommodation Type:</strong> {watch(formValuesEnum.ACCOMMODATION_TYPE)}
        </p>
        <p>
          <strong>Owner Name:</strong> {watch(formValuesEnum.OWNER_NAME)}
        </p>
        <p>
          <strong>Owner Email:</strong> {watch(formValuesEnum.OWNER_EMAIL)}
        </p>
        <p>
          <strong>Owner Phone:</strong> {watch(formValuesEnum.OWNER_PHONE)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={prevStep} className="bg-blue-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SummaryStep;
