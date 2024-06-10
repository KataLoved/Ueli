interface ConversionApiResultDate {
    date: string;
}
interface ConversionApiResultValue {
    [key: string]: Record<string, number>;
}
export type ConversionApiResult = ConversionApiResultDate & ConversionApiResultValue;
