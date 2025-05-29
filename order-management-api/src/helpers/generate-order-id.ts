const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function generateReadableId(length = 6): string {
  let result = '';
  const alphabetLength = alphabet.length;
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * alphabetLength);
    result += alphabet[index];
  }
  return result;
}

export function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `ORD-${date}-${generateReadableId()}`;
}
