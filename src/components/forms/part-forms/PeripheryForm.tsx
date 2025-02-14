import { v4 as uuidv4 } from "uuid";
import PeripheryInput from "@/components/inputs/periphery-input/PeripheryInput";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";
import { ICharacteristicItem, IPart } from "@/interfaces/types-v2";

interface PeripheryFormProps {
    register: UseFormRegister<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    part: IPart | null;
}

const PeripheryForm = ({
    register,
    unregister,
    errors,
    part,
}: PeripheryFormProps) => {
    const defaultValue = (characteristics: ICharacteristicItem[]) => {
        const defaultValue: ICharacteristicItem[] = [];

        characteristics.forEach((element) => {
            defaultValue.push({
                value: element.value,
                item: Array.isArray(element.item)
                    ? element.item.join(", ")
                    : element.item,
                label: element.label,
            } as ICharacteristicItem);
        });

        return defaultValue;
    };

    //  const defaultValue = (characteristicsString: ICharacteristicItem[]) => {
    //      const characteristic = JSON.parse(characteristicsString);
    //      const defaultValue = [];

    //      for (const key in characteristic) {
    //          defaultValue.push({
    //              id: uuidv4(),
    //              key: key,
    //              value: characteristic[key],
    //          });
    //      }
    //      return defaultValue;
    //  };

    return (
        <div>
            <PeripheryInput
                register={register}
                errors={errors}
                defaultValue={part ? defaultValue(part?.characteristics) : null}
                unregister={unregister}
            />
        </div>
    );
};

export default PeripheryForm;
