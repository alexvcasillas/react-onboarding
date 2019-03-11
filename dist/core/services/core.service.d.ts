export declare type Tree = {
    [x: string]: string;
};
interface IOnboardingService {
    tree: object;
    setStep(step: string): void;
    setField(field: string, step: string): void;
    setFieldValue(field: string, step: string, value: string): void;
    getFieldValue(field: string, step: string): string;
}
declare const onboardingService: IOnboardingService;
export { onboardingService as OnboardingService };
