/**
 * SakuraPay SMS Scraper
 * Extracts payment data from MNO confirmation messages.
 */
export function parseCarrierSMS(text: string) {
  // M-Pesa Example: "9K203X82N4M Confirmed. You have received Tsh10,000 from..."
  const mpesaRef = text.match(/([A-Z0-9]{10,12})\sConfirmed/i);
  const mpesaAmt = text.match(/Tsh([\d,]+)/i);
  const mpesaPhone = text.match(/(255\d{9})/);

  if (mpesaRef && mpesaAmt) {
    return {
      reference: mpesaRef[1].toUpperCase(),
      amount: parseFloat(mpesaAmt[1].replace(/,/g, '')),
      phone: mpesaPhone ? mpesaPhone[1] : "UNKNOWN",
      provider: "MPESA"
    };
  }
  
  // Add Tigo/Airtel logic here...
  return null;
}
