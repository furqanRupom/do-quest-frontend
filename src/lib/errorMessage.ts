export const getActionErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  // -----------------------------
  // Axios / Fetch-style error
  // -----------------------------
  if (
    error &&
    typeof error === "object" &&
    "response" in error
  ) {
    const response = (error as any).response;

    const data = response?.data;

    if (data) {
      // Case 1: string message
      if (typeof data.message === "string") {
        return data.message;
      }

      // Case 2: array message (your case)
      if (Array.isArray(data.message)) {
        return data.message.join(", ");
      }

      // Case 3: nested errors object (validation style)
      if (data.errors && typeof data.errors === "object") {
        return Object.values(data.errors)
          .flat()
          .join(", ");
      }

      // Case 4: fallback raw data message
      if (typeof data === "string") {
        return data;
      }
    }

    // HTTP status fallback message
    if (response?.statusText) {
      return response.statusText;
    }
  }

  // -----------------------------
  // Native JS error
  // -----------------------------
  if (error instanceof Error) {
    return error.message;
  }

  // -----------------------------
  // String fallback
  // -----------------------------
  if (typeof error === "string") {
    return error;
  }

  return fallbackMessage;
};
