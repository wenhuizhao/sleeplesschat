// NOTE: optimally move this into a separate file
export interface User {
  uuid: string;
  name: string;
  email?: string;
  authToken?: string;
  avatar?: string;
}
