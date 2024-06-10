import { ConversionApiResult } from "./conversion-api-result";
import { CurrencyConversion } from "./currency-conversion";
import axios from "axios";

const defaultTimeout = 5000;
const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{{base}}.json";

export class CurrencyConverter {
    public static async convert(conversion: CurrencyConversion, precision: number): Promise<number> {
        const getCurrencyRate = async (url: string, base: string, target: string): Promise<number> => {
            try {
                const response = await axios.get(url, { timeout: defaultTimeout });
                if (!response.status.toString().startsWith("2")) {
                    throw `Unable to get exchange rate. Response status: ${response.status} (${response.statusText})`;
                }

                const conversionResult: ConversionApiResult = response.data;
                if (base in conversionResult && target in conversionResult[base]) {
                    return conversionResult[base][target];
                }

                throw `Unable to get exchange rate. Expected data not found in response.`;
            } catch (err) {
                throw `Unable to get exchange rate. ${err}`;
            }
        };

        const conversionBase = conversion.base.toLowerCase();
        const conversionTarget = conversion.target.toLowerCase();
        const endpoint = baseUrl.replace("{{base}}", conversionBase);
        const rate = await getCurrencyRate(endpoint, conversionBase, conversionTarget);

        return Number(Number.parseFloat(`${conversion.value * rate}`).toFixed(Number(precision)));
    }
}
