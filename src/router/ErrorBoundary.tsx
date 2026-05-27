import { Component, type JSX } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

// import { picNoImage } from "@src/assets/images";

// ErrorBoundary Component
type IErrorBoundaryProps = {
  fallback?: JSX.Element;
  children: JSX.Element;
};

export const LOCAL_STORAGE_WINDOW_RELOAD_DATETIME = "window_reload_datetime";
export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error) {
    this.setState(null);
    // const errorStr = `Stack: ${error?.stack} Message: ${error?.message}`;
    const arrError = [
      "ChunkLoadError",
      "Unable to preload CSS for",
      "Loading CSS chunk",
      "Failed to fetch dynamically",
    ];
    const isChunkLoadError = arrError.some((subStr: string) =>
      (error?.stack ?? error.message)?.includes(subStr),
    );
    if (isChunkLoadError) {
      const oldDate = sessionStorage.getItem(
        LOCAL_STORAGE_WINDOW_RELOAD_DATETIME,
      ); // prevent from loop reload
      if (!oldDate || dayjs().diff(dayjs(oldDate), "hour") > 1) {
        window.location.reload();
        sessionStorage.setItem(
          LOCAL_STORAGE_WINDOW_RELOAD_DATETIME,
          dayjs().toString(),
        );
      }
    }
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <></>;
    }
    return this.props.children;
  }
}

export const SomethingWentWrong = () => {
  const translate = useTranslation().t;
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1
        className="text-[24px] text-black text-center leading-[1.2]"
        dangerouslySetInnerHTML={{
          __html: translate("pages.error_boundary.HAVE_PROBLEM"),
        }}
      />
      {/* <img className="inline-block my-4" src={picNoImage} alt="no data" /> */}
      <a className="cursor-pointer" onClick={() => window.location.reload()}>
        {translate("pages.error_boundary.TRY_AGAIN")}
      </a>
      <a href="/">{translate("pages.error_boundary.GO_TO_DASHBOARD")}</a>
    </div>
  );
};
