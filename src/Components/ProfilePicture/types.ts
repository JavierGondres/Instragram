export interface ImageType {
  uri: string;
  type: string;
  name: string;
}

export interface ProfilePictureProps {
  onUpload: (imageUri: string) => void;
  initialState?: string 
}
