export function getHeading(
  type: 'email' | 'phone number',
  value?: string,
) {
  return value ? `Change ${type}` : `Add ${type}`;
}
