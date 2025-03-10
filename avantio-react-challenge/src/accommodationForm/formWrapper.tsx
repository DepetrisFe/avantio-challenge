import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import AccommodationStep from "./steps/accommodationStep";
import OwnerStep from "./steps/ownerStep";
import SummaryStep from "./steps/summaryStep";
import { accommodationTypesEnum, stepsEnum } from "./values.enum";

interface FormValues {
  accommodationName: string;
  accommodationAddress: string;
  accommodationDescription: string;
  accommodationType: accommodationTypesEnum;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
}

const FormWrapper = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      accommodationName: "",
      accommodationAddress: "",
      accommodationDescription: "",
      accommodationType: accommodationTypesEnum.APARTMENT,
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
    },
    mode: "onBlur",
  });

  const [step, setStep] = useState(stepsEnum.ACCOMODATION_STEP);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, stepsEnum.SUMMARY_STEP));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, stepsEnum.ACCOMODATION_STEP));

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-2 w-full m-4 h-5/6  sm:w-96 border border-gray-100 rounded shadow-xl"
      >
        {step === stepsEnum.ACCOMODATION_STEP && <AccommodationStep nextStep={nextStep} />}
        {step === stepsEnum.OWNER_STEP && <OwnerStep nextStep={nextStep} prevStep={prevStep} />}
        {step === stepsEnum.SUMMARY_STEP && <SummaryStep prevStep={prevStep} />}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
