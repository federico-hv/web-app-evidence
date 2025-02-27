import { render, screen } from '@testing-library/react';
import NotificationItem, {
  NotificationItemActionWrapper,
  NotificationItemAvatar,
  NotificationItemDetails,
  NotificationItemMediaItem,
} from '../ui/notification-item';

import { Button } from '@holdr-ui/react';

describe('NotificationItem', () => {
  it('displays a notification avatar', () => {
    render(<NotificationItemAvatar src='https://picsum.photos/200' />);
    const avatar = screen.getByAltText('Avatar');
    expect(avatar).to.exist;
  });

  it('displays notification details', () => {
    render(
      <NotificationItemDetails
        name='John'
        description='Some description'
        date={new Date()}
      />,
    );

    const name = screen.getByText('John');
    const description = screen.getByText('some description');
    const timeFromNow = screen.getByText('2 hours ago');
    expect(name).to.exist;
    expect(description).to.exist;
    expect(timeFromNow).to.exist;
  });

  it('displays a notification image', () => {
    const { getByAltText } = render(
      <NotificationItemMediaItem src='https://picsum.photos/200' />,
    );
    const mediaItem = getByAltText('notification media item');
    expect((mediaItem as HTMLMediaElement).src).to.equal('test-media.jpg');
  });

  it('displays a notification action', () => {
    let count = 0;

    const onClickMock = () => count++;
    render(
      <NotificationItemActionWrapper>
        <Button onClick={onClickMock}>Test Action Button</Button>
      </NotificationItemActionWrapper>,
    );
    const actionButton = screen.getByText('Test Action Button');
    expect(actionButton).to.exist;
  });

  it('renders a complete notification', () => {
    render(
      <NotificationItem>
        <NotificationItem.Avatar src='test-avatar.jpg' />
        <NotificationItem.Details
          name='John Doe'
          description='Some notification description'
          date={new Date()}
        />
        <NotificationItem.ActionWrapper>
          <Button onClick={() => console.log('test')}>Action</Button>
        </NotificationItem.ActionWrapper>
        <NotificationItem.MediaItem src='test-media.jpg' />
      </NotificationItem>,
    );

    screen.getByAltText('avatar');
    screen.getByText('John Doe');
    screen.getByText('Some notification description');
    screen.getByText('2 hours ago');
    screen.getByText('Action');
    screen.getByAltText('notification media item');
  });
});
