import { Tabs } from '@holdr-ui/react';
import { ContentBox } from '../../components/support';

function ArtistProfileTab() {
  return (
    <Tabs defaultValue='posts'>
      <Tabs.List variant='link' css={{ px: '$3' }}>
        <Tabs.Trigger value='posts'>Posts</Tabs.Trigger>
        <Tabs.Trigger value='articles'>Articles</Tabs.Trigger>
        <Tabs.Trigger value='releases'>Releases</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='posts'>
        <ContentBox>🚧 Under construction 🚧</ContentBox>
      </Tabs.Content>
      <Tabs.Content value='releases'>
        <ContentBox>🚧 Under construction 🚧</ContentBox>
      </Tabs.Content>
      <Tabs.Content value='articles'>
        <ContentBox>🚧 Under construction 🚧</ContentBox>
      </Tabs.Content>
    </Tabs>
  );
}

function GeneralUserProfileTab() {
  return (
    <Tabs defaultValue='posts'>
      <Tabs.List variant='link' css={{ px: '$3' }}>
        <Tabs.Trigger value='posts'>Posts</Tabs.Trigger>
        <Tabs.Trigger value='likes'>Likes</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='posts'>
        <ContentBox>🚧 Under construction 🚧</ContentBox>
      </Tabs.Content>
      <Tabs.Content value='likes'>
        <ContentBox>🚧 Under construction 🚧</ContentBox>
      </Tabs.Content>
    </Tabs>
  );
}
GeneralUserProfileTab.displayName = 'GeneralUserProfileTab';
ArtistProfileTab.displayName = 'ArtistProfileTab';

export { GeneralUserProfileTab, ArtistProfileTab };
