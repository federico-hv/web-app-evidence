interface OgImage {
  url: string;
  type: string;
}

interface OgSite {
  name: string;
  logo: string;
}

interface OgMetadata {
  title: string;
  description: string;
  images: Array<OgImage>;
  url: string;
  site: OgSite;
}

export type { OgSite, OgImage, OgMetadata };
