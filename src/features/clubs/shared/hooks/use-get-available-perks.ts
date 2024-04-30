export function useGetAvailablePerks() {
  return [
    { id: 'fotl', label: 'Front of the line (FOTL)' },
    { id: 'early-access', label: 'Early access tickets' },
    { id: 'discounted-tickets', label: 'Discounted tickets' },
    { id: 'exclusive-tickets', label: 'Exclusive tickets' },
    { id: 'free-tickets', label: 'Free tickets' },
    {
      id: 'early-access-merchandise',
      label: 'Early access merchandise',
    },
    { id: 'exclusive-merchandise', label: 'Exclusive merchandise' },
    { id: 'discounted-merchandise', label: 'Discounted merchandise' },
    {
      id: 'exclusive-music-previews',
      label: 'Exclusive music previews',
    },
  ];
}
