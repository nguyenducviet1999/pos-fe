import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  CheckIcon,
  MapPinIcon,
  MonitorIcon,
  SparklesIcon,
  StoreIcon,
} from "lucide-react";

import { Spinner } from "@src/components/ui/spinner";
import { POS_DEVICE_ID } from "@src/constants/local-storage.constants";
import { cn } from "@src/lib/utils";
import { EnumStoreProperties, IStore, STORES_MOCK } from "@src/models/store";
import { pathConstants } from "@src/router/path.constants";
import {
  getLocalStorage,
  saveLocalStorage,
  setSelectedStore,
} from "@src/utils";

const generateDeviceId = (): string => {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `POS-${random}`;
};

const SelectStorePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const deviceId = useMemo<string>(() => {
    const stored = getLocalStorage(POS_DEVICE_ID) as string | null;
    if (stored) return stored;
    const fresh = generateDeviceId();
    saveLocalStorage(POS_DEVICE_ID, fresh);
    return fresh;
  }, []);

  const filteredStores = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return STORES_MOCK;
    return STORES_MOCK.filter((store) => {
      const haystack = [
        store[EnumStoreProperties.NAME],
        store[EnumStoreProperties.CITY],
        store[EnumStoreProperties.STATE],
        store[EnumStoreProperties.ADDRESS],
        store[EnumStoreProperties.CODE],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(keyword);
    });
  }, [search]);

  const handleConfirm = async () => {
    const store = STORES_MOCK.find(
      (s) => s[EnumStoreProperties.ID] === selectedId,
    );
    if (!store) {
      toast.error(t("select_store.PLEASE_PICK_ONE"));
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSelectedStore(store);
      toast.success(
        t("select_store.KIOSK_READY", {
          name: store[EnumStoreProperties.NAME],
        }),
      );
      navigate(pathConstants.HOME, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-screen items-start justify-center p-6"
      style={{
        background:
          "linear-gradient(160deg, rgb(11, 14, 45) 0%, rgb(27, 17, 69) 50%, rgb(11, 14, 45) 100%)",
      }}
    >
      <div className="w-full max-w-2xl py-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30">
            <SparklesIcon className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {t("commons.APP_NAME")}
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {t("select_store.WELCOME", { name: "Vu A" })}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/10">
              <MonitorIcon className="size-5 text-white/80" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {t("select_store.POS_DEVICE_ID")}
              </p>
              <p className="text-xs text-white/50">
                {t("select_store.POS_DEVICE_HINT")}
              </p>
            </div>
          </div>
          <code className="tabular-nums rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
            {deviceId}
          </code>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
          <div className="mb-1 flex items-center gap-2">
            <StoreIcon className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">
              {t("select_store.TITLE")}
            </h2>
          </div>
          <p className="mb-5 text-sm text-white/60">
            {t("select_store.SUBTITLE")}
          </p>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("select_store.SEARCH_PLACEHOLDER")}
            className={cn(
              "mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40",
              "focus:border-primary focus:ring-2 focus:ring-primary/40",
            )}
          />

          <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
            {filteredStores.length === 0 ? (
              <li className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-white/50">
                {t("select_store.NO_RESULTS")}
              </li>
            ) : (
              filteredStores.map((store) => {
                const id = store[EnumStoreProperties.ID];
                const isSelected = id === selectedId;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(id)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
                        isSelected
                          ? "border-primary bg-primary/15 ring-1 ring-primary"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.06]",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-white/10 text-white/80 group-hover:bg-white/15",
                        )}
                      >
                        {store[EnumStoreProperties.CODE]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {store[EnumStoreProperties.NAME]}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-white/55">
                          <MapPinIcon className="size-3" />
                          <span className="truncate">
                            {store[EnumStoreProperties.ADDRESS]},{" "}
                            {store[EnumStoreProperties.CITY]},{" "}
                            {store[EnumStoreProperties.STATE]}
                          </span>
                        </p>
                      </div>
                      {isSelected && (
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <CheckIcon className="size-3.5" />
                        </div>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedId || isSubmitting}
            className={cn(
              "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold shadow-md transition",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isSubmitting && (
              <Spinner className="size-4 text-primary-foreground" />
            )}
            {t("select_store.CONFIRM")}
          </button>

          <p className="mt-3 text-center text-xs text-white/45">
            {t("select_store.CHANGE_LATER_HINT")}
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-white/35">
          {t("login.COPYRIGHT", {
            year: new Date().getFullYear(),
            name: t("commons.APP_NAME"),
          })}
        </p>
      </div>
    </div>
  );
};

export default SelectStorePage;
