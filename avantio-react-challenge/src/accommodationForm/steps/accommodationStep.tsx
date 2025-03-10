import { useFormContext } from "react-hook-form";
import { formValuesEnum } from "../values.enum";
import { accommodationTypesEnum } from "../values.enum";
import { useRef, useState } from "react";
import { MdCancel } from "react-icons/md";

interface AccommodationStepProps {
  nextStep: () => void;
}

const AccommodationStep: React.FC<AccommodationStepProps> = ({ nextStep }) => {
  const {
    register,
    formState: { errors, isValid },
    watch,
    getValues,
    setValue,
  } = useFormContext();

  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = watch(formValuesEnum.ACCOMMODATION_IMAGES) || [];

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== 500 || img.height !== 500) {
          setError("Each image must be exactly 500x500 pixels.");
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const currentImages: File[] = getValues(formValuesEnum.ACCOMMODATION_IMAGES) || [];

    if (files.length + currentImages.length > 2) {
      setError("You can only upload a maximum of 2 images.");
      return;
    }

    const newFiles: File[] = [];

    for (const file of files) {
      const isValid = await validateImage(file);
      if (isValid) {
        newFiles.push(file);
      }
    }

    if (newFiles.length > 0) {
      setValue(formValuesEnum.ACCOMMODATION_IMAGES, [...currentImages, ...newFiles]);
      setError("");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const currentImages: File[] = getValues(formValuesEnum.ACCOMMODATION_IMAGES) || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue(formValuesEnum.ACCOMMODATION_IMAGES, updatedImages);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex grow flex-col gap-2">
        <h1>Accommodation</h1>
        <input
          {...register(formValuesEnum.ACCOMMODATION_NAME, {
            required: "Name is required",
            minLength: { value: 4, message: "Min length is 4 characters" },
            maxLength: { value: 128, message: "Max length is 128 characters" },
            pattern: { value: /^[^\d]+$/, message: "Numbers are not allowed" },
          })}
          placeholder="Name"
          className="border border-gray-300 p-2 w-full"
        />
        <input
          {...register(formValuesEnum.ACCOMMODATION_ADDRESS, {
            required: "Name is required",
            minLength: { value: 4, message: "Min length is 4 characters" },
            maxLength: { value: 128, message: "Max length is 128 characters" },
          })}
          placeholder="Address"
          className="border border-gray-300 p-2 w-full"
        />
        <textarea
          {...register(formValuesEnum.ACCOMMODATION_DESCRIPTION, {
            minLength: { value: 128, message: "Min length is 128 characters" },
            maxLength: { value: 2048, message: "Max length is 2048 characters" },
          })}
          placeholder="Description"
          className="border border-gray-300 p-2 w-full resize-none"
          rows={4}
        />
        <select
          {...register(formValuesEnum.ACCOMMODATION_TYPE, { required: "Type is required" })}
          className="border border-gray-300 p-2 w-full"
        >
          {Object.values(accommodationTypesEnum).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div>
          <button
            type="button"
            onClick={handleBrowseClick}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Browse images
          </button>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            ref={fileInputRef}
            className="hidden"
          />

          {images.length > 0 && (
            <p className="mt-1 text-sm text-gray-600">
              Selected images: {images.map((file: File) => file.name).join(", ")}
            </p>
          )}

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="flex gap-2 mt-2">
            {images.map((file: File, index: number) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="flex flex-col items-center relative">
                  <img src={imageUrl} alt="Uploaded" className="w-24 h-24 object-cover" />
                  <div
                    onClick={() => removeImage(index)}
                    className="flex absolute top-1 right-1 text-white p-1 rounded-full cursor-pointer"
                  >
                    <MdCancel className="shadow-2xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          disabled={!isValid}
          type="button"
          onClick={nextStep}
          className={`${isValid ? "bg-blue-500" : "bg-gray-500"} col-start-2 text-white px-4 py-2 rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccommodationStep;
