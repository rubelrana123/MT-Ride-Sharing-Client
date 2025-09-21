import { CreditCard } from "lucide-react";

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export default function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
  const paymentMethods = [
    { id: "cash", name: "Cash", available: true },
    { id: "online", name: "Online Payment(Not Available)", available: false }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <CreditCard className="h-5 w-5 mr-2" />
        Payment Method
      </h2>
      
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
            } ${!method.available ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => method.available && onMethodChange(method.id)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedMethod === method.id 
                  ? "border-blue-500 bg-blue-500" 
                  : "border-gray-300"
              }`} />
              <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}