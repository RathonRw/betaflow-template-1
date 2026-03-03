export interface TUser {
  name: string;
  username: string;
  displayName: string | null | undefined;
  image: string | null | undefined;
  updatedAt: number;
  publicInfo: {
    _id: string;
    _creationTime: number;
    blogView: {
      showTitle: boolean;
      showDescription: boolean;
      showCoverImage: boolean;
      showDate: boolean;
      showGroup: boolean;
      showAuthor: boolean;
    };

    fileView: {
      showTitle: boolean;
      showDate: boolean;
      showGroup: boolean;
      showAuthor: boolean;
      showPreview: boolean;
      showFileType: boolean;
      showFileSize: boolean;
    };

    bio: string;
    socialMediaAccounts: {
      platform: string;
      url: string;
    }[];
  } | null;
}

export interface TBlog {
  group: {
    title: string | undefined;
    slug: string | undefined;
  };
  _id: string;
  _creationTime: number;
  emoji?: string | undefined;
  description?: string | undefined;
  coverImage?: string | undefined;
  updatedAt: number;
  createdAt: number;
  status: "draft" | "published" | "archived" | "deleted";
  title: string;
  slug: string;
  content: string;
  counter: {
    words: number;
    characters: number;
  };
  isPinned: boolean;
}
[];

export interface TFile {
  updatedAt: number;
  createdAt: number;
  status: "draft" | "published" | "archived" | "deleted";
  title: string;
  slug: string;
  isPinned: boolean;
  url: string;
  contentType: string | undefined;
  size: number | undefined;
  group: {
    title: string | undefined;
    slug: string | undefined;
  };
}
