import {
  IExternalId,
  MusicReleaseProvider,
} from '../../../../../features';
import {
  extractSoundCloudPlaylistID,
  extractSpotifyPlaylistID,
} from '../../../../../shared';

export const dummySoundCloudPlaylist: IExternalId<
  number,
  MusicReleaseProvider
> = {
  id: 1,
  provider: 'Soundcloud',
  externalId:
    extractSoundCloudPlaylistID(
      '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1710937740&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/sc-playlists-ca" title="Discovery Playlists" target="_blank" style="color: #cccccc; text-decoration: none;">Discovery Playlists</a> · <a href="https://soundcloud.com/sc-playlists-ca/sets/party-warehouse" title="Party WareHouse" target="_blank" style="color: #cccccc; text-decoration: none;">Party WareHouse</a></div>',
    ) || '',
};

export const dummySpotifyPlaylist: IExternalId<
  number,
  MusicReleaseProvider
> = {
  id: 1,
  provider: 'Spotify',
  externalId:
    extractSpotifyPlaylistID(
      '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWYmmr74INQlb?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    ) || '',
};
