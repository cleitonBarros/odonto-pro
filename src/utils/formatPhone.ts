export function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  
  if(cleaned.length !== 11) {
    return phone.slice(0, 15);
  }
  const formattedPhoneNumber = cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  
  return formattedPhoneNumber;
  
}

export function unformatPhoneNumber(formattedPhone: string) {
  const value = formattedPhone.replace(/[\(\)\s-]/g, "");
  return value;
}
