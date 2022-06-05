export interface Video {
  Id: number;
  Guid: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  MediaAgeRestrictionValueMin: number;
  MediaAgeRestrictionImageUrl: string;
  Title: string;
  Description: string;
  Year: number;
  Duration: number;
  IsTrialContentAvailable: boolean;
  AvailableFrom: string;
  Images: VideoImage[];
}

export interface VideoImage {
  Id: number;
  MediaId: number;
  PlatformCode: string;
  ImageTypeCode: string;
  Url: string;
  Width: number;
  Height: number;
}
