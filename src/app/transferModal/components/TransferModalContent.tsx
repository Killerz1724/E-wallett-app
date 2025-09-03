import Button from "components/Button";
import SelectRecipient from "./SelectMethod";
import CurrencyInput from "react-currency-input-field";

export default function TransferModalContent() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h5 className="text-3xl font-bold">Transfer</h5>
      <form action="" className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="source-fund" className="font-semibold text-sm">
            Select Recipient
          </label>
          <SelectRecipient />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="source-fund" className="font-semibold text-sm">
            Amount
          </label>
          <CurrencyInput
            className="px-4 py-2 w-full  border-1 border-gray-300 rounded-md max-w-lg no-arrows"
            placeholder="ex: 10.000"
            allowNegativeValue={false}
            allowDecimals={false}
            decimalSeparator=","
            groupSeparator="."
          />
        </div>

        <Button className="py-2">Transfer</Button>
      </form>
    </div>
  );
}
