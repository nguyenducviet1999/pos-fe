import { ComponentType, lazy, ReactNode, Suspense } from "react";
interface ISuspenseProps {
  fallback: ReactNode;
}

type TypePromise<T> = { default: ComponentType<T> } | ComponentType<T>;

export const lazyWithRetry = (componentImport: () => Promise<any>) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error(error);
      window.location.reload();
      throw error;
    }
  });

/**
 * To use. Example: export const ButtonCustom = lazyLoad<IButtonCustomProps>(() => import("@src/components/commons/ButtonCustom"));
 * if have "useFunction" must:
 *      If have not function export Default. Need type import any. Example: () => import("@src/components/commons/LoadingPage") as any,
 *      And not use function export Default: (module) => module.LoadingPageInfo,
 **/
export const lazyLoad = <K extends {}>(
  importFunction: () => Promise<TypePromise<K>>,
  useFunction?: (component: TypePromise<K> | any) => ComponentType<K>,
  suspenseProps: ISuspenseProps = { fallback: null },
) => {
  let lazyCustom: () => Promise<TypePromise<K>> = importFunction;

  if (useFunction) {
    lazyCustom = () =>
      importFunction().then((module) => ({ default: useFunction(module) }));
  }

  const LazyComponent = lazyWithRetry(lazyCustom);

  return (props: K) => (
    <Suspense fallback={suspenseProps.fallback!}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
