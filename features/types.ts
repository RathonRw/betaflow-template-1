export interface TUser {
  displayName?: string | null;
  image?: string | null;
  // Identity
  name: string;

  // Public Profile
  publicInfo?: {
    bio: string;

    socialMediaAccounts: {
      platform: string;
      url: string;
    }[];

    // UI Preferences
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
  } | null;

  // Timestamps
  updatedAt: number;
  username: string;
}

export interface TBlog {
  // Content
  content: string;

  // Analytics
  counter: {
    words: number;
    characters: number;
  };
  coverImage?: string;

  // Timestamps
  createdAt: number;
  description?: string;
  emoji?: string;

  // Grouping
  group: {
    title?: string;
    slug?: string;
  };
  isPinned: boolean;
  slug: string;

  // Metadata
  status: "draft" | "published" | "archived" | "deleted";
  // Identity
  title: string;
  updatedAt: number;
}
export interface TFile {
  contentType?: string;

  // Timestamps
  createdAt: number;

  // Grouping
  group: {
    title?: string;
    slug?: string;
  };
  isPinned: boolean;
  size?: number;
  slug: string;

  // Metadata
  status: "draft" | "published" | "archived" | "deleted";
  // Identity
  title: string;
  updatedAt: number;

  // File Data
  url: string;
}
