import { fireEvent, render, screen } from '@testing-library/react';
import NotificationItem, {
  NotificationActionButton,
  NotificationAvatar,
  NotificationDetails,
  NotificationMediaItem,
} from '../ui/notification-item';

import logo from '../../../assets/images/logo.png';

describe('NotificationItem', () => {
  it('renders a NotificationAvatar component', () => {
    render(<NotificationAvatar avatarImage='https://picsum.photos/200' />);
    const avatar = screen.getByAltText('Avatar');
    expect(avatar).to.exist;
  });

  it('renders a NotificationDetails component', () => {
    render(
      <NotificationDetails
        name='John'
        description='Some description'
        timeFromNow='2 hours ago'
      />,
    );

    const name = screen.getByText('John');
    const description = screen.getByText('some description');
    const timeFromNow = screen.getByText('2 hours ago');
    expect(name).to.exist;
    expect(description).to.exist;
    expect(timeFromNow).to.exist;
  });

  it('renders a NotificationMediaItem component', () => {
    const { getByAltText } = render(
      <NotificationMediaItem mediaItem='https://picsum.photos/200' />,
    );
    const mediaItem = getByAltText('notification media item');
    expect((mediaItem as HTMLMediaElement).src).to.equal('test-media.jpg');
  });

  it('renders a NotificationActionButton component', () => {
    let count = 0;

    const onClickMock = () => count++;
    render(
      <NotificationActionButton onClick={onClickMock}>
        Test Action Button
      </NotificationActionButton>,
    );
    const actionButton = screen.getByText('Test Action Button');
    expect(actionButton).to.exist;
  });

  it('has a functional onClick', () => {
    let count = 0;

    const onClickMock = () => count++;
    render(
      <NotificationActionButton onClick={onClickMock}>
        Test Action Button
      </NotificationActionButton>,
    );
    const actionButton = screen.getByText('Test Action Button');
    fireEvent.click(actionButton);
    expect(count).to.equal(1);
  });

  it('renders a NotificationItem component', () => {
    render(
      <NotificationItem>
        <NotificationItem.Avatar avatarImage='test-avatar.jpg' />
        <NotificationItem.Details
          name='John Doe'
          description='Some notification description'
          timeFromNow='2 hours ago'
        />
        <NotificationItem.ActionButton onClick={() => {}}>
          Action
        </NotificationItem.ActionButton>
        <NotificationItem.MediaItem mediaItem='test-media.jpg' />
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
