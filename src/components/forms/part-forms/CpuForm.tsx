// @ts-nocheck
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import "./PartForms.scss";
import { useEffect } from "react";

const CpuForm = ({ register, unregister, errors, isEditForm, cpu }) => {
    useEffect(() => {
        return () => {
            unregister("baseFrequency");
            unregister("boostFrequency");
            unregister("cpuCores");
            unregister("cpuThreads");
            unregister("maxRamCapacity");
            unregister("tdp");
            unregister("cachel1");
            unregister("cachel2");
            unregister("cachel3");
            unregister("socket");
            unregister("techProcess");
            unregister("ramType");
        };
    }, []);

    return (
        <div className="cpu-form">
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.baseFrequency : ""}
                    onlyPositiveDigits={true}
                    labelText="Базовая частота (МГц)"
                    require={true}
                    name="baseFrequency"
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.boostFrequency : ""}
                    onlyPositiveDigits={true}
                    labelText="Турбо частота (МГц)"
                    name="boostFrequency"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.cpuCores : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество ядер"
                    name="cpuCores"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.cpuThreads : ""}
                    onlyPositiveDigits={true}
                    labelText="Количество потоков"
                    name="cpuThreads"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.maxRamCapacity : ""}
                    onlyPositiveDigits={true}
                    labelText="Максимальный объём памяти (ГБ)"
                    name="maxRamCapacity"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.tdp : ""}
                    onlyPositiveDigits={true}
                    labelText="Тепловыделение (Вт)"
                    name="tdp"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.cacheL1 : ""}
                    labelText="Кэш 1-го уровня"
                    name="cachel1"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.cacheL2 : ""}
                    labelText="Кэш 2-го уровня"
                    name="cachel2"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.cacheL3 : ""}
                    labelText="Кэш 3-го уровня"
                    name="cachel3"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.socket : ""}
                    labelText="Сокет"
                    name="socket"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={isEditForm ? cpu?.techProcess : ""}
                    labelText="Тех-процесс"
                    name="techProcess"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="cpu-form__input">
                <CustomInput
                    defaultValue={
                        isEditForm ? JSON.parse(cpu?.ramType).join(", ") : ""
                    }
                    labelText="Поддерживаемый тип памяти (DDR3, DDR4, DDR5)"
                    name="ramType"
                    minLength={0}
                    require={true}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default CpuForm;
