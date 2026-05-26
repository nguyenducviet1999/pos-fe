const checkNotEmptyForHtmlContent = (htmlContent: string) => {
  const doc = new DOMParser().parseFromString(htmlContent, "text/html");
  const body = doc?.body;
  const textContent = body?.textContent || "";
  const trimmedContent = textContent?.trim();
  // trimmedContent length > 0 or have tag img, video, audio, iframe
  const hasMediaContent = Array.from(body?.querySelectorAll("img, video, audio, iframe")).length > 0;
  return trimmedContent?.length > 0 || hasMediaContent;
};

const validatorConstants = {
  checkNotEmptyForHtmlContent,
};
export default validatorConstants;
