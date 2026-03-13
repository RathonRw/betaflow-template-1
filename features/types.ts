export interface TUser {
  displayName: string | null | undefined;
  image: string | null | undefined;
  name: string;
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
  updatedAt: number;
  username: string;
}

export interface TBlog {
  _creationTime: number;
  _id: string;
  content: string;
  counter: {
    words: number;
    characters: number;
  };
  coverImage?: string | undefined;
  createdAt: number;
  description?: string | undefined;
  emoji?: string | undefined;
  group: {
    title: string | undefined;
    slug: string | undefined;
  };
  isPinned: boolean;
  slug: string;
  status: "draft" | "published" | "archived" | "deleted";
  title: string;
  updatedAt: number;
}
[];

export interface TFile {
  contentType: string | undefined;
  createdAt: number;
  group: {
    title: string | undefined;
    slug: string | undefined;
  };
  isPinned: boolean;
  size: number | undefined;
  slug: string;
  status: "draft" | "published" | "archived" | "deleted";
  title: string;
  updatedAt: number;
  url: string;
}
