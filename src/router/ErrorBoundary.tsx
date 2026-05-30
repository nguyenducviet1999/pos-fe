import { Component, type JSX } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { AlertTriangleIcon, SparklesIcon } from "lucide-react";

import { Button } from "@src/components/ui/button";
import { cn } from "@src/lib/utils";
import { pathConstants } from "@src/router/path.constants";

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
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex min-h-screen w-screen items-center justify-center p-6",
        "bg-gradient-to-br from-primary/10 via-background to-primary/5",
      )}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <SparklesIcon className="size-8 text-primary-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {t("commons.APP_NAME")}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangleIcon className="size-7 text-destructive" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {t("pages.error_boundary.TITLE", {
              defaultValue: "Something went wrong",
            })}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t("pages.error_boundary.DESCRIPTION", {
              defaultValue:
                "An unexpected error occurred. Try reloading the page or return to the dashboard.",
            })}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => window.location.reload()}
            >
              {t("pages.error_boundary.TRY_AGAIN", {
                defaultValue: "Try again",
              })}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <a href={pathConstants.HOME}>
                {t("pages.error_boundary.GO_TO_DASHBOARD", {
                  defaultValue: "Go to dashboard",
                })}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
