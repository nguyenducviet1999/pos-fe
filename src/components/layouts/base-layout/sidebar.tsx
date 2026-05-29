import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { SparklesIcon, XIcon } from "lucide-react";

import { cn } from "@src/lib/utils";

import { BASE_LAYOUT_MENU_ITEMS } from "./menu-items.constants";

interface ISidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<ISidebarProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("layouts.base.MENU_ARIA")}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-[250px] min-w-[250px] flex-col overflow-hidden border-r border-gray-200 bg-white shadow-xl transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <SparklesIcon className="size-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">
                {t("layouts.base.BRAND_TITLE")}
              </p>
              <p className="text-xs text-gray-500">
                {t("layouts.base.BRAND_SUBTITLE")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("layouts.base.CLOSE_MENU")}
            className="inline-flex size-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="flex flex-col gap-0.5 px-2">
            {BASE_LAYOUT_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.path)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        isActive ? "text-primary" : "text-gray-500",
                      )}
                    />
                    <span className="truncate">{t(item.labelKey)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};
