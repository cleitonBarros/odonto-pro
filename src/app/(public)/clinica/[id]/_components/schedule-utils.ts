/**
 * Verifica se e o dia de hoje atual.
 */

export function isToday(date: Date) {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}


/**
 * Verifica se determinado horário ja passou.
 */
export function isSlotInThePast(slotTime: string): boolean {
  const now = new Date();
  const [hours, minutes] = slotTime.split(':').map(Number);
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  if (hours < currentHours) {
    return true;
  } else if (hours === currentHours && minutes <= currentMinutes) {
    return true;
  }
  return false;
}

export function isSlotSequenceAvailable(startSlot: string, requiredSlots: number, allSlots: string[], blockedSlots: string[]): boolean {
  const startIndex = allSlots.indexOf(startSlot)
  if (startIndex === -1 || startIndex + requiredSlots > allSlots.length) {
    return false;
  }


  for (let i = startIndex; i < startIndex + requiredSlots; i++) {
    const slotTime = allSlots[i]

    if (blockedSlots.includes(slotTime)) {
      return false;
    }
  }

  return true;
}