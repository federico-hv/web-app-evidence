import { Button } from '@holdr-ui/react';

function ArtistClubHeaderAuctionButton({
  isCurrentArtistAccount,
  hasLiveAuction,
  onCreate,
  onDelete,
}: {
  isCurrentArtistAccount: boolean;
  hasLiveAuction: boolean;
  onCreate: () => void;
  onDelete: () => void;
}) {
  if (!isCurrentArtistAccount) {
    return null;
  }

  return hasLiveAuction ? (
    <Button
      colorTheme='danger200'
      variant='outline'
      css={{
        px: '20px',
      }}
      onClick={onDelete}
    >
      Cancel Auction
    </Button>
  ) : (
    <Button css={{ px: '50px' }} colorTheme='purple100' onClick={onCreate}>
      Start Auction
    </Button>
  );
}

ArtistClubHeaderAuctionButton.displayName =
  'ArtistClubHeaderAuctionButton';

export default ArtistClubHeaderAuctionButton;
