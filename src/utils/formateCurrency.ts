export const formatCurrency = (amount: number | undefined | null): string => {
  if (amount === null || typeof amount === 'undefined') {
    return 'N/A';
  }

  // Intl.NumberFormat ব্যবহার করে কারেন্সি ফরম্যাট করুন
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0, // দশমিকের পরের অংশ বাদ দেওয়ার জন্য
  }).format(amount);
};