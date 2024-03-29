export interface FirebaseError {
  object: string;
  code: string;
  message: string;
  jsEngine: string;
  jsStack: string;
  namespace: string | null;
  nativeErrorCode: string | null;
  nativeErrorMessage: string | null;
  stack: string;
  userInfo: {
    code: string;
    message: string;
  };
}
