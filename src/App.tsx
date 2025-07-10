// src/App.tsx
import {
  Suspense,
  lazy,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { useRoutes } from "react-router";
import MainLayout from "./layout/MainLayout";
import navigationData, { type NavigationDataType } from "./data/navigationData";
import PageLoader from "./shared/PageLoader";
import ComponentLoader from "./shared/ComponentLoader";

// 1. Build a record of `id → React.LazyExoticComponent` before exporting App.
//    That way, the `lazy(...)` call happens exactly once per module, not on every render.

export type RouteComponentMap = {
  [key: string]: LazyExoticComponent<ComponentType<any>>;
};

/**
 * Build a flat map of each top‐level page component keyed by menu.id.
 * e.g. { docs: lazy(() => import('./pages/docs/Docs')) }
 */
export const routeComponents: RouteComponentMap = navigationData.reduce(
  (acc, { id, href, name }: NavigationDataType) => {
    acc[id] = lazy(
      () =>
        import(
          /* webpackChunkName: "[request]" */
          `./pages/${href.replace("/", "").trim()}/${name}.tsx`
        )
    );
    return acc;
  },
  {} as RouteComponentMap
);

/**
 * Build a nested map of child components, grouped by parent id.
 * e.g. { docs: { DocList: lazy(() => import('./pages/docs/Docs/DocList')), … } }
 */
export const childComponents: Record<string, RouteComponentMap> =
  navigationData.reduce(
    (groupAcc, { id: parentId, href, children = [] }: NavigationDataType) => {
      const map: RouteComponentMap = {};
      children.forEach(({ componentName }) => {
        map[componentName] = lazy(
          () =>
            import(
              `./pages/${href.replace("/", "").trim()}/${componentName}.tsx`
            )
        );
      });
      groupAcc[parentId] = map;
      return groupAcc;
    },
    {} as Record<string, RouteComponentMap>
  );

function App() {
  const routesConfig = navigationData.map((menu) => {
    const TopPage = routeComponents[menu.id];
    const children = (menu.children || []).map((child) => {
      const ChildPage = childComponents[menu.id][child.componentName];
      return {
        index: child.href === "",
        path: child.href.replace(/^\//, ""),
        element: (
          <Suspense fallback={<ComponentLoader />}>
            <ChildPage />
          </Suspense>
        ),
      };
    });

    return {
      path: `/${menu.href}`,
      element: (
        <Suspense fallback={<ComponentLoader />}>
          {/* <Await resolve={neverResolving}> */}
          <TopPage />
          {/* </Await> */}
        </Suspense>
      ),
      children,
    };
  });
  const element = useRoutes([
    {
      element: <MainLayout />,
      children: [...routesConfig, { path: "*", element: <h1>not found</h1> }],
    },
  ]);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export default App;
