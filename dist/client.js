// src/client/embedded-dev-tools.tsx
import clsx17 from "clsx";
import { useEffect as useEffect22, useState as useState14 } from "react";
import { useLocation as useLocation2 } from "react-router";

// src/client/context/RDTContext.tsx
import { createContext, useEffect as useEffect2, useMemo, useReducer } from "react";

// src/shared/bigint-util.ts
var bigIntReplacer = (key, value) => typeof value === "bigint" ? value.toString() : value;
var convertBigIntToString = (data) => {
  if (typeof data === "bigint") {
    return data.toString();
  }
  if (Array.isArray(data)) {
    return data.map((item) => convertBigIntToString(item));
  }
  if (data !== null && typeof data === "object") {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, convertBigIntToString(value)]));
  }
  return data;
};

// src/client/hooks/detached/useRemoveBody.ts
import { useEffect } from "react";

// src/client/utils/storage.ts
var getStorageItem = (key) => localStorage.getItem(key);
var setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    return;
  }
};
var getSessionItem = (key) => sessionStorage.getItem(key);
var setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    return;
  }
};
var getBooleanFromStorage = (key) => getStorageItem(key) === "true";
var getBooleanFromSession = (key) => getSessionItem(key) === "true";
var REACT_ROUTER_DEV_TOOLS = "react_router_devtools";
var REACT_ROUTER_DEV_TOOLS_STATE = "react_router_devtools_state";
var REACT_ROUTER_DEV_TOOLS_SETTINGS = "react_router_devtools_settings";
var REACT_ROUTER_DEV_TOOLS_DETACHED = "react_router_devtools_detached";
var REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER = "react_router_devtools_detached_owner";
var REACT_ROUTER_DEV_TOOLS_IS_DETACHED = "react_router_devtools_is_detached";
var REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED = "react_router_devtools_check_detached";

// src/client/hooks/detached/useRemoveBody.ts
var useRemoveBody = (state) => {
  useEffect(() => {
    if (!state.detachedWindow) {
      return;
    }
    const elements = document.body.children;
    document.body.classList.add("bg-[#212121]");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id !== REACT_ROUTER_DEV_TOOLS) {
        element.classList.add("hidden");
      }
    }
  }, [state]);
};

// src/client/utils/detached.ts
var checkIsDetachedWindow = () => getBooleanFromSession(REACT_ROUTER_DEV_TOOLS_DETACHED);
var checkIsDetached = () => getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_IS_DETACHED);
var checkIsDetachedOwner = () => getBooleanFromSession(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER);

// src/client/utils/sanitize.ts
var convertReactRouterPathToUrl = (routes, route) => {
  let currentRoute = route;
  const path = [];
  while (currentRoute) {
    path.push(currentRoute.path);
    if (!currentRoute.parentId) break;
    if (!routes[currentRoute.parentId]) break;
    currentRoute = routes[currentRoute.parentId];
  }
  const output = path.reverse().filter(Boolean).join("/");
  return output === "" ? "/" : output;
};
var findParentErrorBoundary = (routes, route) => {
  let currentRoute = route;
  while (currentRoute) {
    const hasErrorBoundary = currentRoute.hasErrorBoundary;
    if (hasErrorBoundary) return { hasErrorBoundary, errorBoundaryId: currentRoute.id };
    if (!currentRoute.parentId) break;
    if (!routes[currentRoute.parentId]) break;
    currentRoute = routes[currentRoute.parentId];
  }
  return { hasErrorBoundary: false, errorBoundaryId: null };
};
var tryParseJson = (json) => {
  if (!json) return void 0;
  try {
    return JSON.parse(json);
  } catch (e) {
    return void 0;
  }
};
var constructTree = (routes, parentId) => {
  const nodes = [];
  const routeKeys = Object.keys(routes);
  for (const key of routeKeys) {
    const route = routes[key];
    if (route.parentId === parentId) {
      const url = convertReactRouterPathToUrl(routes, route);
      const node = {
        name: url,
        attributes: {
          ...route,
          url
        },
        errorBoundary: findParentErrorBoundary(routes, route),
        children: constructTree(routes, route.id)
      };
      nodes.push(node);
    }
  }
  return nodes;
};
var createRouteTree = (routes) => {
  return constructTree(routes);
};
var uppercaseFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// src/client/utils/common.ts
var cutArrayToLastN = (arr, n) => {
  if (arr.length < n) return arr;
  return arr.slice(arr.length - n);
};
var cutArrayToFirstN = (arr, n) => {
  if (arr.length < n) return arr;
  return arr.slice(0, n);
};

// src/client/context/rdtReducer.ts
var defaultServerRouteState = {
  highestExecutionTime: 0,
  lowestExecutionTime: 0,
  averageExecutionTime: 0,
  loaderTriggerCount: 0,
  actionTriggerCount: 0,
  lastAction: {},
  lastLoader: {},
  loaders: [],
  actions: []
};
var ROUTE_BOUNDARY_GRADIENTS = {
  sea: "sea-gradient",
  hyper: "hyper-gradient",
  gotham: "gotham-gradient",
  gray: "gray-gradient",
  watermelon: "watermelon-gradient",
  ice: "ice-gradient",
  silver: "silver-gradient"
};
var RouteBoundaryOptions = Object.keys(ROUTE_BOUNDARY_GRADIENTS);
var initialState = {
  timeline: [],
  terminals: [{ id: 0, locked: false, output: [], history: [] }],
  server: void 0,
  settings: {
    enableInspector: false,
    showRouteBoundariesOn: "click",
    breakpoints: [
      { name: "", min: 0, max: 639 },
      { name: "sm", min: 640, max: 767 },
      { name: "md", min: 768, max: 1023 },
      { name: "lg", min: 1024, max: 1279 },
      { name: "xl", min: 1280, max: 1535 },
      { name: "2xl", min: 1536, max: 9999 }
    ],
    showBreakpointIndicator: true,
    liveUrls: [],
    liveUrlsPosition: "bottom-left",
    editorName: "VSCode",
    routeBoundaryGradient: "watermelon",
    routeWildcards: {},
    activeTab: "page",
    height: 400,
    maxHeight: 600,
    minHeight: 200,
    defaultOpen: false,
    hideUntilHover: false,
    position: "bottom-right",
    expansionLevel: 1,
    hoveredRoute: "",
    isHoveringRoute: false,
    routeViewMode: "tree",
    panelLocation: "bottom",
    withServerDevTools: true,
    openHotkey: "shift+a",
    requireUrlFlag: false,
    urlFlag: "rdt"
  },
  htmlErrors: [],
  persistOpen: false,
  detachedWindow: false,
  detachedWindowOwner: false
};
var rdtReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_DETACHED_WINDOW_OWNER":
      return {
        ...state,
        detachedWindowOwner: payload
      };
    case "SET_HTML_ERRORS":
      return {
        ...state,
        htmlErrors: [...payload]
      };
    case "SET_SERVER_INFO":
      return {
        ...state,
        server: payload
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload
        }
      };
    case "SET_TIMELINE_EVENT":
      return {
        ...state,
        timeline: cutArrayToFirstN([payload, ...state.timeline], 30)
      };
    case "SET_WHOLE_STATE": {
      return {
        ...payload
      };
    }
    case "PURGE_TIMELINE":
      return {
        ...state,
        timeline: []
      };
    case "SET_IS_SUBMITTED":
      return {
        ...state,
        ...payload,
        isSubmitted: true
      };
    case "SET_PROCESS_ID":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              processId: payload.processId
            };
          }
          return terminal;
        })
      };
    case "TOGGLE_TERMINAL_LOCK":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              locked: payload.locked ?? !terminal.locked
            };
          }
          return terminal;
        })
      };
    case "ADD_OR_REMOVE_TERMINAL": {
      const terminalExists = state.terminals.some((terminal) => terminal.id === payload);
      if (terminalExists) {
        return {
          ...state,
          terminals: state.terminals.filter((terminal) => terminal.id !== payload).map((terminal, i) => ({ ...terminal, id: i }))
        };
      }
      return {
        ...state,
        terminals: [
          ...state.terminals,
          {
            id: state.terminals.length,
            locked: false,
            history: [],
            output: []
          }
        ]
      };
    }
    case "ADD_TERMINAL_OUTPUT":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              output: [...terminal.output, payload.output]
            };
          }
          return terminal;
        })
      };
    case "CLEAR_TERMINAL_OUTPUT":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload) {
            return {
              ...terminal,
              output: []
            };
          }
          return terminal;
        })
      };
    case "ADD_TERMINAL_HISTORY":
      return {
        ...state,
        terminals: state.terminals.map((terminal) => {
          if (terminal.id === payload.terminalId) {
            return {
              ...terminal,
              history: [...terminal.history, payload.history]
            };
          }
          return terminal;
        })
      };
    case "SET_PERSIST_OPEN":
      return {
        ...state,
        persistOpen: payload
      };
    default:
      return state;
  }
};

// src/client/context/RDTContext.tsx
import { jsx } from "react/jsx-runtime";
var RDTContext = createContext({ state: initialState, dispatch: () => null });
RDTContext.displayName = "RDTContext";
var setIsDetachedIfRequired = () => {
  const isDetachedWindow = checkIsDetachedWindow();
  if (!isDetachedWindow && window.RDT_MOUNTED) {
    setSessionItem(REACT_ROUTER_DEV_TOOLS_DETACHED, "true");
  }
};
var resetIsDetachedCheck = () => {
  setStorageItem(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED, "false");
};
var detachedModeSetup = () => {
  resetIsDetachedCheck();
  setIsDetachedIfRequired();
  const isDetachedWindow = checkIsDetachedWindow();
  const isDetached = checkIsDetached();
  const isDetachedOwner = checkIsDetachedOwner();
  if (isDetachedWindow && !isDetached) {
    window.close();
  }
  if (!isDetached && isDetachedOwner) {
  }
  return {
    detachedWindow: window.RDT_MOUNTED ?? isDetachedWindow,
    detachedWindowOwner: isDetachedOwner
  };
};
var getSettings = () => {
  const settingsString = getStorageItem(REACT_ROUTER_DEV_TOOLS_SETTINGS);
  const settings = tryParseJson(settingsString);
  return {
    ...settings
  };
};
var getExistingStateFromStorage = (config) => {
  const existingState = getStorageItem(REACT_ROUTER_DEV_TOOLS_STATE);
  const settings = getSettings();
  const { detachedWindow, detachedWindowOwner } = detachedModeSetup();
  const state = {
    ...initialState,
    ...existingState ? JSON.parse(existingState) : {},
    settings: {
      ...initialState.settings,
      ...config,
      ...settings,
      editorName: config?.editorName ?? initialState.settings.editorName,
      liveUrls: config?.liveUrls ?? initialState.settings.liveUrls,
      breakpoints: config?.breakpoints ?? initialState.settings.breakpoints
    },
    detachedWindow,
    detachedWindowOwner
  };
  return state;
};
var RDTContextProvider = ({ children: children2, config }) => {
  const [state, dispatch2] = useReducer(rdtReducer, getExistingStateFromStorage(config));
  const value = useMemo(() => ({ state, dispatch: dispatch2 }), [state, dispatch2]);
  useRemoveBody(state);
  useEffect2(() => {
    const { settings, detachedWindow, detachedWindowOwner, ...rest } = state;
    setStorageItem(REACT_ROUTER_DEV_TOOLS_SETTINGS, JSON.stringify(settings));
    setStorageItem(REACT_ROUTER_DEV_TOOLS_STATE, JSON.stringify(rest, bigIntReplacer));
  }, [state]);
  return /* @__PURE__ */ jsx(RDTContext.Provider, { value, children: children2 });
};

// src/client/context/useRDTContext.ts
import { useCallback, useContext } from "react";
var useRDTContext = () => {
  const context = useContext(RDTContext);
  if (context === void 0) {
    throw new Error("useRDTContext must be used within a RDTContextProvider");
  }
  const { state, dispatch: dispatch2 } = context;
  return {
    dispatch: dispatch2,
    state
  };
};
var useHtmlErrors = () => {
  const { state, dispatch: dispatch2 } = useRDTContext();
  const { htmlErrors } = state;
  const setHtmlErrors = useCallback(
    (htmlErrors2) => {
      dispatch2({
        type: "SET_HTML_ERRORS",
        payload: htmlErrors2
      });
    },
    [dispatch2]
  );
  return { htmlErrors, setHtmlErrors };
};
var useServerInfo = () => {
  const { state, dispatch: dispatch2 } = useRDTContext();
  const { server } = state;
  const setServerInfo = useCallback(
    (serverInfo) => {
      dispatch2({
        type: "SET_SERVER_INFO",
        payload: {
          ...server,
          ...serverInfo,
          routes: {
            ...server?.routes,
            ...serverInfo?.routes
          }
        }
      });
    },
    [dispatch2, server]
  );
  return { server, setServerInfo };
};
var useDetachedWindowControls = () => {
  const { state, dispatch: dispatch2 } = useRDTContext();
  const { detachedWindow, detachedWindowOwner } = state;
  const setDetachedWindowOwner = useCallback(
    (isDetachedWindowOwner) => {
      dispatch2({
        type: "SET_DETACHED_WINDOW_OWNER",
        payload: isDetachedWindowOwner
      });
    },
    [dispatch2]
  );
  return {
    detachedWindow: detachedWindow || window.RDT_MOUNTED,
    detachedWindowOwner,
    setDetachedWindowOwner,
    isDetached: detachedWindow || detachedWindowOwner
  };
};
var useSettingsContext = () => {
  const { dispatch: dispatch2, state } = useRDTContext();
  const { settings } = state;
  const setSettings = useCallback(
    (settings2) => {
      dispatch2({
        type: "SET_SETTINGS",
        payload: settings2
      });
    },
    [dispatch2]
  );
  return { setSettings, settings };
};
var usePersistOpen = () => {
  const { dispatch: dispatch2, state } = useRDTContext();
  const { persistOpen } = state;
  const setPersistOpen = useCallback(
    (persistOpen2) => {
      dispatch2({
        type: "SET_PERSIST_OPEN",
        payload: persistOpen2
      });
    },
    [dispatch2]
  );
  return { persistOpen, setPersistOpen };
};
var useTimelineContext = () => {
  const { state, dispatch: dispatch2 } = useRDTContext();
  const { timeline } = state;
  const setTimelineEvent = useCallback(
    (payload) => {
      dispatch2({ type: "SET_TIMELINE_EVENT", payload });
    },
    [dispatch2]
  );
  const clearTimeline = useCallback(() => {
    dispatch2({ type: "PURGE_TIMELINE", payload: void 0 });
  }, [dispatch2]);
  return { setTimelineEvent, timeline, clearTimeline };
};

// node_modules/bippy/dist/chunk-DE5T66AV.js
var version = "0.2.22";
var BIPPY_INSTRUMENTATION_STRING = `bippy-${version}`;
var objectDefineProperty = Object.defineProperty;
var objectHasOwnProperty = Object.prototype.hasOwnProperty;
var NO_OP = () => {
};
var checkDCE = (fn) => {
  try {
    const code = Function.prototype.toString.call(fn);
    if (code.indexOf("^_^") > -1) {
      setTimeout(() => {
        throw new Error(
          "React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build"
        );
      });
    }
  } catch {
  }
};
var isRealReactDevtools = (rdtHook = getRDTHook()) => {
  return "getFiberRoots" in rdtHook;
};
var isReactRefreshOverride = false;
var injectFnStr = void 0;
var isReactRefresh = (rdtHook = getRDTHook()) => {
  if (isReactRefreshOverride) return true;
  if (typeof rdtHook.inject === "function") {
    injectFnStr = rdtHook.inject.toString();
  }
  return Boolean(injectFnStr?.includes("(injected)"));
};
var installRDTHook = (onActive) => {
  const renderers = /* @__PURE__ */ new Map();
  let i = 0;
  const rdtHook = {
    checkDCE,
    supportsFiber: true,
    supportsFlight: true,
    hasUnsupportedRendererAttached: false,
    renderers,
    onCommitFiberRoot: NO_OP,
    onCommitFiberUnmount: NO_OP,
    onPostCommitFiberRoot: NO_OP,
    inject(renderer) {
      const nextID = ++i;
      renderers.set(nextID, renderer);
      if (!rdtHook._instrumentationIsActive) {
        rdtHook._instrumentationIsActive = true;
        onActive?.();
      }
      return nextID;
    },
    _instrumentationSource: BIPPY_INSTRUMENTATION_STRING,
    _instrumentationIsActive: false
  };
  try {
    objectDefineProperty(globalThis, "__REACT_DEVTOOLS_GLOBAL_HOOK__", {
      value: rdtHook,
      configurable: true,
      writable: true
    });
    const originalWindowHasOwnProperty = window.hasOwnProperty;
    let hasRanHack = false;
    objectDefineProperty(window, "hasOwnProperty", {
      value: function() {
        if (!hasRanHack && arguments[0] === "__REACT_DEVTOOLS_GLOBAL_HOOK__") {
          globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__ = void 0;
          hasRanHack = true;
          return -0;
        }
        return originalWindowHasOwnProperty.apply(this, arguments);
      },
      configurable: true,
      writable: true
    });
  } catch {
    patchRDTHook(onActive);
  }
  return rdtHook;
};
var patchRDTHook = (onActive) => {
  try {
    const rdtHook = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!rdtHook) return;
    if (!rdtHook._instrumentationSource) {
      isReactRefreshOverride = isReactRefresh(rdtHook);
      rdtHook.checkDCE = checkDCE;
      rdtHook.supportsFiber = true;
      rdtHook.supportsFlight = true;
      rdtHook.hasUnsupportedRendererAttached = false;
      rdtHook._instrumentationSource = BIPPY_INSTRUMENTATION_STRING;
      rdtHook._instrumentationIsActive = false;
      if (rdtHook.renderers.size) {
        rdtHook._instrumentationIsActive = true;
        onActive?.();
        return;
      }
      const prevInject = rdtHook.inject;
      if (isReactRefresh(rdtHook)) {
        isReactRefreshOverride = true;
        let nextID = rdtHook.inject(null);
        if (nextID) {
          rdtHook._instrumentationIsActive = true;
        }
        rdtHook.inject = () => nextID++;
      } else {
        rdtHook.inject = (renderer) => {
          const id2 = prevInject(renderer);
          rdtHook._instrumentationIsActive = true;
          onActive?.();
          return id2;
        };
      }
    }
    if (rdtHook.renderers.size || rdtHook._instrumentationIsActive || // depending on this to inject is unsafe, since inject could occur before and we wouldn't know
    isReactRefresh()) {
      onActive?.();
    }
  } catch {
  }
};
var hasRDTHook = () => {
  return objectHasOwnProperty.call(
    globalThis,
    "__REACT_DEVTOOLS_GLOBAL_HOOK__"
  );
};
var getRDTHook = (onActive) => {
  if (!hasRDTHook()) {
    return installRDTHook(onActive);
  }
  patchRDTHook(onActive);
  return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
};
var FunctionComponentTag = 0;
var ClassComponentTag = 1;
var HostRootTag = 3;
var HostComponentTag = 5;
var HostTextTag = 6;
var FragmentTag = 7;
var ContextConsumerTag = 9;
var ForwardRefTag = 11;
var SuspenseComponentTag = 13;
var MemoComponentTag = 14;
var SimpleMemoComponentTag = 15;
var DehydratedSuspenseComponentTag = 18;
var OffscreenComponentTag = 22;
var LegacyHiddenComponentTag = 23;
var HostHoistableTag = 26;
var HostSingletonTag = 27;
var CONCURRENT_MODE_NUMBER = 60111;
var CONCURRENT_MODE_SYMBOL_STRING = "Symbol(react.concurrent_mode)";
var DEPRECATED_ASYNC_MODE_SYMBOL_STRING = "Symbol(react.async_mode)";
var PerformedWork = 1;
var Placement = 2;
var Hydrating = 4096;
var Update = 4;
var ChildDeletion = 16;
var ContentReset = 32;
var Snapshot = 1024;
var Visibility = 8192;
var MutationMask = Placement | Update | ChildDeletion | ContentReset | Hydrating | Visibility | Snapshot;
var isHostFiber = (fiber) => {
  switch (fiber.tag) {
    case HostComponentTag:
    // @ts-expect-error: it exists
    case HostHoistableTag:
    // @ts-expect-error: it exists
    case HostSingletonTag:
      return true;
    default:
      return typeof fiber.type === "string";
  }
};
var isCompositeFiber = (fiber) => {
  switch (fiber.tag) {
    case FunctionComponentTag:
    case ClassComponentTag:
    case SimpleMemoComponentTag:
    case MemoComponentTag:
    case ForwardRefTag:
      return true;
    default:
      return false;
  }
};
var didFiberRender = (fiber) => {
  const nextProps = fiber.memoizedProps;
  const prevProps = fiber.alternate?.memoizedProps || {};
  const flags = fiber.flags ?? fiber.effectTag ?? 0;
  switch (fiber.tag) {
    case ClassComponentTag:
    case FunctionComponentTag:
    case ContextConsumerTag:
    case ForwardRefTag:
    case MemoComponentTag:
    case SimpleMemoComponentTag: {
      return (flags & PerformedWork) === PerformedWork;
    }
    default:
      if (!fiber.alternate) return true;
      return prevProps !== nextProps || fiber.alternate.memoizedState !== fiber.memoizedState || fiber.alternate.ref !== fiber.ref;
  }
};
var getFiberStack = (fiber) => {
  const stack = [];
  let currentFiber = fiber;
  while (currentFiber.return) {
    stack.push(currentFiber);
    currentFiber = currentFiber.return;
  }
  const newStack = new Array(stack.length);
  for (let i = 0; i < stack.length; i++) {
    newStack[i] = stack[stack.length - i - 1];
  }
  return newStack;
};
var shouldFilterFiber = (fiber) => {
  switch (fiber.tag) {
    case DehydratedSuspenseComponentTag:
      return true;
    case HostTextTag:
    case FragmentTag:
    case LegacyHiddenComponentTag:
    case OffscreenComponentTag:
      return true;
    case HostRootTag:
      return false;
    default: {
      const symbolOrNumber = typeof fiber.type === "object" && fiber.type !== null ? fiber.type.$$typeof : fiber.type;
      const typeSymbol = typeof symbolOrNumber === "symbol" ? symbolOrNumber.toString() : symbolOrNumber;
      switch (typeSymbol) {
        case CONCURRENT_MODE_NUMBER:
        case CONCURRENT_MODE_SYMBOL_STRING:
        case DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
          return true;
        default:
          return false;
      }
    }
  }
};
var getNearestHostFiber = (fiber, ascending2 = false) => {
  let hostFiber = traverseFiber(fiber, isHostFiber, ascending2);
  if (!hostFiber) {
    hostFiber = traverseFiber(fiber, isHostFiber, !ascending2);
  }
  return hostFiber;
};
var traverseFiber = (fiber, selector, ascending2 = false) => {
  if (!fiber) return null;
  if (selector(fiber) === true) return fiber;
  let child = ascending2 ? fiber.return : fiber.child;
  while (child) {
    const match = traverseFiber(child, selector, ascending2);
    if (match) return match;
    child = ascending2 ? null : child.sibling;
  }
  return null;
};
var getType = (type) => {
  const currentType = type;
  if (typeof currentType === "function") {
    return currentType;
  }
  if (typeof currentType === "object" && currentType) {
    return getType(
      currentType.type || currentType.render
    );
  }
  return null;
};
var getDisplayName = (type) => {
  const currentType = type;
  if (typeof currentType !== "function" && !(typeof currentType === "object" && currentType)) {
    return null;
  }
  const name = currentType.displayName || currentType.name || null;
  if (name) return name;
  const unwrappedType = getType(currentType);
  if (!unwrappedType) return null;
  return unwrappedType.displayName || unwrappedType.name || null;
};
var detectReactBuildType = (renderer) => {
  try {
    if (typeof renderer.version === "string" && renderer.bundleType > 0) {
      return "development";
    }
  } catch {
  }
  return "production";
};
var isInstrumentationActive = () => {
  const rdtHook = getRDTHook();
  return Boolean(rdtHook._instrumentationIsActive) || isRealReactDevtools() || isReactRefresh();
};
var fiberId = 0;
var fiberIdMap = /* @__PURE__ */ new WeakMap();
var setFiberId = (fiber, id2 = fiberId++) => {
  fiberIdMap.set(fiber, id2);
};
var getFiberId = (fiber) => {
  let id2 = fiberIdMap.get(fiber);
  if (!id2 && fiber.alternate) {
    id2 = fiberIdMap.get(fiber.alternate);
  }
  if (!id2) {
    id2 = fiberId++;
    setFiberId(fiber, id2);
  }
  return id2;
};
var mountFiberRecursively = (onRender, firstChild, traverseSiblings) => {
  let fiber = firstChild;
  while (fiber != null) {
    if (!fiberIdMap.has(fiber)) {
      getFiberId(fiber);
    }
    const shouldIncludeInTree = !shouldFilterFiber(fiber);
    if (shouldIncludeInTree && didFiberRender(fiber)) {
      onRender(fiber, "mount");
    }
    if (fiber.tag === SuspenseComponentTag) {
      const isTimedOut = fiber.memoizedState !== null;
      if (isTimedOut) {
        const primaryChildFragment = fiber.child;
        const fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
        if (fallbackChildFragment) {
          const fallbackChild = fallbackChildFragment.child;
          if (fallbackChild !== null) {
            mountFiberRecursively(onRender, fallbackChild, false);
          }
        }
      } else {
        let primaryChild = null;
        if (fiber.child !== null) {
          primaryChild = fiber.child.child;
        }
        if (primaryChild !== null) {
          mountFiberRecursively(onRender, primaryChild, false);
        }
      }
    } else if (fiber.child != null) {
      mountFiberRecursively(onRender, fiber.child, true);
    }
    fiber = traverseSiblings ? fiber.sibling : null;
  }
};
var updateFiberRecursively = (onRender, nextFiber, prevFiber, parentFiber) => {
  if (!fiberIdMap.has(nextFiber)) {
    getFiberId(nextFiber);
  }
  if (!prevFiber) return;
  if (!fiberIdMap.has(prevFiber)) {
    getFiberId(prevFiber);
  }
  const isSuspense = nextFiber.tag === SuspenseComponentTag;
  const shouldIncludeInTree = !shouldFilterFiber(nextFiber);
  if (shouldIncludeInTree && didFiberRender(nextFiber)) {
    onRender(nextFiber, "update");
  }
  const prevDidTimeout = isSuspense && prevFiber.memoizedState !== null;
  const nextDidTimeOut = isSuspense && nextFiber.memoizedState !== null;
  if (prevDidTimeout && nextDidTimeOut) {
    const nextFallbackChildSet = nextFiber.child?.sibling ?? null;
    const prevFallbackChildSet = prevFiber.child?.sibling ?? null;
    if (nextFallbackChildSet !== null && prevFallbackChildSet !== null) {
      updateFiberRecursively(
        onRender,
        nextFallbackChildSet,
        prevFallbackChildSet
      );
    }
  } else if (prevDidTimeout && !nextDidTimeOut) {
    const nextPrimaryChildSet = nextFiber.child;
    if (nextPrimaryChildSet !== null) {
      mountFiberRecursively(onRender, nextPrimaryChildSet, true);
    }
  } else if (!prevDidTimeout && nextDidTimeOut) {
    unmountFiberChildrenRecursively(onRender, prevFiber);
    const nextFallbackChildSet = nextFiber.child?.sibling ?? null;
    if (nextFallbackChildSet !== null) {
      mountFiberRecursively(onRender, nextFallbackChildSet, true);
    }
  } else if (nextFiber.child !== prevFiber.child) {
    let nextChild = nextFiber.child;
    while (nextChild) {
      if (nextChild.alternate) {
        const prevChild = nextChild.alternate;
        updateFiberRecursively(
          onRender,
          nextChild,
          prevChild
        );
      } else {
        mountFiberRecursively(onRender, nextChild, false);
      }
      nextChild = nextChild.sibling;
    }
  }
};
var unmountFiber = (onRender, fiber) => {
  const isRoot = fiber.tag === HostRootTag;
  if (isRoot || !shouldFilterFiber(fiber)) {
    onRender(fiber, "unmount");
  }
};
var unmountFiberChildrenRecursively = (onRender, fiber) => {
  const isTimedOutSuspense = fiber.tag === SuspenseComponentTag && fiber.memoizedState !== null;
  let child = fiber.child;
  if (isTimedOutSuspense) {
    const primaryChildFragment = fiber.child;
    const fallbackChildFragment = primaryChildFragment?.sibling ?? null;
    child = fallbackChildFragment?.child ?? null;
  }
  while (child !== null) {
    if (child.return !== null) {
      unmountFiber(onRender, child);
      unmountFiberChildrenRecursively(onRender, child);
    }
    child = child.sibling;
  }
};
var commitId = 0;
var rootInstanceMap = /* @__PURE__ */ new WeakMap();
var traverseRenderedFibers = (root2, onRender) => {
  const fiber = "current" in root2 ? root2.current : root2;
  let rootInstance = rootInstanceMap.get(root2);
  if (!rootInstance) {
    rootInstance = { prevFiber: null, id: commitId++ };
    rootInstanceMap.set(root2, rootInstance);
  }
  const { prevFiber } = rootInstance;
  if (!fiber) {
    unmountFiber(onRender, fiber);
  } else if (prevFiber !== null) {
    const wasMounted = prevFiber && prevFiber.memoizedState != null && prevFiber.memoizedState.element != null && // A dehydrated root is not considered mounted
    prevFiber.memoizedState.isDehydrated !== true;
    const isMounted = fiber.memoizedState != null && fiber.memoizedState.element != null && // A dehydrated root is not considered mounted
    fiber.memoizedState.isDehydrated !== true;
    if (!wasMounted && isMounted) {
      mountFiberRecursively(onRender, fiber, false);
    } else if (wasMounted && isMounted) {
      updateFiberRecursively(onRender, fiber, fiber.alternate);
    } else if (wasMounted && !isMounted) {
      unmountFiber(onRender, fiber);
    }
  } else {
    mountFiberRecursively(onRender, fiber, true);
  }
  rootInstance.prevFiber = fiber;
};
var instrument = (options) => {
  return getRDTHook(() => {
    const rdtHook = getRDTHook();
    options.onActive?.();
    rdtHook._instrumentationSource = options.name ?? BIPPY_INSTRUMENTATION_STRING;
    const prevOnCommitFiberRoot = rdtHook.onCommitFiberRoot;
    if (options.onCommitFiberRoot) {
      rdtHook.onCommitFiberRoot = (rendererID, root2, priority) => {
        if (prevOnCommitFiberRoot)
          prevOnCommitFiberRoot(rendererID, root2, priority);
        options.onCommitFiberRoot?.(rendererID, root2, priority);
      };
    }
    const prevOnCommitFiberUnmount = rdtHook.onCommitFiberUnmount;
    if (options.onCommitFiberUnmount) {
      rdtHook.onCommitFiberUnmount = (rendererID, root2) => {
        if (prevOnCommitFiberUnmount)
          prevOnCommitFiberUnmount(rendererID, root2);
        options.onCommitFiberUnmount?.(rendererID, root2);
      };
    }
    const prevOnPostCommitFiberRoot = rdtHook.onPostCommitFiberRoot;
    if (options.onPostCommitFiberRoot) {
      rdtHook.onPostCommitFiberRoot = (rendererID, root2) => {
        if (prevOnPostCommitFiberRoot)
          prevOnPostCommitFiberRoot(rendererID, root2);
        options.onPostCommitFiberRoot?.(rendererID, root2);
      };
    }
  });
};
var getFiberFromHostInstance = (hostInstance) => {
  const rdtHook = getRDTHook();
  for (const renderer of rdtHook.renderers.values()) {
    try {
      const fiber = renderer.findFiberByHostInstance?.(hostInstance);
      if (fiber) return fiber;
    } catch {
    }
  }
  if (typeof hostInstance === "object" && hostInstance != null) {
    if ("_reactRootContainer" in hostInstance) {
      return hostInstance._reactRootContainer?._internalRoot?.current?.child;
    }
    for (const key in hostInstance) {
      if (key.startsWith("__reactInternalInstance$") || key.startsWith("__reactFiber")) {
        return hostInstance[key] || null;
      }
    }
  }
  return null;
};
var INSTALL_ERROR = new Error();
var secure = (options, secureOptions = {}) => {
  const onActive = options.onActive;
  const isRDTHookInstalled = hasRDTHook();
  const isUsingRealReactDevtools = isRealReactDevtools();
  const isUsingReactRefresh = isReactRefresh();
  let timeout2;
  let isProduction = false;
  options.onActive = () => {
    clearTimeout(timeout2);
    let isSecure = true;
    try {
      onActive?.();
      const rdtHook = getRDTHook();
      for (const renderer of rdtHook.renderers.values()) {
        const [majorVersion] = renderer.version.split(".");
        if (Number(majorVersion) < (secureOptions.minReactMajorVersion ?? 17)) {
          isSecure = false;
        }
        const buildType = detectReactBuildType(renderer);
        if (buildType !== "development") {
          isProduction = true;
          if (!secureOptions.dangerouslyRunInProduction) {
            isSecure = false;
          }
        }
      }
    } catch (err) {
      secureOptions.onError?.(err);
    }
    if (!isSecure) {
      options.onCommitFiberRoot = void 0;
      options.onCommitFiberUnmount = void 0;
      options.onPostCommitFiberRoot = void 0;
      options.onActive = void 0;
      return;
    }
    try {
      const onCommitFiberRoot2 = options.onCommitFiberRoot;
      if (onCommitFiberRoot2) {
        options.onCommitFiberRoot = (rendererID, root2, priority) => {
          try {
            onCommitFiberRoot2(rendererID, root2, priority);
          } catch (err) {
            secureOptions.onError?.(err);
          }
        };
      }
      const onCommitFiberUnmount = options.onCommitFiberUnmount;
      if (onCommitFiberUnmount) {
        options.onCommitFiberUnmount = (rendererID, root2) => {
          try {
            onCommitFiberUnmount(rendererID, root2);
          } catch (err) {
            secureOptions.onError?.(err);
          }
        };
      }
      const onPostCommitFiberRoot = options.onPostCommitFiberRoot;
      if (onPostCommitFiberRoot) {
        options.onPostCommitFiberRoot = (rendererID, root2) => {
          try {
            onPostCommitFiberRoot(rendererID, root2);
          } catch (err) {
            secureOptions.onError?.(err);
          }
        };
      }
    } catch (err) {
      secureOptions.onError?.(err);
    }
  };
  if (!isRDTHookInstalled && !isUsingRealReactDevtools && !isUsingReactRefresh) {
    timeout2 = setTimeout(() => {
      if (!isProduction) {
        secureOptions.onError?.(INSTALL_ERROR);
      }
      stop();
    }, secureOptions.installCheckTimeout ?? 100);
  }
  return options;
};
var onCommitFiberRoot = (handler) => {
  return instrument(
    secure({
      onCommitFiberRoot: (_, root2) => {
        handler(root2);
      }
    })
  );
};

// src/client/hooks/useReactTreeListeners.ts
import { useCallback as useCallback2, useEffect as useEffect3, useRef } from "react";
import { useNavigation } from "react-router";
var ROUTE_CLASS = "outlet-route";
var isSourceElement = (fiberNode) => {
  return fiberNode?.elementType && fiberNode?.stateNode && fiberNode?._debugSource && !fiberNode?.stateNode?.getAttribute?.("data-source");
};
var isJsxFile = (fiberNode) => fiberNode?._debugSource?.fileName?.includes("tsx") || fiberNode?._debugSource?.fileName?.includes("jsx");
function useReactTreeListeners() {
  const invalidHtmlCollection = useRef([]);
  const { setHtmlErrors } = useHtmlErrors();
  const addToInvalidCollection = (entry) => {
    if (invalidHtmlCollection.current.find((item) => JSON.stringify(item) === JSON.stringify(entry))) return;
    invalidHtmlCollection.current.push(entry);
  };
  const navigation = useNavigation();
  const styleNearestElement = useCallback2((fiberNode) => {
    if (!fiberNode) return;
    if (fiberNode.stateNode) {
      return fiberNode.stateNode?.classList?.add(ROUTE_CLASS);
    }
    styleNearestElement(fiberNode?.child);
  }, []);
  const findIncorrectHtml = useCallback2(
    (fiberNode, originalFiberNode, originalTag) => {
      if (!fiberNode) return;
      const tag = fiberNode.elementType;
      const addInvalid = () => {
        const parentSource = originalFiberNode?._debugOwner?._debugSource ?? originalFiberNode?._debugSource;
        const source = fiberNode?._debugOwner?._debugSource ?? fiberNode?._debugSource;
        addToInvalidCollection({
          child: {
            file: parentSource?.fileName,
            tag
          },
          parent: {
            file: source?.fileName,
            tag: originalTag
          }
        });
      };
      if (originalTag === "a") {
        const element = fiberNode.stateNode;
        switch (tag) {
          case "a":
          case "button":
          case "details":
          case "embed":
          case "iframe":
          case "label":
          case "select":
          case "textarea": {
            addInvalid();
            break;
          }
          case "audio": {
            if (element.getAttribute("controls") !== null) {
              addInvalid();
            }
            break;
          }
          case "img": {
            if (element.getAttribute("usemap") !== null) {
              addInvalid();
            }
            break;
          }
          case "input": {
            if (element.getAttribute("type") !== "hidden") {
              addInvalid();
            }
            break;
          }
          case "object": {
            if (element.getAttribute("usemap") !== null) {
              addInvalid();
            }
            break;
          }
          case "video": {
            if (element.getAttribute("controls") !== null) {
              addInvalid();
            }
            break;
          }
          default: {
            break;
          }
        }
      }
      if (originalTag === "p") {
        switch (tag) {
          case "div":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
          case "main":
          case "pre":
          case "p":
          case "section":
          case "table":
          case "ul":
          case "ol":
          case "li": {
            addInvalid();
            break;
          }
          default: {
            break;
          }
        }
      }
      if (originalTag === "form") {
        if (tag === "form") {
          addInvalid();
        }
      }
      if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(originalTag)) {
        if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6") {
          addInvalid();
        }
      }
      findIncorrectHtml(fiberNode?.child, originalFiberNode, originalTag);
      if (fiberNode?.sibling) {
        findIncorrectHtml(fiberNode?.sibling, originalFiberNode, originalTag);
      }
    },
    []
  );
  useEffect3(() => {
    if (navigation.state !== "idle") return;
    onCommitFiberRoot(
      (root2) => traverseFiber(root2.current, (fiberNode) => {
        if (isSourceElement(fiberNode) && typeof import.meta.hot !== "undefined") {
          const originalSource = fiberNode?._debugSource;
          const source = fiberNode?._debugOwner?._debugSource ?? fiberNode?._debugSource;
          const line = source?.fileName?.startsWith("/") ? originalSource?.lineNumber : source?.lineNumber;
          const fileName = source?.fileName?.startsWith("/") ? originalSource?.fileName : source?.fileName;
          fiberNode.stateNode?.setAttribute?.(
            "data-source",
            `${fileName}:::${line}`
            //
          );
        } else if (isSourceElement(fiberNode)) {
          const isJsx = isJsxFile(fiberNode);
          const originalSource = fiberNode?._debugSource;
          const source = fiberNode?._debugOwner?._debugSource ?? fiberNode?._debugSource;
          const line = source?.fileName?.startsWith("/") ? originalSource?.lineNumber : source?.lineNumber;
          const fileName = source?.fileName?.startsWith("/") ? originalSource?.fileName : source?.fileName;
          fiberNode.stateNode?.setAttribute?.(
            "data-source",
            `${fileName}:::${isJsx ? line - 20 : line}`
            //
          );
        }
        if (fiberNode?.stateNode && fiberNode?.elementType === "form") {
          findIncorrectHtml(fiberNode.child, fiberNode, "form");
        }
        if (fiberNode?.stateNode && fiberNode?.elementType === "a") {
          findIncorrectHtml(fiberNode.child, fiberNode, "a");
        }
        if (fiberNode?.stateNode && fiberNode?.elementType === "p") {
          findIncorrectHtml(fiberNode.child, fiberNode, "p");
        }
        if (fiberNode?.stateNode && ["h1", "h2", "h3", "h4", "h5", "h6"].includes(fiberNode?.elementType)) {
          findIncorrectHtml(fiberNode.child, fiberNode, fiberNode?.elementType);
        }
        if (fiberNode?.elementType?.name === "default" || fiberNode?.elementType?.name === "RenderedRoute") {
          styleNearestElement(fiberNode);
        }
      })
    );
    setHtmlErrors(invalidHtmlCollection.current);
    invalidHtmlCollection.current = [];
  }, [navigation.state, styleNearestElement, findIncorrectHtml, setHtmlErrors]);
}

// src/client/hooks/useSetRouteBoundaries.ts
import { useCallback as useCallback3, useEffect as useEffect5 } from "react";
import { useMatches } from "react-router";

// src/client/hooks/useAttachListener.ts
import { useEffect as useEffect4, useRef as useRef2 } from "react";
var getAttachment = (target) => {
  switch (target) {
    case "window":
      return typeof window !== "undefined" ? window : null;
    case "document":
      return typeof document !== "undefined" ? document : null;
    case "body":
      return typeof document !== "undefined" ? document.body : null;
  }
};
var useAttachListener = (listener, attachTarget, fn, shouldAttach = true) => useAttachListenerToNode(listener, getAttachment(attachTarget), fn, shouldAttach);
var useAttachListenerToNode = (listener, node, fn, shouldAttach = true) => {
  const callbackRef = useRef2(fn);
  useEffect4(() => {
    callbackRef.current = fn;
  });
  useEffect4(() => {
    if (!shouldAttach) return;
    node?.addEventListener(listener, (e) => callbackRef.current(e));
    return () => node?.removeEventListener(listener, (e) => callbackRef.current(e));
  }, [listener, node, shouldAttach]);
};
var useAttachWindowListener = (listener, fn, shouldAttach = true) => {
  return useAttachListener(listener, "window", fn, shouldAttach);
};
var useAttachDocumentListener = (listener, fn, shouldAttach = true) => {
  return useAttachListener(listener, "document", fn, shouldAttach);
};

// src/client/hooks/useSetRouteBoundaries.ts
var useSetRouteBoundaries = () => {
  const matches = useMatches();
  const { settings, setSettings } = useSettingsContext();
  const { detachedWindow } = useDetachedWindowControls();
  const applyOrRemoveClasses = useCallback3(
    (isHovering) => {
      const hovering = isHovering ?? settings.isHoveringRoute;
      const classes = ["apply-tw", ROUTE_BOUNDARY_GRADIENTS[settings.routeBoundaryGradient]].join(" ");
      const isRoot = settings.hoveredRoute === "root";
      const elements = isRoot ? document.getElementsByTagName("body") : document.getElementsByClassName(ROUTE_CLASS);
      const element = isRoot ? elements.item(elements.length - 1) : elements.item(matches.length - 1 - Number.parseInt(settings.hoveredRoute));
      if (element) {
        const outlet = element;
        for (const classItem of classes.split(" ")) {
          outlet.classList[hovering ? "add" : "remove"](classItem);
        }
      }
    },
    [settings.hoveredRoute, settings.isHoveringRoute, settings.routeBoundaryGradient, matches.length]
  );
  useAttachListener("mouseleave", "document", () => {
    if (settings.showRouteBoundariesOn === "click") {
      return;
    }
    applyOrRemoveClasses();
    if (!detachedWindow) {
      return;
    }
    setSettings({
      isHoveringRoute: false
    });
  });
  useAttachListener("wheel", "window", () => {
    if (settings.showRouteBoundariesOn === "click") {
      return;
    }
    applyOrRemoveClasses(false);
    if (!detachedWindow) {
      return;
    }
    setSettings({
      isHoveringRoute: false
    });
  });
  useEffect5(() => {
    if (!settings.isHoveringRoute && !settings.hoveredRoute) return;
    applyOrRemoveClasses();
    if (!settings.isHoveringRoute && !detachedWindow) {
      setSettings({
        hoveredRoute: "",
        isHoveringRoute: false
      });
    }
  }, [
    settings.hoveredRoute,
    settings.isHoveringRoute,
    settings.routeBoundaryGradient,
    applyOrRemoveClasses,
    detachedWindow,
    setSettings
  ]);
};

// src/client/hooks/useTimelineHandler.ts
import { useEffect as useEffect6, useRef as useRef3 } from "react";
import { useActionData, useFetchers, useNavigation as useNavigation2 } from "react-router";
var uniqueId = () => (Math.random() * Date.now()).toString();
var convertFormDataToObject = (formData) => {
  const obj = {};
  if (!formData) {
    return void 0;
  }
  for (const key of formData.keys()) {
    if (key.includes(".")) {
      const [prefix, suffix] = key.split(".");
      if (Number.isNaN(Number.parseInt(suffix))) {
        obj[prefix] ??= {};
        for (const [_, element] of formData.getAll(key).entries()) {
          obj[prefix][suffix] = element;
        }
      } else {
        obj[prefix] ??= [];
        for (const [index, element] of formData.getAll(key).entries()) {
          if (index > 1) {
            obj[prefix][suffix] = [...obj[prefix][suffix], element];
          } else if (index === 1) {
            obj[prefix][suffix] = [obj[prefix][suffix], element];
          } else {
            obj[prefix][suffix] = element;
          }
        }
      }
    } else {
      for (const [index, element] of formData.getAll(key).entries()) {
        if (index > 1) {
          obj[key] = [...obj[key], element];
        } else if (index === 1) {
          obj[key] = [obj[key], element];
        } else {
          obj[key] = element;
        }
      }
    }
  }
  if (Object.keys(obj).length === 0) {
    return void 0;
  }
  return obj;
};
var useTimelineHandler = () => {
  const navigation = useNavigation2();
  const fetchers = useFetchers();
  const navigationEventQueue = useRef3([]);
  const { setTimelineEvent } = useTimelineContext();
  const responseData = useActionData();
  const { detachedWindow } = useDetachedWindowControls();
  useEffect6(() => {
    if (detachedWindow) {
      return;
    }
    const { state, location, formAction, formData, formMethod, formEncType } = navigation;
    if (state === "idle") {
      navigationEventQueue.current.map(
        (event) => setTimelineEvent({
          ...event,
          id: uniqueId()
        })
      );
      navigationEventQueue.current = [];
      return;
    }
    const { state: locState, pathname, search, hash } = location;
    const data = convertFormDataToObject(formData);
    if (state === "submitting") {
      navigationEventQueue.current.push({
        type: "FORM_SUBMISSION",
        from: pathname,
        to: formAction,
        method: formMethod,
        data,
        encType: formEncType,
        id: uniqueId()
      });
      return;
    }
    if (state === "loading") {
      if (formAction && formData && formMethod && locState?._isRedirect) {
        navigationEventQueue.current.push({
          type: "ACTION_REDIRECT",
          from: pathname,
          to: formAction,
          method: formMethod,
          data,
          encType: formEncType,
          responseData,
          id: uniqueId()
        });
        return;
      }
      if (formAction && formData && formMethod) {
        navigationEventQueue.current.push({
          type: "ACTION_RESPONSE",
          from: pathname,
          to: formAction,
          method: formMethod,
          data,
          encType: formEncType,
          responseData,
          id: uniqueId()
        });
        return;
      }
      navigationEventQueue.current.push({
        type: locState?._isFetchActionRedirect || locState?._isFetchLoaderRedirect ? "FETCHER_REDIRECT" : "REDIRECT",
        to: pathname,
        search,
        hash,
        method: "GET",
        id: uniqueId()
      });
      return;
    }
  }, [navigation, responseData, setTimelineEvent, detachedWindow]);
  const fetcherEventQueue = useRef3([]);
  useEffect6(() => {
    if (navigation.state !== "idle") return;
    const activeFetchers = fetchers.filter((f) => f.state !== "idle");
    if (activeFetchers.length === 0 && fetcherEventQueue.current.length > 0) {
      fetcherEventQueue.current.map(
        ({ position, ...event }) => setTimelineEvent({
          ...event,
          responseData: (
            // If the fetcher is a GET request, the response data is stored in the fetcher, otherwise it's already set at this point
            event.method === "GET" ? fetchers[position]?.data : event.responseData
          )
        })
      );
      fetcherEventQueue.current = [];
      return;
    }
    fetchers.forEach((fetcher, i) => {
      if (fetcher.state === "idle") return;
      const { data, formAction, formData, formEncType, formMethod, key: fetcherKey } = fetcher;
      if (formAction && formMethod) {
        const form = convertFormDataToObject(formData);
        const event = {
          type: fetcher.state === "loading" ? "FETCHER_RESPONSE" : "FETCHER_SUBMIT",
          to: formAction,
          method: formMethod,
          ...fetcherKey ? { fetcherKey } : {},
          data: form,
          encType: formEncType,
          responseData: fetcher.state === "submitting" ? void 0 : data,
          position: i,
          id: uniqueId()
        };
        fetcherEventQueue.current.push(event);
      }
    });
  }, [fetchers, navigation.state, setTimelineEvent]);
};

// src/client/layout/ContentPanel.tsx
import clsx14 from "clsx";
import { Fragment as Fragment6 } from "react";

// src/client/hooks/useTabs.ts
import { useMemo as useMemo5 } from "react";

// src/client/components/util.ts
import { clsx } from "clsx";

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
};
var createClassMap = (config) => {
  const {
    theme: theme4,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme4);
  });
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme4) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme4), classPartObject, classGroupId, theme4);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme4);
    });
  });
};
var getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var createParseClassName = (config) => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  const parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return (className) => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
var sortModifiers = (modifiers) => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList2, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList2.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList2) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList2);
  }
  function tailwindMerge(classList2) {
    const cachedResult = cacheGet(classList2);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList2, configUtils);
    cacheSet(classList2, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var fromTheme = (key) => {
  const themeGetter = (theme4) => theme4[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
var isAny = () => true;
var getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var getDefaultConfig = () => {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// src/client/components/util.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/client/components/icon/Icon.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var IconSize = /* @__PURE__ */ ((IconSize2) => {
  IconSize2["xs"] = "12";
  IconSize2["sm"] = "16";
  IconSize2["md"] = "20";
  IconSize2["lg"] = "32";
  IconSize2["xl"] = "40";
  IconSize2["2xl"] = "80";
  IconSize2["jumbo"] = "160";
  return IconSize2;
})(IconSize || {});
var emptyFill = [];
var strokeIcon = [];
var Icon = ({ name, testId, className, size = "sm", ...props }) => {
  const iconSize = IconSize[size];
  const isEmptyFill = emptyFill.includes(name);
  const isStrokeIcon = strokeIcon.includes(name);
  const iconClasses = cn("inline-block flex-shrink-0", className, isEmptyFill && "fill-transparent");
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: iconClasses,
      fill: isEmptyFill ? "none" : "currentColor",
      stroke: isStrokeIcon ? "currentColor" : "none",
      width: iconSize,
      height: iconSize,
      "data-testid": testId,
      "data-name": name,
      ...props,
      children: [
        /* @__PURE__ */ jsx2("title", { children: name }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Layout",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "21", y1: "9", y2: "9" }),
                /* @__PURE__ */ jsx2("line", { x1: "9", x2: "9", y1: "21", y2: "9" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Root",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { x: "16", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "2", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "9", y: "2", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" }),
                /* @__PURE__ */ jsx2("path", { d: "M12 12V8" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Network",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "m13.11 7.664 1.78 2.672" }),
                /* @__PURE__ */ jsx2("path", { d: "m14.162 12.788-3.324 1.424" }),
                /* @__PURE__ */ jsx2("path", { d: "m20 4-6.06 1.515" }),
                /* @__PURE__ */ jsx2("path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }),
                /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "6", r: "2" }),
                /* @__PURE__ */ jsx2("circle", { cx: "16", cy: "12", r: "2" }),
                /* @__PURE__ */ jsx2("circle", { cx: "9", cy: "15", r: "2" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "X",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M18 6 6 18" }),
                /* @__PURE__ */ jsx2("path", { d: "m6 6 12 12" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Terminal",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("polyline", { points: "4 17 10 11 4 5" }),
                /* @__PURE__ */ jsx2("line", { x1: "12", x2: "20", y1: "19", y2: "19" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Settings",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
                /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Send",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "m22 2-7 20-4-9-9-4Z" }),
                /* @__PURE__ */ jsx2("path", { d: "M22 2 11 13" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Radio",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9" }),
                /* @__PURE__ */ jsx2("path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" }),
                /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "2" }),
                /* @__PURE__ */ jsx2("path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" }),
                /* @__PURE__ */ jsx2("path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Network",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { x: "16", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "2", y: "16", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("rect", { x: "9", y: "2", width: "6", height: "6", rx: "1" }),
                /* @__PURE__ */ jsx2("path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" }),
                /* @__PURE__ */ jsx2("path", { d: "M12 12V8" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "List",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("line", { x1: "8", x2: "21", y1: "6", y2: "6" }),
                /* @__PURE__ */ jsx2("line", { x1: "8", x2: "21", y1: "12", y2: "12" }),
                /* @__PURE__ */ jsx2("line", { x1: "8", x2: "21", y1: "18", y2: "18" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "3.01", y1: "6", y2: "6" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "3.01", y1: "12", y2: "12" }),
                /* @__PURE__ */ jsx2("line", { x1: "3", x2: "3.01", y1: "18", y2: "18" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Layers",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" }),
                /* @__PURE__ */ jsx2("path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" }),
                /* @__PURE__ */ jsx2("path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "GitMerge",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("circle", { cx: "18", cy: "18", r: "3" }),
                /* @__PURE__ */ jsx2("circle", { cx: "6", cy: "6", r: "3" }),
                /* @__PURE__ */ jsx2("path", { d: "M6 21V9a9 9 0 0 0 9 9" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "CornerDownRight",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("polyline", { points: "15 10 20 15 15 20" }),
                /* @__PURE__ */ jsx2("path", { d: "M4 4v7a4 4 0 0 0 4 4h12" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "CopySlash",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("line", { x1: "12", x2: "18", y1: "18", y2: "12" }),
                /* @__PURE__ */ jsx2("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
                /* @__PURE__ */ jsx2("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Columns",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
                /* @__PURE__ */ jsx2("line", { x1: "12", x2: "12", y1: "3", y2: "21" })
              ]
            }
          ),
          /* @__PURE__ */ jsx2(
            "symbol",
            {
              id: "ChevronDown",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx2("path", { d: "m6 9 6 6 6-6" })
            }
          ),
          /* @__PURE__ */ jsx2(
            "symbol",
            {
              id: "Check",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx2("polyline", { points: "20 6 9 17 4 12" })
            }
          ),
          /* @__PURE__ */ jsx2(
            "symbol",
            {
              id: "Activity",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx2("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Shield",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }),
                /* @__PURE__ */ jsx2("path", { d: "m14.5 9-5 5" }),
                /* @__PURE__ */ jsx2("path", { d: "m9.5 9 5 5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "symbol",
            {
              id: "Accessibility",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx2("circle", { cx: "16", cy: "4", r: "1" }),
                /* @__PURE__ */ jsx2("path", { d: "m18 19 1-7-6 1" }),
                /* @__PURE__ */ jsx2("path", { d: "m5 8 3-3 5.5 3-2.36 3.5" }),
                /* @__PURE__ */ jsx2("path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6" }),
                /* @__PURE__ */ jsx2("path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx2("use", { href: `#${name}` })
      ]
    }
  );
};

// src/client/tabs/ErrorsTab.tsx
import beautify from "beautify";
import { useEffect as useEffect8, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

// src/client/hooks/useDevServerConnection.ts
import { useEffect as useEffect7 } from "react";
import { useNavigation as useNavigation3 } from "react-router";
var updateRouteInfo = (server, routes, event, includeServerInfo = true) => {
  const { data, type } = event;
  const { id: id2, ...rest } = data;
  const existingRouteInfo = !includeServerInfo ? routes?.[id2] : routes?.[id2] ?? server?.routes?.[id2];
  let newRouteData = [...existingRouteInfo?.[type === "loader" ? "loaders" : "actions"] || [], rest];
  newRouteData = cutArrayToLastN(newRouteData, 20);
  const { min, max, total } = newRouteData.reduce(
    (acc, dataPiece) => {
      return {
        min: Math.min(acc.min, dataPiece.executionTime),
        max: Math.max(acc.max, dataPiece.executionTime),
        total: acc.total + dataPiece.executionTime
      };
    },
    { min: 1e5, max: 0, total: 0 }
  );
  const loaderTriggerCount = existingRouteInfo?.loaderTriggerCount || 0;
  const actionTriggerCount = existingRouteInfo?.actionTriggerCount || 0;
  routes[id2] = {
    ...existingRouteInfo,
    lowestExecutionTime: min,
    highestExecutionTime: max,
    averageExecutionTime: Number(Number(total / newRouteData.length).toFixed(2)),
    loaderTriggerCount: type === "loader" ? loaderTriggerCount + 1 : loaderTriggerCount,
    loaders: type === "loader" ? newRouteData : existingRouteInfo?.loaders ?? [],
    actions: type === "action" ? newRouteData : existingRouteInfo?.actions ?? [],
    lastLoader: type === "loader" ? rest : existingRouteInfo?.lastLoader ?? {},
    lastAction: type === "action" ? rest : existingRouteInfo?.lastAction ?? {},
    actionTriggerCount: type === "action" ? actionTriggerCount + 1 : actionTriggerCount
  };
};
var useDevServerConnection = () => {
  const navigation = useNavigation3();
  const { server, setServerInfo } = useServerInfo();
  useEffect7(() => {
    if (typeof import.meta.hot === "undefined") return;
    if (navigation.state !== "idle") return;
    import.meta.hot.send("all-route-info");
  }, [navigation.state]);
  useEffect7(() => {
    const cb2 = (data) => {
      const events = JSON.parse(data).data;
      const routes = {};
      for (const routeInfo of Object.values(events)) {
        const { loader, action } = routeInfo;
        const events2 = [
          loader.map((e) => ({ type: "loader", data: e })),
          action.map((e) => ({ type: "action", data: e }))
        ].flat();
        for (const event of events2) {
          updateRouteInfo(server, routes, event, false);
        }
      }
      setServerInfo({ routes });
    };
    if (typeof import.meta.hot !== "undefined") {
      import.meta.hot.on("all-route-info", cb2);
    }
    return () => {
      if (typeof import.meta.hot !== "undefined") {
        import.meta.hot.dispose(cb2);
      }
    };
  }, [server, setServerInfo]);
  const isConnected = typeof import.meta.hot !== "undefined";
  return {
    sendJsonMessage: (data) => import.meta.hot?.send(data.type, data),
    connectionStatus: "Open",
    isConnected
  };
};

// src/client/tabs/ErrorsTab.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var DiffViewer = ReactDiffViewer.default ? (
  // @ts-expect-error
  ReactDiffViewer.default
) : ReactDiffViewer;
var ErrorsTab = () => {
  const { htmlErrors } = useHtmlErrors();
  const { sendJsonMessage } = useDevServerConnection();
  const [SSRHtml, setSSRHtml] = useState("");
  const [CSRHtml, setCSRHtml] = useState("");
  const [hasHydrationMismatch, setHasHydrationMismatch] = useState(false);
  useEffect8(() => {
    if (typeof window === "undefined") return;
    if (!window.HYDRATION_OVERLAY) {
      return;
    }
    const ssrHtml = window.HYDRATION_OVERLAY?.SSR_HTML;
    const newCSRHtml = window.HYDRATION_OVERLAY?.CSR_HTML;
    if (!ssrHtml || !newCSRHtml) return;
    const newSSR = beautify(ssrHtml, { format: "html" });
    const newCSR = beautify(newCSRHtml, { format: "html" });
    setSSRHtml(newSSR);
    setCSRHtml(newCSR);
    setHasHydrationMismatch(window.HYDRATION_OVERLAY?.ERROR ?? false);
  }, []);
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-1", children: [
    htmlErrors.length > 0 ? /* @__PURE__ */ jsx3(Fragment, { children: /* @__PURE__ */ jsxs2("div", { className: "mb-1", children: [
      /* @__PURE__ */ jsx3("span", { className: "text-lg font-semibold", children: "HTML Nesting Errors" }),
      /* @__PURE__ */ jsx3("hr", { className: "mt-2 border-gray-400" })
    ] }) }) : /* @__PURE__ */ jsx3("div", { className: "text-2xl", children: "No errors detected!" }),
    htmlErrors.map((error) => {
      return /* @__PURE__ */ jsxs2(
        "div",
        {
          className: "flex justify-start gap-2 rounded-lg border border-solid border-red-600/20 p-2",
          children: [
            /* @__PURE__ */ jsx3(Icon, { size: "md", className: "text-red-600", name: "Shield" }),
            /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-2 lg:gap-0", children: [
              /* @__PURE__ */ jsxs2("div", { children: [
                /* @__PURE__ */ jsx3("span", { className: "font-bold text-red-600", children: error.child.tag }),
                " element can't be nested inside of",
                " ",
                /* @__PURE__ */ jsx3("span", { className: "font-bold text-red-600", children: error.parent.tag }),
                " element"
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "flex lg:flex-row flex-col items-start gap-1 text-sm text-gray-500", children: [
                "The parent element is located inside of the",
                /* @__PURE__ */ jsx3(
                  "div",
                  {
                    onClick: () => sendJsonMessage({
                      type: "open-source",
                      data: { source: error.parent.file }
                    }),
                    className: "cursor-pointer text-white",
                    children: error.parent.file
                  }
                ),
                "file"
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "flex lg:flex-row flex-col items-start gap-1 text-sm text-gray-500", children: [
                "The child element is located inside of the",
                /* @__PURE__ */ jsx3(
                  "div",
                  {
                    onClick: () => sendJsonMessage({
                      type: "open-source",
                      data: { source: error.child.file }
                    }),
                    className: "cursor-pointer text-white",
                    children: error.child.file
                  }
                ),
                "file"
              ] })
            ] })
          ]
        },
        JSON.stringify(error)
      );
    }),
    hasHydrationMismatch && /* @__PURE__ */ jsxs2("div", { className: "relative mt-4 w-full border-2 overflow-y-auto rounded border-gray-800", children: [
      /* @__PURE__ */ jsx3("h1", { className: "text-xl p-2 text-center", children: "Hydration mismatch comparison" }),
      /* @__PURE__ */ jsx3("hr", { className: "mb-1 border-gray-600/30" }),
      /* @__PURE__ */ jsx3(
        DiffViewer,
        {
          oldValue: SSRHtml,
          newValue: CSRHtml,
          leftTitle: "Server-Side Render",
          rightTitle: "Client-Side Render",
          compareMethod: DiffMethod.WORDS,
          styles: {
            titleBlock: {
              textAlign: "center"
            },
            variables: {
              light: {
                diffViewerBackground: "#212121",
                diffViewerColor: "#FFF",
                addedBackground: "#044B53",
                addedColor: "white",
                removedBackground: "#632F34",
                removedColor: "white",
                wordAddedBackground: "#055d67",
                wordRemovedBackground: "#7d383f",
                addedGutterBackground: "#034148",
                removedGutterBackground: "#632b30",
                gutterBackground: "#1F2937",
                highlightBackground: "#212121",
                highlightGutterBackground: "#212121",
                codeFoldGutterBackground: "#1F2937",
                codeFoldBackground: "#1F2937",
                emptyLineBackground: "#363946",
                gutterColor: "#white",
                addedGutterColor: "#8c8c8c",
                removedGutterColor: "#8c8c8c",
                codeFoldContentColor: "white",
                diffViewerTitleBackground: "#212121",
                diffViewerTitleColor: "white",
                diffViewerTitleBorderColor: "#353846"
              },
              dark: {
                diffViewerBackground: "#212121",
                diffViewerColor: "#FFF",
                addedBackground: "#044B53",
                addedColor: "white",
                removedBackground: "#632F34",
                removedColor: "white",
                wordAddedBackground: "#055d67",
                wordRemovedBackground: "#7d383f",
                addedGutterBackground: "#034148",
                removedGutterBackground: "#632b30",
                gutterBackground: "#1F2937",
                highlightBackground: "#212121",
                highlightGutterBackground: "#212121",
                codeFoldGutterBackground: "#1F2937",
                codeFoldBackground: "#1F2937",
                emptyLineBackground: "#363946",
                gutterColor: "#white",
                addedGutterColor: "#8c8c8c",
                removedGutterColor: "#8c8c8c",
                codeFoldContentColor: "white",
                diffViewerTitleBackground: "#212121",
                diffViewerTitleColor: "white",
                diffViewerTitleBorderColor: "#353846"
              }
            }
          },
          extraLinesSurroundingDiff: 2,
          useDarkTheme: true
        }
      )
    ] })
  ] });
};

// src/client/components/network-tracer/NetworkPanel.tsx
import { useEffect as useEffect16, useState as useState7 } from "react";

// src/client/context/requests/request-context.tsx
import { createContext as createContext2, useCallback as useCallback4, useContext as useContext2, useEffect as useEffect9, useState as useState2 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var RequestContext = createContext2({ requests: [], removeAllRequests: () => {
} });
var requestMap = /* @__PURE__ */ new Map();
var RequestProvider = ({ children: children2 }) => {
  const [requests, setRequests] = useState2([]);
  const setNewRequests = useCallback4((payload) => {
    const requests2 = JSON.parse(payload);
    const newRequests = Array.isArray(requests2) ? requests2 : [requests2];
    for (const req of newRequests) {
      requestMap.set(req.id + req.startTime, req);
      import.meta.hot?.send("remove-event", { ...req, fromClient: true });
    }
    setRequests(Array.from(requestMap.values()));
  }, []);
  useEffect9(() => {
    import.meta.hot?.send("get-events");
    import.meta.hot?.on("get-events", setNewRequests);
    import.meta.hot?.on("request-event", setNewRequests);
    return () => {
      import.meta.hot?.off?.("get-events", setNewRequests);
      import.meta.hot?.off?.("request-event", setNewRequests);
    };
  }, [setNewRequests]);
  const removeAllRequests = useCallback4(() => {
    setRequests([]);
    requestMap.clear();
  }, []);
  return /* @__PURE__ */ jsx4(RequestContext.Provider, { value: { requests, removeAllRequests }, children: children2 });
};
var useRequestContext = () => {
  return useContext2(RequestContext);
};

// src/client/components/network-tracer/NetworkWaterfall.tsx
import { AnimatePresence } from "framer-motion";
import { useEffect as useEffect15, useRef as useRef7, useState as useState6 } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip } from "react-tooltip";

// src/client/components/Tag.tsx
import clsx2 from "clsx";
import { jsx as jsx5 } from "react/jsx-runtime";
var TAG_COLORS = {
  GREEN: "border-green-500 border border-solid text-white",
  BLUE: "border-blue-500 border border-solid text-white",
  TEAL: "border-teal-400 border border-solid text-white",
  RED: "border-red-500 border border-solid text-white",
  PURPLE: "border-purple-500 border border-solid text-white"
};
var Tag = ({ color: color2, children: children2, className }) => {
  return /* @__PURE__ */ jsx5("span", { className: clsx2("flex items-center rounded px-2.5 py-0.5 text-sm font-medium", className, TAG_COLORS[color2]), children: children2 });
};

// src/client/components/jsonRenderer.tsx
import { useEffect as useEffect13, useMemo as useMemo3, useRef as useRef6, useState as useState5 } from "react";

// src/external/react-json-view/index.tsx
import { forwardRef as forwardRef2 } from "react";

// src/external/react-json-view/store.tsx
import { createContext as createContext8, useContext as useContext8, useEffect as useEffect10, useReducer as useReducer7 } from "react";

// src/external/react-json-view/store/ShowTools.tsx
import { createContext as createContext3, useContext as useContext3, useReducer as useReducer2 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var initialState2 = {};
var Context = createContext3(initialState2);
var reducer = (state, action) => ({
  ...state,
  ...action
});
var useShowToolsStore = () => {
  return useContext3(Context);
};
var DispatchShowTools = createContext3(() => {
});
DispatchShowTools.displayName = "JVR.DispatchShowTools";
function useShowTools() {
  return useReducer2(reducer, initialState2);
}
function useShowToolsDispatch() {
  return useContext3(DispatchShowTools);
}
var ShowTools = ({ initial, dispatch: dispatch2, children: children2 }) => {
  return /* @__PURE__ */ jsx6(Context.Provider, { value: initial, children: /* @__PURE__ */ jsx6(DispatchShowTools.Provider, { value: dispatch2, children: children2 }) });
};
ShowTools.displayName = "JVR.ShowTools";

// src/external/react-json-view/store/Expands.tsx
import { createContext as createContext4, useContext as useContext4, useReducer as useReducer3 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var initialState3 = {};
var Context2 = createContext4(initialState3);
var reducer2 = (state, action) => ({
  ...state,
  ...action
});
var useExpandsStore = () => {
  return useContext4(Context2);
};
var DispatchExpands = createContext4(() => {
});
DispatchExpands.displayName = "JVR.DispatchExpands";
function useExpands() {
  return useReducer3(reducer2, initialState3);
}
function useExpandsDispatch() {
  return useContext4(DispatchExpands);
}
var Expands = ({ initial, dispatch: dispatch2, children: children2 }) => {
  return /* @__PURE__ */ jsx7(Context2.Provider, { value: initial, children: /* @__PURE__ */ jsx7(DispatchExpands.Provider, { value: dispatch2, children: children2 }) });
};
Expands.displayName = "JVR.Expands";

// src/external/react-json-view/store/Types.tsx
import { createContext as createContext5, useContext as useContext5, useReducer as useReducer4 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var initialState4 = {
  Str: {
    as: "span",
    "data-type": "string",
    style: {
      color: "var(--w-rjv-type-string-color, #cb4b16)"
    },
    className: "w-rjv-type",
    children: "string"
  },
  Url: {
    as: "a",
    style: {
      color: "var(--w-rjv-type-url-color, #0969da)"
    },
    "data-type": "url",
    className: "w-rjv-type",
    children: "url"
  },
  Undefined: {
    style: {
      color: "var(--w-rjv-type-undefined-color, #586e75)"
    },
    as: "span",
    "data-type": "undefined",
    className: "w-rjv-type",
    children: "undefined"
  },
  Null: {
    style: {
      color: "var(--w-rjv-type-null-color, #d33682)"
    },
    as: "span",
    "data-type": "null",
    className: "w-rjv-type",
    children: "null"
  },
  Map: {
    style: {
      color: "var(--w-rjv-type-map-color, #268bd2)"
    },
    as: "span",
    "data-type": "map",
    className: "w-rjv-type",
    children: "Map"
  },
  Nan: {
    style: {
      color: "var(--w-rjv-type-nan-color, #859900)"
    },
    as: "span",
    "data-type": "nan",
    className: "w-rjv-type",
    children: "NaN"
  },
  Bigint: {
    style: {
      color: "var(--w-rjv-type-bigint-color, #268bd2)"
    },
    as: "span",
    "data-type": "bigint",
    className: "w-rjv-type",
    children: "bigint"
  },
  Int: {
    style: {
      color: "var(--w-rjv-type-int-color, #268bd2)"
    },
    as: "span",
    "data-type": "int",
    className: "w-rjv-type",
    children: "int"
  },
  Set: {
    style: {
      color: "var(--w-rjv-type-set-color, #268bd2)"
    },
    as: "span",
    "data-type": "set",
    className: "w-rjv-type",
    children: "Set"
  },
  Float: {
    style: {
      color: "var(--w-rjv-type-float-color, #859900)"
    },
    as: "span",
    "data-type": "float",
    className: "w-rjv-type",
    children: "float"
  },
  True: {
    style: {
      color: "var(--w-rjv-type-boolean-color, #2aa198)"
    },
    as: "span",
    "data-type": "bool",
    className: "w-rjv-type",
    children: "bool"
  },
  False: {
    style: {
      color: "var(--w-rjv-type-boolean-color, #2aa198)"
    },
    as: "span",
    "data-type": "bool",
    className: "w-rjv-type",
    children: "bool"
  },
  Date: {
    style: {
      color: "var(--w-rjv-type-date-color, #268bd2)"
    },
    as: "span",
    "data-type": "date",
    className: "w-rjv-type",
    children: "date"
  }
};
var Context3 = createContext5(initialState4);
var reducer3 = (state, action) => ({
  ...state,
  ...action
});
var useTypesStore = () => {
  return useContext5(Context3);
};
var DispatchTypes = createContext5(() => {
});
DispatchTypes.displayName = "JVR.DispatchTypes";
function useTypes() {
  return useReducer4(reducer3, initialState4);
}
function useTypesDispatch() {
  return useContext5(DispatchTypes);
}
var Types = ({ initial, dispatch: dispatch2, children: children2 }) => {
  return /* @__PURE__ */ jsx8(Context3.Provider, { value: initial, children: /* @__PURE__ */ jsx8(DispatchTypes.Provider, { value: dispatch2, children: children2 }) });
};
Types.displayName = "JVR.Types";

// src/external/react-json-view/store/Symbols.tsx
import {
  createContext as createContext6,
  useContext as useContext6,
  useReducer as useReducer5
} from "react";

// src/external/react-json-view/arrow/TriangleArrow.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function TriangleArrow(props) {
  const { style, ...reset } = props;
  const defaultStyle = {
    cursor: "pointer",
    height: "1em",
    width: "1em",
    userSelect: "none",
    display: "flex",
    ...style
  };
  return /* @__PURE__ */ jsx9("svg", { viewBox: "0 0 24 24", fill: "var(--w-rjv-arrow-color, currentColor)", style: defaultStyle, ...reset, children: /* @__PURE__ */ jsx9("path", { d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" }) });
}
TriangleArrow.displayName = "JVR.TriangleArrow";

// src/external/react-json-view/store/Symbols.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var initialState5 = {
  Arrow: {
    as: "span",
    className: "w-rjv-arrow",
    style: {
      transform: "rotate(0deg)",
      transition: "all 0.3s"
    },
    children: /* @__PURE__ */ jsx10(TriangleArrow, {})
  },
  Colon: {
    as: "span",
    style: {
      color: "var(--w-rjv-colon-color, var(--w-rjv-color))",
      marginLeft: 0,
      marginRight: 2
    },
    className: "w-rjv-colon",
    children: ":"
  },
  Quote: {
    as: "span",
    style: {
      color: "var(--w-rjv-quotes-color, #236a7c)"
    },
    className: "w-rjv-quotes",
    children: '"'
  },
  ValueQuote: {
    as: "span",
    style: {
      color: "var(--w-rjv-quotes-string-color, #cb4b16)"
    },
    className: "w-rjv-quotes",
    children: '"'
  },
  BracketsLeft: {
    as: "span",
    style: {
      color: "var(--w-rjv-brackets-color, #236a7c)"
    },
    className: "w-rjv-brackets-start",
    children: "["
  },
  BracketsRight: {
    as: "span",
    style: {
      color: "var(--w-rjv-brackets-color, #236a7c)"
    },
    className: "w-rjv-brackets-end",
    children: "]"
  },
  BraceLeft: {
    as: "span",
    style: {
      color: "var(--w-rjv-curlybraces-color, #236a7c)"
    },
    className: "w-rjv-curlybraces-start",
    children: "{"
  },
  BraceRight: {
    as: "span",
    style: {
      color: "var(--w-rjv-curlybraces-color, #236a7c)"
    },
    className: "w-rjv-curlybraces-end",
    children: "}"
  }
};
var Context4 = createContext6(initialState5);
var reducer4 = (state, action) => ({
  ...state,
  ...action
});
var useSymbolsStore = () => {
  return useContext6(Context4);
};
var DispatchSymbols = createContext6(() => {
});
DispatchSymbols.displayName = "JVR.DispatchSymbols";
function useSymbols() {
  return useReducer5(reducer4, initialState5);
}
function useSymbolsDispatch() {
  return useContext6(DispatchSymbols);
}
var Symbols = ({ initial, dispatch: dispatch2, children: children2 }) => {
  return /* @__PURE__ */ jsx10(Context4.Provider, { value: initial, children: /* @__PURE__ */ jsx10(DispatchSymbols.Provider, { value: dispatch2, children: children2 }) });
};
Symbols.displayName = "JVR.Symbols";

// src/external/react-json-view/store/Section.tsx
import { createContext as createContext7, useContext as useContext7, useReducer as useReducer6 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var initialState6 = {
  Copied: {
    className: "w-rjv-copied",
    style: {
      height: "1em",
      width: "1em",
      cursor: "pointer",
      verticalAlign: "middle",
      marginLeft: 5
    }
  },
  CountInfo: {
    as: "span",
    className: "w-rjv-object-size",
    style: {
      color: "var(--w-rjv-info-color, #0000004d)",
      paddingLeft: 8,
      fontStyle: "italic"
    }
  },
  CountInfoExtra: {
    as: "span",
    className: "w-rjv-object-extra",
    style: {
      paddingLeft: 8
    }
  },
  Ellipsis: {
    as: "span",
    style: {
      cursor: "pointer",
      color: "var(--w-rjv-ellipsis-color, #cb4b16)",
      userSelect: "none"
    },
    className: "w-rjv-ellipsis",
    children: "..."
  },
  KeyName: {
    as: "span",
    className: "w-rjv-object-key"
  }
};
var Context5 = createContext7(initialState6);
var reducer5 = (state, action) => ({
  ...state,
  ...action
});
var useSectionStore = () => {
  return useContext7(Context5);
};
var DispatchSection = createContext7(() => {
});
DispatchSection.displayName = "JVR.DispatchSection";
function useSection() {
  return useReducer6(reducer5, initialState6);
}
function useSectionDispatch() {
  return useContext7(DispatchSection);
}
var Section = ({ initial, dispatch: dispatch2, children: children2 }) => {
  return /* @__PURE__ */ jsx11(Context5.Provider, { value: initial, children: /* @__PURE__ */ jsx11(DispatchSection.Provider, { value: dispatch2, children: children2 }) });
};
Section.displayName = "JVR.Section";

// src/external/react-json-view/store.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var initialState7 = {
  objectSortKeys: false,
  indentWidth: 15
};
var Context6 = createContext8(initialState7);
Context6.displayName = "JVR.Context";
var DispatchContext = createContext8(() => {
});
DispatchContext.displayName = "JVR.DispatchContext";
function reducer6(state, action) {
  return {
    ...state,
    ...action
  };
}
var useStore = () => {
  return useContext8(Context6);
};
var Provider = ({
  children: children2,
  initialState: init2,
  initialTypes
}) => {
  const [state, dispatch2] = useReducer7(reducer6, Object.assign({}, initialState7, init2));
  const [showTools, showToolsDispatch] = useShowTools();
  const [expands, expandsDispatch] = useExpands();
  const [types, typesDispatch] = useTypes();
  const [symbols, symbolsDispatch] = useSymbols();
  const [section, sectionDispatch] = useSection();
  useEffect10(() => dispatch2({ ...init2 }), [init2]);
  return /* @__PURE__ */ jsx12(Context6.Provider, { value: state, children: /* @__PURE__ */ jsx12(DispatchContext.Provider, { value: dispatch2, children: /* @__PURE__ */ jsx12(ShowTools, { initial: showTools, dispatch: showToolsDispatch, children: /* @__PURE__ */ jsx12(Expands, { initial: expands, dispatch: expandsDispatch, children: /* @__PURE__ */ jsx12(Types, { initial: { ...types, ...initialTypes }, dispatch: typesDispatch, children: /* @__PURE__ */ jsx12(Symbols, { initial: symbols, dispatch: symbolsDispatch, children: /* @__PURE__ */ jsx12(Section, { initial: section, dispatch: sectionDispatch, children: children2 }) }) }) }) }) }) });
};
Provider.displayName = "JVR.Provider";

// src/external/react-json-view/Container.tsx
import { forwardRef, useId as useId2 } from "react";

// src/external/react-json-view/symbol/index.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var Quote = (props) => {
  const { Quote: Comp = {} } = useSymbolsStore();
  const { isNumber: isNumber2, ...other } = props;
  if (isNumber2) return null;
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const elmProps = { ...other, ...reset };
  const child = render && typeof render === "function" && render(elmProps);
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...elmProps });
};
Quote.displayName = "JVR.Quote";
var ValueQuote = (props) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  const { ...other } = props;
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const elmProps = { ...other, ...reset };
  const child = render && typeof render === "function" && render(elmProps);
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...elmProps });
};
ValueQuote.displayName = "JVR.ValueQuote";
var Colon = () => {
  const { Colon: Comp = {} } = useSymbolsStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const child = render && typeof render === "function" && render(reset);
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...reset });
};
Colon.displayName = "JVR.Colon";
var Arrow = (props) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  const expands = useExpandsStore();
  const { expandKey } = props;
  const isExpanded = !!expands[expandKey];
  const { as, style, render, ...reset } = Comp;
  const Elm = as || "span";
  const isRender = render && typeof render === "function";
  const child = isRender && render({ ...reset, "data-expanded": isExpanded, style: { ...style, ...props.style } });
  if (child) return child;
  return /* @__PURE__ */ jsx13(Elm, { ...reset, style: { ...style, ...props.style } });
};
Arrow.displayName = "JVR.Arrow";
var BracketsOpen = ({ isBrackets }) => {
  const { BracketsLeft: BracketsLeft2 = {}, BraceLeft: BraceLeft2 = {} } = useSymbolsStore();
  if (isBrackets) {
    const { as, render: render2, ...reset } = BracketsLeft2;
    const BracketsLeftComp = as || "span";
    const child2 = render2 && typeof render2 === "function" && render2(reset);
    if (child2) return child2;
    return /* @__PURE__ */ jsx13(BracketsLeftComp, { ...reset });
  }
  const { as: elm, render, ...props } = BraceLeft2;
  const BraceLeftComp = elm || "span";
  const child = render && typeof render === "function" && render(props);
  if (child) return child;
  return /* @__PURE__ */ jsx13(BraceLeftComp, { ...props });
};
BracketsOpen.displayName = "JVR.BracketsOpen";
var BracketsClose = ({ isBrackets, isVisiable }) => {
  if (!isVisiable) return null;
  const { BracketsRight: BracketsRight2 = {}, BraceRight: BraceRight2 = {} } = useSymbolsStore();
  if (isBrackets) {
    const { as, render: render2, ...reset2 } = BracketsRight2;
    const BracketsRightComp = as || "span";
    const child2 = render2 && typeof render2 === "function" && render2(reset2);
    if (child2) return child2;
    return /* @__PURE__ */ jsx13(BracketsRightComp, { ...reset2 });
  }
  const { as: elm, render, ...reset } = BraceRight2;
  const BraceRightComp = elm || "span";
  const child = render && typeof render === "function" && render(reset);
  if (child) return child;
  return /* @__PURE__ */ jsx13(BraceRightComp, { ...reset });
};
BracketsClose.displayName = "JVR.BracketsClose";

// src/external/react-json-view/comps/NestedClose.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
var NestedClose = (props) => {
  const { value, expandKey, level } = props;
  const expands = useExpandsStore();
  const isArray = Array.isArray(value);
  const { collapsed } = useStore();
  const isMySet = value instanceof Set;
  const isExpanded = expands[expandKey] ?? (typeof collapsed === "boolean" ? collapsed : typeof collapsed === "number" ? level > collapsed : false);
  const len = Object.keys(value).length;
  if (isExpanded || len === 0) {
    return null;
  }
  const style = {
    paddingLeft: 4
  };
  return /* @__PURE__ */ jsx14("div", { style, children: /* @__PURE__ */ jsx14(BracketsClose, { isBrackets: isArray || isMySet, isVisiable: true }) });
};
NestedClose.displayName = "JVR.NestedClose";

// src/external/react-json-view/comps/KeyValues.tsx
import { Fragment as Fragment3, useId, useRef as useRef5 } from "react";

// src/external/react-json-view/types/index.tsx
import { Fragment as Fragment2, useState as useState4 } from "react";

// src/external/react-json-view/comps/Copied.tsx
import { useState as useState3 } from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
var Copied = (props) => {
  const { keyName, value, expandKey, ...other } = props;
  const { onCopied, enableClipboard } = useStore();
  const showTools = useShowToolsStore();
  const isShowTools = showTools[expandKey];
  const [copied, setCopied] = useState3(false);
  const { Copied: Comp = {} } = useSectionStore();
  if (enableClipboard === false || !isShowTools)
    return /* @__PURE__ */ jsx15("div", { style: { display: "inline-block", height: "13px", width: "13px", marginLeft: "5px" }, children: "\xA0" });
  const click = (event) => {
    event.stopPropagation();
    let copyText = JSON.stringify(
      value,
      (key, value2) => {
        if (typeof value2 === "bigint") {
          return value2.toString();
        }
        return value2;
      },
      2
    );
    if (typeof value === "number" && value === Infinity) copyText = "Infinity";
    if (typeof value === "number" && isNaN(value)) copyText = "NaN";
    if (typeof value === "bigint") copyText = value + "n";
    navigator.clipboard.writeText(copyText).then(() => {
      onCopied && onCopied(copyText, value);
      setCopied(true);
      const timer2 = setTimeout(() => {
        setCopied(false);
        clearTimeout(timer2);
      }, 3e3);
    }).catch((error) => {
    });
  };
  const svgProps = {
    fill: copied ? "var(--w-rjv-copied-success-color, #28a745)" : "var(--w-rjv-copied-color, currentColor)",
    onClick: click
  };
  const { as, render, ...reset } = Comp;
  const elmProps = { ...reset, ...other, ...svgProps };
  const isRender = render && typeof render === "function";
  const child = isRender && render({ ...elmProps, "data-copied": copied }, { value, keyName });
  if (child) return child;
  if (copied) {
    return /* @__PURE__ */ jsx15("svg", { style: { display: "inline", height: "1em", width: "1em" }, viewBox: "0 0 32 36", ...elmProps, children: /* @__PURE__ */ jsx15("path", { d: "M27.5,33 L2.5,33 L2.5,12.5 L27.5,12.5 L27.5,15.2249049 C29.1403264,13.8627542 29.9736597,13.1778155 30,13.1700887 C30,11.9705278 30,10.0804982 30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,33 C0,34.4 1.1,36 2.5,36 L27.5,36 C28.9,36 30,34.4 30,33 L30,26.1114493 L27.5,28.4926435 L27.5,33 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M28.5589286,16 L32,19.6 L21.0160714,30.5382252 L13.5303571,24.2571429 L17.1303571,20.6571429 L21.0160714,24.5428571 L28.5589286,16 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z" }) });
  }
  return /* @__PURE__ */ jsx15("svg", { style: { display: "inline", height: "1em", width: "1em" }, viewBox: "0 0 32 36", ...elmProps, children: /* @__PURE__ */ jsx15("path", { d: "M27.5,33 L2.5,33 L2.5,12.5 L27.5,12.5 L27.5,20 L30,20 L30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,33 C0,34.4 1.1,36 2.5,36 L27.5,36 C28.9,36 30,34.4 30,33 L30,29 L27.5,29 L27.5,33 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M22.5,21.5 L22.5,16.5 L12.5,24 L22.5,31.5 L22.5,26.5 L32,26.5 L32,21.5 L22.5,21.5 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z" }) });
};
Copied.displayName = "JVR.Copied";

// src/external/react-json-view/types/index.tsx
import { jsx as jsx16, jsxs as jsxs3 } from "react/jsx-runtime";
var SetComp = ({ value }) => {
  const { Set: Comp = {}, displayDataTypes } = useTypesStore();
  const isSet = value instanceof Set;
  if (!isSet || !displayDataTypes) return null;
  const { as, render, ...reset } = Comp;
  const isRender = render && typeof render === "function";
  const type = isRender && render(reset, { type: "type", value });
  if (type) return type;
  const Elm = as || "span";
  return /* @__PURE__ */ jsx16(Elm, { ...reset });
};
SetComp.displayName = "JVR.SetComp";
var MapComp = ({ value }) => {
  const { Map: Comp = {}, displayDataTypes } = useTypesStore();
  const isMap = value instanceof Map;
  if (!isMap || !displayDataTypes) return null;
  const { as, render, ...reset } = Comp;
  const isRender = render && typeof render === "function";
  const type = isRender && render(reset, { type: "type", value });
  if (type) return type;
  const Elm = as || "span";
  return /* @__PURE__ */ jsx16(Elm, { ...reset });
};
MapComp.displayName = "JVR.MapComp";
var defalutStyle = {
  opacity: 0.75,
  paddingRight: 4
};
var TypeString = ({ children: children2 = "", expandKey, keyName }) => {
  const { Str = {}, displayDataTypes } = useTypesStore();
  const { shortenTextAfterLength: length = 30 } = useStore();
  const { as, render, ...reset } = Str;
  const childrenStr = children2;
  const [shorten, setShorten] = useState4(length && childrenStr.length >= length);
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Str.style || {}
  };
  if (length > 0) {
    reset.style = {
      ...reset.style,
      cursor: childrenStr.length <= length ? "initial" : "pointer"
    };
    if (childrenStr.length > length) {
      reset.onClick = () => {
        setShorten(!shorten);
      };
    }
  }
  const text = shorten ? `${childrenStr.slice(0, length)}...` : childrenStr;
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: text, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsxs3(Fragment2, { children: [
      /* @__PURE__ */ jsx16(ValueQuote, {}),
      /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: text }),
      /* @__PURE__ */ jsx16(ValueQuote, {})
    ] }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeString.displayName = "JVR.TypeString";
var TypeTrue = ({ children: children2, expandKey, keyName }) => {
  const { True: True2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = True2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...True2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children2?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeTrue.displayName = "JVR.TypeTrue";
var TypeFalse = ({ children: children2, expandKey, keyName }) => {
  const { False: False2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = False2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...False2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children2?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeFalse.displayName = "JVR.TypeFalse";
var TypeFloat = ({ children: children2, expandKey, keyName }) => {
  const { Float: Float2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Float2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Float2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children2?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeFloat.displayName = "JVR.TypeFloat";
var TypeInt = ({ children: children2, expandKey, keyName }) => {
  const { Int: Int2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Int2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Int2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children2?.toString() }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeInt.displayName = "JVR.TypeInt";
var TypeBigint = ({
  children: children2,
  expandKey,
  keyName
}) => {
  const { Bigint: CompBigint = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompBigint;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...CompBigint.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: children2?.toString() + "n" }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeBigint.displayName = "JVR.TypeFloat";
var TypeUrl = ({ children: children2, expandKey, keyName }) => {
  const { Url: Url2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Url2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Url2.style
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2?.href, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsxs3("a", { href: children2?.href, target: "_blank", ...reset, className: "w-rjv-value", children: [
      /* @__PURE__ */ jsx16(ValueQuote, {}),
      children2?.href,
      /* @__PURE__ */ jsx16(ValueQuote, {})
    ] }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeUrl.displayName = "JVR.TypeUrl";
var TypeDate = ({ children: children2, expandKey, keyName }) => {
  const { Date: CompData = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompData;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...CompData.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const childStr = children2?.toString();
  const child = isRender && render({ ...reset, children: childStr, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child || /* @__PURE__ */ jsx16(Comp, { ...reset, className: "w-rjv-value", children: childStr }),
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeDate.displayName = "JVR.TypeDate";
var TypeUndefined = ({ children: children2, expandKey, keyName }) => {
  const { Undefined: Undefined2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Undefined2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Undefined2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child,
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeUndefined.displayName = "JVR.TypeUndefined";
var TypeNull = ({ children: children2, expandKey, keyName }) => {
  const { Null: Null2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Null2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Null2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2, className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child,
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeNull.displayName = "JVR.TypeNull";
var TypeNan = ({ children: children2, expandKey, keyName }) => {
  const { Nan: Nan2 = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Nan2;
  const Comp = as || "span";
  const style = {
    ...defalutStyle,
    ...Nan2.style || {}
  };
  const isRender = render && typeof render === "function";
  const type = isRender && render({ ...reset, style }, { type: "type", value: children2 });
  const child = isRender && render({ ...reset, children: children2?.toString(), className: "w-rjv-value" }, { type: "value", value: children2 });
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    displayDataTypes && (type || /* @__PURE__ */ jsx16(Comp, { ...reset, style })),
    child,
    /* @__PURE__ */ jsx16(Copied, { keyName, value: children2, expandKey })
  ] });
};
TypeNan.displayName = "JVR.TypeNan";

// src/external/react-json-view/comps/Value.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var isFloat = (n) => Number(n) === n && n % 1 !== 0 || isNaN(n);
var Value = (props) => {
  const { value, keyName, expandKey } = props;
  const reset = { keyName, expandKey };
  if (value instanceof URL) {
    return /* @__PURE__ */ jsx17(TypeUrl, { ...reset, children: value });
  }
  if (typeof value === "string") {
    return /* @__PURE__ */ jsx17(TypeString, { ...reset, children: value });
  }
  if (value === true) {
    return /* @__PURE__ */ jsx17(TypeTrue, { ...reset, children: value });
  }
  if (value === false) {
    return /* @__PURE__ */ jsx17(TypeFalse, { ...reset, children: value });
  }
  if (value === null) {
    return /* @__PURE__ */ jsx17(TypeNull, { ...reset, children: value });
  }
  if (value === void 0) {
    return /* @__PURE__ */ jsx17(TypeUndefined, { ...reset, children: value });
  }
  if (value instanceof Date) {
    return /* @__PURE__ */ jsx17(TypeDate, { ...reset, children: value });
  }
  if (typeof value === "number" && isNaN(value)) {
    return /* @__PURE__ */ jsx17(TypeNan, { ...reset, children: value });
  } else if (typeof value === "number" && isFloat(value)) {
    return /* @__PURE__ */ jsx17(TypeFloat, { ...reset, children: value });
  } else if (typeof value === "bigint") {
    return /* @__PURE__ */ jsx17(TypeBigint, { ...reset, children: value });
  } else if (typeof value === "number") {
    return /* @__PURE__ */ jsx17(TypeInt, { ...reset, children: value });
  }
  return null;
};
Value.displayName = "JVR.Value";

// src/external/react-json-view/utils/useRender.tsx
import { useEffect as useEffect11 } from "react";
function useSymbolsRender(currentProps, props, key) {
  const dispatch2 = useSymbolsDispatch();
  const cls = [currentProps.className, props.className].filter(Boolean).join(" ");
  const reset = {
    ...currentProps,
    ...props,
    className: cls,
    style: {
      ...currentProps.style,
      ...props.style
    },
    children: props.children || currentProps.children
  };
  useEffect11(() => dispatch2({ [key]: reset }), [props]);
}
function useTypesRender(currentProps, props, key) {
  const dispatch2 = useTypesDispatch();
  const cls = [currentProps.className, props.className].filter(Boolean).join(" ");
  const reset = {
    ...currentProps,
    ...props,
    className: cls,
    style: {
      ...currentProps.style,
      ...props.style
    },
    children: props.children || currentProps.children
  };
  useEffect11(() => dispatch2({ [key]: reset }), [props]);
}
function useSectionRender(currentProps, props, key) {
  const dispatch2 = useSectionDispatch();
  const cls = [currentProps.className, props.className].filter(Boolean).join(" ");
  const reset = {
    ...currentProps,
    ...props,
    className: cls,
    style: {
      ...currentProps.style,
      ...props.style
    },
    children: props.children || currentProps.children
  };
  useEffect11(() => dispatch2({ [key]: reset }), [props]);
}

// src/external/react-json-view/section/KeyName.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var KeyName = (props) => {
  const { KeyName: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "KeyName");
  return null;
};
KeyName.displayName = "JVR.KeyName";
var KeyNameComp = (props) => {
  const { children: children2, value, keyName } = props;
  const isNumber2 = typeof children2 === "number";
  const style = {
    color: isNumber2 ? "var(--w-rjv-key-number, #268bd2)" : "var(--w-rjv-key-string, #002b36)"
  };
  const { KeyName: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  reset.style = { ...reset.style, ...style };
  const Elm = as || "span";
  const child = render && typeof render === "function" && render({ ...reset, children: children2 }, { value, keyName });
  if (child) return child;
  return /* @__PURE__ */ jsx18(Elm, { ...reset, children: children2 });
};
KeyNameComp.displayName = "JVR.KeyNameComp";

// src/external/react-json-view/utils/useHighlight.tsx
import { useMemo as useMemo2, useRef as useRef4, useEffect as useEffect12 } from "react";
function usePrevious(value) {
  const ref = useRef4();
  useEffect12(() => {
    ref.current = value;
  });
  return ref.current;
}
function useHighlight({ value, highlightUpdates, highlightContainer }) {
  const prevValue = usePrevious(value);
  const isHighlight = useMemo2(() => {
    if (!highlightUpdates || prevValue === void 0) return false;
    if (typeof value !== typeof prevValue) {
      return true;
    }
    if (typeof value === "number") {
      if (isNaN(value) && isNaN(prevValue)) return false;
      return value !== prevValue;
    }
    if (Array.isArray(value) !== Array.isArray(prevValue)) {
      return true;
    }
    if (typeof value === "object" || typeof value === "function") {
      return false;
    }
    if (value !== prevValue) {
      return true;
    }
  }, [highlightUpdates, value]);
  useEffect12(() => {
    if (highlightContainer && highlightContainer.current && isHighlight && "animate" in highlightContainer.current) {
      highlightContainer.current.animate(
        [{ backgroundColor: "var(--w-rjv-update-color, #ebcb8b)" }, { backgroundColor: "" }],
        {
          duration: 1e3,
          easing: "ease-in"
        }
      );
    }
  }, [isHighlight, value, highlightContainer]);
}

// src/external/react-json-view/comps/KeyValues.tsx
import { jsx as jsx19, jsxs as jsxs4 } from "react/jsx-runtime";
var KeyValues = (props) => {
  const { value, expandKey = "", level } = props;
  const expands = useExpandsStore();
  const { objectSortKeys, indentWidth, collapsed } = useStore();
  const isMyArray = Array.isArray(value);
  const isExpanded = expands[expandKey] ?? (typeof collapsed === "boolean" ? collapsed : typeof collapsed === "number" ? level > collapsed : false);
  if (isExpanded) {
    return null;
  }
  let entries = isMyArray ? Object.entries(value).map((m) => [Number(m[0]), m[1]]) : Object.entries(value);
  if (objectSortKeys) {
    entries = objectSortKeys === true ? entries.sort(([a], [b]) => typeof a === "string" && typeof b === "string" ? a.localeCompare(b) : 0) : entries.sort(
      ([a, valA], [b, valB]) => typeof a === "string" && typeof b === "string" ? objectSortKeys(a, b, valA, valB) : 0
    );
  }
  const style = {
    borderLeft: "var(--w-rjv-border-left-width, 1px) var(--w-rjv-line-style, solid) var(--w-rjv-line-color, #ebebeb)",
    paddingLeft: indentWidth,
    marginLeft: 6
  };
  return /* @__PURE__ */ jsx19("div", { className: "w-rjv-wrap", style, children: entries.map(([key, val], idx) => {
    return /* @__PURE__ */ jsx19(KeyValuesItem, { parentValue: value, keyName: key, value: val, level }, idx);
  }) });
};
KeyValues.displayName = "JVR.KeyValues";
var KayName = (props) => {
  const { keyName, value } = props;
  const { highlightUpdates } = useStore();
  const isNumber2 = typeof keyName === "number";
  const highlightContainer = useRef5(null);
  useHighlight({ value, highlightUpdates, highlightContainer });
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsxs4("span", { ref: highlightContainer, children: [
      /* @__PURE__ */ jsx19(Quote, { isNumber: isNumber2, "data-placement": "left" }),
      /* @__PURE__ */ jsx19(KeyNameComp, { keyName, value, children: keyName }),
      /* @__PURE__ */ jsx19(Quote, { isNumber: isNumber2, "data-placement": "right" })
    ] }),
    /* @__PURE__ */ jsx19(Colon, {})
  ] });
};
KayName.displayName = "JVR.KayName";
var KeyValuesItem = (props) => {
  const { keyName, value, parentValue, level = 0 } = props;
  const dispatch2 = useShowToolsDispatch();
  const subkeyid = useId();
  const isMyArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  const isMyMap = value instanceof Map;
  const isDate = value instanceof Date;
  const isUrl = value instanceof URL;
  const isMyObject = value && typeof value === "object" && !isMyArray && !isMySet && !isMyMap && !isDate && !isUrl;
  const isNested = isMyObject || isMyArray || isMySet || isMyMap;
  if (isNested) {
    const myValue = isMySet ? Array.from(value) : isMyMap ? Object.fromEntries(value) : value;
    return /* @__PURE__ */ jsx19(Container, { keyName, value: myValue, parentValue, initialValue: value, level: level + 1 });
  }
  const reset = {
    onMouseEnter: () => dispatch2({ [subkeyid]: true }),
    onMouseLeave: () => dispatch2({ [subkeyid]: false })
  };
  return /* @__PURE__ */ jsxs4("div", { className: "w-rjv-line", ...reset, children: [
    /* @__PURE__ */ jsx19(KayName, { keyName, value }),
    /* @__PURE__ */ jsx19(Value, { keyName, value, expandKey: subkeyid })
  ] });
};
KeyValuesItem.displayName = "JVR.KeyValuesItem";

// src/external/react-json-view/section/CountInfoExtra.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var CountInfoExtra = (props) => {
  const { CountInfoExtra: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "CountInfoExtra");
  return null;
};
CountInfoExtra.displayName = "JVR.CountInfoExtra";
var CountInfoExtraComps = (props) => {
  const { value = {}, keyName, ...other } = props;
  const { CountInfoExtra: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  if (!render && !reset.children) return null;
  const Elm = as || "span";
  const isRender = render && typeof render === "function";
  const elmProps = { ...reset, ...other };
  const child = isRender && render(elmProps, { value, keyName });
  if (child) return child;
  return /* @__PURE__ */ jsx20(Elm, { ...elmProps });
};
CountInfoExtraComps.displayName = "JVR.CountInfoExtraComps";

// src/external/react-json-view/section/CountInfo.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
var CountInfo = (props) => {
  const { CountInfo: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "CountInfo");
  return null;
};
CountInfo.displayName = "JVR.CountInfo";
var CountInfoComp = (props) => {
  const { value = {}, keyName, ...other } = props;
  const { displayObjectSize } = useStore();
  const { CountInfo: Comp = {} } = useSectionStore();
  if (!displayObjectSize) return null;
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  reset.style = { ...reset.style, ...props.style };
  const len = Object.keys(value).length;
  if (!reset.children) {
    reset.children = `${len} items`;
  }
  const elmProps = { ...reset, ...other };
  const isRender = render && typeof render === "function";
  const child = isRender && render({ ...elmProps, "data-length": len }, { value, keyName });
  if (child) return child;
  return /* @__PURE__ */ jsx21(Elm, { ...elmProps });
};
CountInfoComp.displayName = "JVR.CountInfoComp";

// src/external/react-json-view/section/Ellipsis.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
var Ellipsis = (props) => {
  const { Ellipsis: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "Ellipsis");
  return null;
};
Ellipsis.displayName = "JVR.Ellipsis";
var EllipsisComp = ({ isExpanded, value, keyName }) => {
  const { Ellipsis: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || "span";
  const child = render && typeof render === "function" && render({ ...reset, "data-expanded": isExpanded }, { value, keyName });
  if (child) return child;
  if (!isExpanded) return null;
  return /* @__PURE__ */ jsx22(Elm, { ...reset });
};
EllipsisComp.displayName = "JVR.EllipsisComp";

// src/external/react-json-view/comps/NestedOpen.tsx
import { jsx as jsx23, jsxs as jsxs5 } from "react/jsx-runtime";
var NestedOpen = (props) => {
  const { keyName, expandKey, initialValue, value, level } = props;
  const expands = useExpandsStore();
  const dispatchExpands = useExpandsDispatch();
  const { onExpand, collapsed } = useStore();
  const isArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  const isExpanded = expands[expandKey] ?? (typeof collapsed === "boolean" ? collapsed : typeof collapsed === "number" ? level > collapsed : false);
  const isObject = typeof value === "object";
  const click = () => {
    const opt = { expand: !isExpanded, value, keyid: expandKey, keyName };
    onExpand && onExpand(opt);
    dispatchExpands({ [expandKey]: opt.expand });
  };
  const style = { display: "inline-flex", alignItems: "center" };
  const arrowStyle = { transform: `rotate(${!isExpanded ? "0" : "-90"}deg)`, transition: "all 0.3s" };
  const len = Object.keys(value).length;
  const showArrow = len !== 0 && (isArray || isMySet || isObject);
  const reset = { style };
  if (showArrow) {
    reset.onClick = click;
  }
  return /* @__PURE__ */ jsxs5("span", { ...reset, children: [
    showArrow && /* @__PURE__ */ jsx23(Arrow, { style: arrowStyle, expandKey }),
    (keyName || typeof keyName === "number") && /* @__PURE__ */ jsx23(KayName, { keyName }),
    /* @__PURE__ */ jsx23(SetComp, { value: initialValue }),
    /* @__PURE__ */ jsx23(MapComp, { value: initialValue }),
    /* @__PURE__ */ jsx23(BracketsOpen, { isBrackets: isArray || isMySet }),
    /* @__PURE__ */ jsx23(EllipsisComp, { keyName, value, isExpanded }),
    /* @__PURE__ */ jsx23(BracketsClose, { isVisiable: isExpanded || !showArrow, isBrackets: isArray || isMySet }),
    /* @__PURE__ */ jsx23(CountInfoComp, { value, keyName }),
    /* @__PURE__ */ jsx23(CountInfoExtraComps, { value, keyName }),
    /* @__PURE__ */ jsx23(Copied, { keyName, value, expandKey })
  ] });
};
NestedOpen.displayName = "JVR.NestedOpen";

// src/external/react-json-view/Container.tsx
import { jsx as jsx24, jsxs as jsxs6 } from "react/jsx-runtime";
var Container = forwardRef((props, ref) => {
  const { className = "", children: children2, parentValue, keyid, level = 1, value, initialValue, keyName, ...elmProps } = props;
  const dispatch2 = useShowToolsDispatch();
  const subkeyid = useId2();
  const defaultClassNames = [className, "w-rjv-inner"].filter(Boolean).join(" ");
  const reset = {
    onMouseEnter: () => dispatch2({ [subkeyid]: true }),
    onMouseLeave: () => dispatch2({ [subkeyid]: false })
  };
  return /* @__PURE__ */ jsxs6("div", { className: defaultClassNames, ref, ...elmProps, ...reset, children: [
    /* @__PURE__ */ jsx24(NestedOpen, { expandKey: subkeyid, value, level, keyName, initialValue }),
    /* @__PURE__ */ jsx24(KeyValues, { expandKey: subkeyid, value, level }),
    /* @__PURE__ */ jsx24(NestedClose, { expandKey: subkeyid, value, level })
  ] });
});
Container.displayName = "JVR.Container";

// src/external/react-json-view/symbol/BraceLeft.tsx
var BraceLeft = (props) => {
  const { BraceLeft: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BraceLeft");
  return null;
};
BraceLeft.displayName = "JVR.BraceLeft";

// src/external/react-json-view/symbol/BraceRight.tsx
var BraceRight = (props) => {
  const { BraceRight: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BraceRight");
  return null;
};
BraceRight.displayName = "JVR.BraceRight";

// src/external/react-json-view/symbol/BracketsLeft.tsx
var BracketsLeft = (props) => {
  const { BracketsLeft: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BracketsLeft");
  return null;
};
BracketsLeft.displayName = "JVR.BracketsLeft";

// src/external/react-json-view/symbol/BracketsRight.tsx
var BracketsRight = (props) => {
  const { BracketsRight: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "BracketsRight");
  return null;
};
BracketsRight.displayName = "JVR.BracketsRight";

// src/external/react-json-view/symbol/Arrow.tsx
var Arrow2 = (props) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "Arrow");
  return null;
};
Arrow2.displayName = "JVR.Arrow";

// src/external/react-json-view/symbol/Colon.tsx
var Colon2 = (props) => {
  const { Colon: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "Colon");
  return null;
};
Colon2.displayName = "JVR.Colon";

// src/external/react-json-view/symbol/Quote.tsx
var Quote2 = (props) => {
  const { Quote: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "Quote");
  return null;
};
Quote2.displayName = "JVR.Quote";

// src/external/react-json-view/symbol/ValueQuote.tsx
var ValueQuote2 = (props) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, "ValueQuote");
  return null;
};
ValueQuote2.displayName = "JVR.ValueQuote";

// src/external/react-json-view/types/Bigint.tsx
var Bigint = (props) => {
  const { Bigint: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Bigint");
  return null;
};
Bigint.displayName = "JVR.Bigint";

// src/external/react-json-view/types/Date.tsx
var Date2 = (props) => {
  const { Date: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Date");
  return null;
};
Date2.displayName = "JVR.Date";

// src/external/react-json-view/types/False.tsx
var False = (props) => {
  const { False: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "False");
  return null;
};
False.displayName = "JVR.False";

// src/external/react-json-view/types/Float.tsx
var Float = (props) => {
  const { Float: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Float");
  return null;
};
Float.displayName = "JVR.Float";

// src/external/react-json-view/types/Int.tsx
var Int = (props) => {
  const { Int: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Int");
  return null;
};
Int.displayName = "JVR.Int";

// src/external/react-json-view/types/Map.tsx
var Map2 = (props) => {
  const { Map: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Map");
  return null;
};
Map2.displayName = "JVR.Map";

// src/external/react-json-view/types/Nan.tsx
var Nan = (props) => {
  const { Nan: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Nan");
  return null;
};
Nan.displayName = "JVR.Nan";

// src/external/react-json-view/types/Null.tsx
var Null = (props) => {
  const { Null: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Null");
  return null;
};
Null.displayName = "JVR.Null";

// src/external/react-json-view/types/Set.tsx
var Set2 = (props) => {
  const { Set: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Set");
  return null;
};
Set2.displayName = "JVR.Set";

// src/external/react-json-view/types/String.tsx
var StringText = (props) => {
  const { Str: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Str");
  return null;
};
StringText.displayName = "JVR.StringText";

// src/external/react-json-view/types/True.tsx
var True = (props) => {
  const { True: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "True");
  return null;
};
True.displayName = "JVR.True";

// src/external/react-json-view/types/Undefined.tsx
var Undefined = (props) => {
  const { Undefined: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Undefined");
  return null;
};
Undefined.displayName = "JVR.Undefined";

// src/external/react-json-view/types/Url.tsx
var Url = (props) => {
  const { Url: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, "Url");
  return null;
};
Url.displayName = "JVR.Url";

// src/external/react-json-view/section/Copied.tsx
var Copied2 = (props) => {
  const { Copied: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, "Copied");
  return null;
};
Copied2.displayName = "JVR.Copied";

// src/external/react-json-view/index.tsx
import { jsx as jsx25, jsxs as jsxs7 } from "react/jsx-runtime";
var JsonView = forwardRef2((props, ref) => {
  const {
    className = "",
    style,
    value,
    children: children2,
    collapsed,
    indentWidth = 15,
    displayObjectSize = true,
    shortenTextAfterLength = 20,
    highlightUpdates = true,
    enableClipboard = true,
    displayDataTypes = true,
    objectSortKeys = false,
    onExpand,
    ...elmProps
  } = props;
  const defaultStyle = {
    lineHeight: 1.4,
    fontFamily: "var(--w-rjv-font-family, Menlo, monospace)",
    color: "var(--w-rjv-color, #002b36)",
    backgroundColor: "var(--w-rjv-background-color, #00000000)",
    fontSize: 14,
    ...style
  };
  const cls = ["w-json-view-container", "w-rjv", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs7(
    Provider,
    {
      initialState: {
        value,
        objectSortKeys,
        indentWidth,
        displayObjectSize,
        collapsed,
        enableClipboard,
        shortenTextAfterLength,
        highlightUpdates,
        onExpand
      },
      initialTypes: { displayDataTypes },
      children: [
        /* @__PURE__ */ jsx25(Container, { value, ...elmProps, ref, className: cls, style: defaultStyle }),
        children2
      ]
    }
  );
});
JsonView.Bigint = Bigint;
JsonView.Date = Date2;
JsonView.False = False;
JsonView.Float = Float;
JsonView.Int = Int;
JsonView.Map = Map2;
JsonView.Nan = Nan;
JsonView.Null = Null;
JsonView.Set = Set2;
JsonView.String = StringText;
JsonView.True = True;
JsonView.Undefined = Undefined;
JsonView.Url = Url;
JsonView.ValueQuote = ValueQuote2;
JsonView.Arrow = Arrow2;
JsonView.Colon = Colon2;
JsonView.Quote = Quote2;
JsonView.Ellipsis = Ellipsis;
JsonView.BraceLeft = BraceLeft;
JsonView.BraceRight = BraceRight;
JsonView.BracketsLeft = BracketsLeft;
JsonView.BracketsRight = BracketsRight;
JsonView.Copied = Copied2;
JsonView.CountInfo = CountInfo;
JsonView.CountInfoExtra = CountInfoExtra;
JsonView.KeyName = KeyName;
JsonView.displayName = "JVR.JsonView";
var react_json_view_default = JsonView;

// src/external/react-json-view/theme/custom.tsx
var customTheme = {
  "--w-rjv-font-family": "monospace",
  "--w-rjv-color": "#E7E5E4",
  "--w-rjv-key-string": "#fff",
  "--w-rjv-background-color": "#2e3440",
  "--w-rjv-line-color": "#4c566a",
  "--w-rjv-arrow-color": "var(--w-rjv-color)",
  "--w-rjv-edit-color": "var(--w-rjv-color)",
  "--w-rjv-info-color": "#60A5FA",
  "--w-rjv-update-color": "#88c0cf75",
  "--w-rjv-copied-color": "#119cc0",
  "--w-rjv-copied-success-color": "#28a745",
  "--w-rjv-curlybraces-color": "#E7E5E4",
  "--w-rjv-colon-color": "#E7E5E4",
  "--w-rjv-brackets-color": "#E7E5E4",
  "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
  "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",
  "--w-rjv-ellipsis-color": "var(--w-rjv-color)",
  "--w-rjv-type-string-color": "#28a745",
  "--w-rjv-type-int-color": "#60A5FA",
  "--w-rjv-type-float-color": "#60A5FA",
  "--w-rjv-type-bigint-color": "#60A5FA",
  "--w-rjv-type-boolean-color": "#F43F5E",
  "--w-rjv-type-date-color": "#41a2c2",
  "--w-rjv-type-url-color": "#5e81ac",
  "--w-rjv-type-null-color": "#22D3EE",
  "--w-rjv-type-nan-color": "#60A5FA",
  "--w-rjv-type-undefined-color": "#22D3EE"
};

// src/client/components/jsonRenderer.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var isPromise = (value) => {
  return value && typeof value.then === "function";
};
var JsonRenderer = ({ data, expansionLevel }) => {
  const { settings } = useSettingsContext();
  const ref = useRef6(true);
  useEffect13(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  const originalData = useMemo3(
    () => typeof data === "string" ? data : Object.entries(data).map(([key, value]) => {
      if (isPromise(value)) {
        value.then((res) => {
          if (!ref.current) return;
          setJson((json2) => ({
            ...json2,
            [key]: res
          }));
        }).catch((e) => {
        });
        return { [key]: "Loading deferred data..." };
      }
      return { [key]: value };
    }).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {}),
    [data]
  );
  const [json, setJson] = useState5(originalData);
  useEffect13(() => {
    let mounted = true;
    if (mounted) {
      setJson(data);
    }
    return () => {
      mounted = false;
    };
  }, [data]);
  if (typeof json === "string") {
    return /* @__PURE__ */ jsx26("div", { className: "rdt-max-w-xs rdt-text-green-600", children: json });
  }
  return /* @__PURE__ */ jsx26(react_json_view_default, { highlightUpdates: true, style: customTheme, collapsed: expansionLevel ?? settings.expansionLevel, value: json });
};

// src/client/tabs/TimelineTab.tsx
import { jsx as jsx27, jsxs as jsxs8 } from "react/jsx-runtime";
var Translations = {
  REDIRECT: "Normal Page navigation",
  FETCHER_REDIRECT: "Page navigation due to fetcher",
  ACTION_REDIRECT: "Page navigation due to action",
  FORM_SUBMISSION: "Form submission",
  FETCHER_SUBMIT: "Form submission from a fetcher",
  ACTION_RESPONSE: "Action response",
  FETCHER_RESPONSE: "Fetcher action response"
};
var RedirectEventComponent = (event) => {
  return /* @__PURE__ */ jsxs8("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxs8("time", { className: "mb-2 block text-sm font-normal leading-none text-gray-500", children: [
      'Navigated to url: "',
      event.to + event.search,
      '"'
    ] }),
    /* @__PURE__ */ jsx27("p", { className: "mb-4 text-base font-normal text-gray-400", children: event.hash }),
    event.responseData && /* @__PURE__ */ jsxs8("p", { className: "mb-4 text-base font-normal text-gray-400", children: [
      "Data received:",
      /* @__PURE__ */ jsx27(JsonRenderer, { data: event.responseData })
    ] })
  ] });
};
var FormEventComponent = (event) => {
  const firstPart = event.type === "ACTION_REDIRECT" ? `Redirect from "${event.to}" to "${event.from}"` : `Submission to url: "${event.to}"`;
  const responseData = event.responseData;
  return /* @__PURE__ */ jsxs8("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxs8("time", { className: "mb-2 block text-sm font-normal leading-none text-gray-500", children: [
      firstPart,
      " | encType: ",
      event.encType,
      " ",
      "fetcherKey" in event && typeof event.fetcherKey !== "undefined" ? `| Fetcher Key: ${event.fetcherKey}` : ""
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "flex gap-8", children: [
      event.data && event.type !== "ACTION_RESPONSE" && /* @__PURE__ */ jsxs8("div", { className: "mb-4 truncate text-base font-normal text-gray-400", children: [
        "Data sent:",
        /* @__PURE__ */ jsx27(JsonRenderer, { data: event.data })
      ] }),
      responseData && /* @__PURE__ */ jsxs8("div", { className: "mb-4 truncate text-base font-normal text-gray-400", children: [
        "Server Response Data:",
        /* @__PURE__ */ jsx27(JsonRenderer, { data: responseData })
      ] })
    ] })
  ] });
};
var METHOD_COLORS = {
  GET: "GREEN",
  POST: "BLUE",
  PUT: "TEAL",
  DELETE: "RED",
  PATCH: "PURPLE"
};
var TimelineTab = () => {
  const { timeline, clearTimeline } = useTimelineContext();
  return /* @__PURE__ */ jsxs8("div", { className: "relative flex h-full flex-col overflow-y-auto p-6 px-6", children: [
    timeline.length > 0 && /* @__PURE__ */ jsx27(
      "button",
      {
        type: "button",
        onClick: () => clearTimeline(),
        className: "absolute right-3 top-0 z-20 cursor-pointer rounded-lg border border-red-500 px-3 py-1 text-sm font-semibold text-white",
        children: "Clear"
      }
    ),
    /* @__PURE__ */ jsx27("ol", { className: "relative", children: timeline.map((event) => {
      return /* @__PURE__ */ jsxs8("li", { className: "mb-2 ml-8 animate-fade-in-left", children: [
        /* @__PURE__ */ jsx27("span", { className: "absolute -left-3 mt-2 flex h-6 w-6 animate-fade-in items-center justify-center rounded-full bg-blue-900 ring-4 ring-blue-900", children: /* @__PURE__ */ jsx27(Icon, { name: "Activity" }) }),
        /* @__PURE__ */ jsxs8("h3", { className: "-mt-3 mb-1 flex items-center gap-2 text-lg font-semibold text-white", children: [
          Translations[event.type],
          event?.method && /* @__PURE__ */ jsx27(Tag, { color: METHOD_COLORS[event.method], children: event.method })
        ] }),
        event.type === "REDIRECT" || event.type === "FETCHER_REDIRECT" ? /* @__PURE__ */ jsx27(RedirectEventComponent, { ...event }) : /* @__PURE__ */ jsx27(FormEventComponent, { ...event })
      ] }, event.id);
    }) })
  ] });
};

// src/client/components/network-tracer/NetworkBar.tsx
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect as useEffect14 } from "react";
import { jsx as jsx28, jsxs as jsxs9 } from "react/jsx-runtime";
var COLORS = {
  loader: "#4ade80",
  "client-loader": "#60a5fa",
  action: "#f59e0b",
  "client-action": "#ef4444",
  "custom-event": "#ffffff",
  pending: "#94a3b8",
  error: "#dc2626"
};
var NetworkBar = ({
  request,
  index,
  minTime,
  pixelsPerMs,
  barHeight,
  barPadding,
  now: now2,
  onClick,
  isActive
}) => {
  const startX = (request.startTime - minTime) * pixelsPerMs;
  const currentEndTime = request.endTime || now2;
  const duration = currentEndTime - request.startTime;
  const y2 = index * (barHeight + barPadding) + 24;
  const state = request.endTime ? "finished" : "pending";
  const color2 = state === "pending" ? COLORS.pending : COLORS[request.aborted ? "error" : request.type];
  const barWidth = useMotionValue(2);
  useEffect14(() => {
    const updateWidth = () => {
      if (request.endTime) {
        animate(barWidth, Math.max(2, (request.endTime - request.startTime) * pixelsPerMs), {
          duration: 0.3,
          ease: "easeOut"
        });
      } else if (isActive) {
        barWidth.set(Math.max(2, (now2 - request.startTime) * pixelsPerMs));
        requestAnimationFrame(updateWidth);
      }
    };
    if (isActive) {
      requestAnimationFrame(updateWidth);
    }
    if (!isActive) {
      barWidth.stop();
    }
    return () => {
      barWidth.stop();
    };
  }, [request.endTime, request.startTime, pixelsPerMs, now2, barWidth, isActive]);
  return /* @__PURE__ */ jsxs9(
    motion.div,
    {
      style: {
        position: "absolute",
        top: y2,
        height: barHeight,
        backgroundColor: color2,
        borderRadius: "2px",
        width: barWidth,
        minWidth: "2px",
        x: startX
      },
      transition: {
        x: { duration: 0.3, ease: "easeOut" }
      },
      className: "relative overflow-hidden group cursor-pointer hover:brightness-110",
      onClick: (e) => onClick(e, request, index),
      children: [
        isActive && /* @__PURE__ */ jsx28(
          motion.div,
          {
            className: "absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20",
            animate: { x: ["-100%", "100%"] },
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "linear"
            }
          }
        ),
        /* @__PURE__ */ jsxs9("div", { className: "absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none z-10", children: [
          request.method,
          " ",
          request.url,
          /* @__PURE__ */ jsx28("br", {}),
          request.endTime ? `Duration: ${duration.toFixed(0)}ms` : `Elapsed: ${duration.toFixed(0)}ms...`
        ] })
      ]
    }
  );
};

// src/client/components/network-tracer/RequestDetails.tsx
import { jsx as jsx29, jsxs as jsxs10 } from "react/jsx-runtime";
var REQUEST_BORDER_COLORS = {
  loader: "border-green-500",
  "client-loader": "border-blue-500",
  action: "border-yellow-500",
  "client-action": "border-purple-500",
  "custom-event": "border-white",
  error: "border-red-500"
};
var RequestDetails = ({ request, onClose, total, index, onChangeRequest }) => {
  if (index === null) {
    return;
  }
  return /* @__PURE__ */ jsx29("div", { className: " w-full mt-4 bg-main rounded-lg shadow-xl p-4 z-50", children: /* @__PURE__ */ jsxs10("div", { className: "text-sm", children: [
    /* @__PURE__ */ jsxs10("div", { className: "font-bold text-lg mb-2 flex-col gap-4 w-full items-center", children: [
      /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
          request?.method && /* @__PURE__ */ jsx29(Tag, { className: "w-max", color: METHOD_COLORS[request.method], children: request.method }),
          request?.type && /* @__PURE__ */ jsx29(
            "div",
            {
              className: `w-max flex items-center rounded px-2.5 py-0.5 text-sm font-medium border ${REQUEST_BORDER_COLORS[request.type]}`,
              children: request.type
            }
          ),
          request?.aborted && /* @__PURE__ */ jsx29(
            "div",
            {
              className: `w-max flex items-center rounded px-2.5 py-0.5 text-sm font-medium border ${REQUEST_BORDER_COLORS.error}`,
              children: "Request aborted"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs10("div", { className: "flex ml-auto items-center gap-4", children: [
          /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
            index > 0 ? /* @__PURE__ */ jsx29(
              "button",
              {
                type: "button",
                onClick: () => onChangeRequest(index - 1),
                className: "text-gray-400 hover:text-white flex items-center justify-center size-8 rounded-md border border-gray-500 text-gray-500",
                children: /* @__PURE__ */ jsx29(Icon, { name: "ChevronDown", className: "rotate-90" })
              }
            ) : null,
            index < total - 1 ? /* @__PURE__ */ jsx29(
              "button",
              {
                type: "button",
                onClick: () => onChangeRequest(index + 1),
                className: "text-gray-400 hover:text-white flex items-center justify-center size-8 rounded-md border border-gray-500 text-gray-500",
                children: /* @__PURE__ */ jsx29(Icon, { name: "ChevronDown", className: "-rotate-90" })
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsx29(
            "button",
            {
              type: "button",
              className: "text-gray-400 hover:text-white flex items-center justify-center size-8 rounded-md border border-red-500 text-red-500",
              onClick: onClose,
              children: /* @__PURE__ */ jsx29(Icon, { name: "X" })
            }
          )
        ] })
      ] }),
      request.id,
      " ",
      /* @__PURE__ */ jsxs10("span", { className: "font-normal text-green-500", children: [
        "- ",
        request.url
      ] })
    ] }),
    /* @__PURE__ */ jsxs10("div", { children: [
      "Request duration: ",
      new Date(request.startTime).toLocaleTimeString(),
      " ",
      request.endTime && `- ${new Date(request.endTime).toLocaleTimeString()} `,
      request.endTime && /* @__PURE__ */ jsxs10("span", { className: "font-bold text-green-500", children: [
        "(",
        (request.endTime - request.startTime).toFixed(0),
        "ms)"
      ] })
    ] }),
    request.data && /* @__PURE__ */ jsxs10("div", { className: "mt-4 border border-gray-800 rounded-lg overflow-hidden border-2", children: [
      /* @__PURE__ */ jsx29("div", { className: "w-full px-4 py-2 bg-gray-800 text-lg", children: "Returned Data" }),
      /* @__PURE__ */ jsx29("div", { className: "p-4", children: /* @__PURE__ */ jsx29(JsonRenderer, { data: request.data }) })
    ] }),
    request.headers && Object.keys(request.headers).length > 0 && /* @__PURE__ */ jsxs10("div", { className: "mt-4 border border-gray-800 rounded-lg overflow-hidden border-2", children: [
      /* @__PURE__ */ jsx29("div", { className: "w-full px-4 py-2 bg-gray-800 text-lg", children: "Headers" }),
      /* @__PURE__ */ jsx29("div", { className: "p-4", children: /* @__PURE__ */ jsx29(JsonRenderer, { data: request.headers }) })
    ] })
  ] }) });
};

// src/client/components/network-tracer/NetworkWaterfall.tsx
import { jsx as jsx30, jsxs as jsxs11 } from "react/jsx-runtime";
var BAR_HEIGHT = 20;
var BAR_PADDING = 8;
var TIME_COLUMN_INTERVAL = 1e3;
var FUTURE_BUFFER = 1e3;
var INACTIVE_THRESHOLD = 100;
var TYPE_COLORS = {
  loader: "bg-green-500",
  "client-loader": "bg-blue-500",
  action: "bg-yellow-500",
  "client-action": "bg-purple-500",
  "custom-event": "bg-white"
};
var TYPE_TEXT_COLORS = {
  loader: "text-green-500",
  "client-loader": "text-blue-500",
  action: "text-yellow-500",
  "client-action": "text-purple-500",
  "custom-event": "text-white"
};
var NetworkWaterfall = ({ requests, width }) => {
  const containerRef = useRef7(null);
  const [scale, setScale] = useState6(0.1);
  const [isDragging, setIsDragging] = useState6(false);
  const [dragStart, setDragStart] = useState6({ x: 0, scrollLeft: 0 });
  const [selectedRequestIndex, setSelectedRequest] = useState6(null);
  const [now2, setNow] = useState6(Date.now());
  const selectedRequest = selectedRequestIndex !== null ? requests[selectedRequestIndex] : null;
  const hasActiveRequests = requests.some(
    (req) => !req.endTime || req.endTime && now2 - req.endTime < INACTIVE_THRESHOLD
  );
  useEffect15(() => {
    if (!hasActiveRequests) {
      return;
    }
    const interval2 = setInterval(() => setNow(Date.now()), 16);
    return () => clearInterval(interval2);
  }, [hasActiveRequests]);
  const minTime = Math.min(...requests.map((r) => r.startTime));
  const maxTime = hasActiveRequests ? now2 + FUTURE_BUFFER : requests.length > 0 ? Math.max(...requests.map((r) => r.endTime || r.startTime)) + 1e3 : now2;
  const duration = maxTime - minTime;
  const pixelsPerMs = scale;
  const scaledWidth = Math.max(width, duration * pixelsPerMs);
  const timeColumns = Math.ceil(duration / TIME_COLUMN_INTERVAL);
  useEffect15(() => {
    if (containerRef.current && !isDragging && hasActiveRequests) {
      const currentTimePosition = (now2 - minTime) * pixelsPerMs;
      const containerWidth = containerRef.current.clientWidth;
      const targetScroll = Math.max(0, currentTimePosition - containerWidth * 0.8);
      containerRef.current.scrollLeft = targetScroll;
    }
  }, [now2, minTime, pixelsPerMs, isDragging, hasActiveRequests]);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.pageX - (containerRef.current?.offsetLeft || 0),
      scrollLeft: containerRef.current?.scrollLeft || 0
    });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x2 = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x2 - dragStart.x) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = dragStart.scrollLeft - walk;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleBarClick = (e, request, index) => {
    setSelectedRequest(index);
  };
  const onChangeRequest = (index) => {
    setSelectedRequest(index);
  };
  const onClose = () => {
    setSelectedRequest(null);
  };
  useHotkeys("arrowleft,arrowright", (e) => {
    const order = selectedRequestIndex;
    if (order === null) {
      return onChangeRequest(0);
    }
    if (!selectedRequest) {
      return;
    }
    if (e.key === "ArrowLeft" && order > 0) {
      onChangeRequest(order - 1);
    }
    if (e.key === "ArrowRight" && order < requests.length - 1) {
      onChangeRequest(order + 1);
    }
  });
  return /* @__PURE__ */ jsxs11("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs11("div", { className: "flex", children: [
      /* @__PURE__ */ jsxs11("div", { children: [
        /* @__PURE__ */ jsx30("div", { className: "h-5 flex items-center border-b border-gray-700 mb-1   pb-2", children: "Requests" }),
        /* @__PURE__ */ jsx30("div", { style: { gap: BAR_PADDING }, className: " pr-4 flex flex-col z-50 ", children: requests.map((request, index) => /* @__PURE__ */ jsxs11(
          "div",
          {
            style: { height: BAR_HEIGHT },
            className: "flex gap-2 items-center",
            children: [
              /* @__PURE__ */ jsxs11(
                "button",
                {
                  type: "button",
                  className: `flex w-full items-center focus-visible:outline-none gap-2 px-2 py-0.5 text-md text-white border rounded ${index === selectedRequestIndex ? `${REQUEST_BORDER_COLORS[request.type]}` : "border-transparent"}`,
                  onClick: (e) => handleBarClick(e, request, index),
                  children: [
                    /* @__PURE__ */ jsx30(
                      "div",
                      {
                        "data-tooltip-id": `${request.id}${request.startTime}`,
                        "data-tooltip-html": `<div>This was triggered by ${request.type.startsWith("a") ? "an" : "a"} <span class="font-bold ${TYPE_TEXT_COLORS[request.type]}">${request.type}</span> request</div>`,
                        "data-tooltip-place": "top",
                        className: `size-2 p-1 ${TYPE_COLORS[request.type]}`
                      }
                    ),
                    /* @__PURE__ */ jsx30(Tooltip, { place: "top", id: `${request.id}${request.startTime}` }),
                    /* @__PURE__ */ jsx30("div", { className: "pr-4", children: /* @__PURE__ */ jsx30("div", { className: "whitespace-nowrap", children: request.id }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx30("div", { className: "flex items-center ml-auto", children: request?.method && /* @__PURE__ */ jsx30(Tag, { className: "!px-1 !py-0 text-[0.7rem]", color: METHOD_COLORS[request.method], children: request.method }) })
            ]
          },
          request.id + request.startTime
        )) })
      ] }),
      /* @__PURE__ */ jsx30(
        "div",
        {
          ref: containerRef,
          className: "relative overflow-x-auto scrollbar-hide flex",
          style: {
            height: Math.min(requests.length * (BAR_HEIGHT + BAR_PADDING) + 24, window.innerHeight - 200),
            cursor: isDragging ? "grabbing" : "grab"
          },
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseUp,
          children: /* @__PURE__ */ jsxs11("div", { className: "relative", style: { width: scaledWidth }, children: [
            /* @__PURE__ */ jsx30("div", { className: "absolute top-0 left-0 right-0 h-5 border-b border-gray-700", children: Array.from({ length: timeColumns }).map((_, i) => /* @__PURE__ */ jsxs11(
              "div",
              {
                className: "absolute top-0 h-full border-r-none border-t-none border-b-none !border-l border-white border-l-2 text-xs text-white ",
                style: {
                  left: i * TIME_COLUMN_INTERVAL * pixelsPerMs
                },
                children: [
                  /* @__PURE__ */ jsxs11("span", { className: "ml-1", children: [
                    i,
                    "s"
                  ] }),
                  /* @__PURE__ */ jsx30(
                    "div",
                    {
                      className: "absolute -left-[1px] border-l  stroke-5 border-dashed border-gray-700 ",
                      style: { height: BAR_HEIGHT * requests.length + 1 + (BAR_PADDING * requests.length + 1), width: 1 }
                    }
                  )
                ]
              },
              i
            )) }),
            /* @__PURE__ */ jsx30(AnimatePresence, { children: requests.map((request, index) => /* @__PURE__ */ jsx30(
              NetworkBar,
              {
                request,
                index,
                minTime,
                pixelsPerMs,
                barHeight: BAR_HEIGHT,
                barPadding: BAR_PADDING,
                now: now2,
                onClick: handleBarClick,
                isActive: hasActiveRequests
              },
              request.id + request.startTime
            )) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx30("div", { className: "w-full", children: selectedRequest && /* @__PURE__ */ jsx30(AnimatePresence, { children: /* @__PURE__ */ jsx30(
      RequestDetails,
      {
        total: requests.length,
        index: selectedRequestIndex,
        request: selectedRequest,
        onChangeRequest,
        onClose
      }
    ) }) })
  ] });
};
var NetworkWaterfall_default = NetworkWaterfall;

// src/client/components/network-tracer/NetworkPanel.tsx
import { jsx as jsx31 } from "react/jsx-runtime";
function NetworkPanel() {
  const { requests } = useRequestContext();
  const [containerWidth, setContainerWidth] = useState7(800);
  useEffect16(() => {
    const updateWidth = () => {
      const container = document.querySelector(".network-container");
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return /* @__PURE__ */ jsx31("div", { className: " text-gray-100", children: /* @__PURE__ */ jsx31("div", { className: "mx-auto p-1", children: /* @__PURE__ */ jsx31("div", { className: "bg-gray-800 rounded-lg shadow-xl overflow-hidden", children: /* @__PURE__ */ jsx31("div", { className: "border-t border-gray-700 p-4 network-container", children: /* @__PURE__ */ jsx31(NetworkWaterfall_default, { requests, width: containerWidth - 32 }) }) }) }) });
}
var NetworkPanel_default = NetworkPanel;

// src/client/tabs/NetworkTab.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
var NetworkTab = () => {
  return /* @__PURE__ */ jsx32(NetworkPanel_default, {});
};

// src/client/tabs/PageTab.tsx
import clsx6 from "clsx";
import { useMemo as useMemo4 } from "react";
import { useMatches as useMatches2, useRevalidator } from "react-router";

// src/client/components/RouteSegmentInfo.tsx
import clsx5 from "clsx";

// src/server/parser.ts
var parseCacheControlHeader = (headers) => {
  const cacheControl = headers.get("cache-control");
  if (!cacheControl) return {};
  const parts = cacheControl.split(",");
  const cacheControlObject = {};
  for (const part of parts) {
    const [key, value] = part.split("=");
    if (!key) continue;
    cacheControlObject[key.trim()] = value?.trim();
  }
  const returnValue = Object.entries(cacheControlObject).reduce((acc, [key, value]) => {
    const k = key.trim().split("-").map((k2, i) => i === 0 ? k2 : uppercaseFirstLetter(k2)).join("");
    if (!value) {
      return { ...acc, [k]: true };
    }
    return { ...acc, [k]: value };
  }, {});
  return returnValue;
};

// src/client/utils/routing.ts
function getRouteType(route) {
  if (route.id === "root") {
    return "ROOT";
  }
  if (route.index) {
    return "ROUTE";
  }
  if (!route.path) {
    return "LAYOUT";
  }
  if (!window.__reactRouterManifest) {
    return "ROUTE";
  }
  const childIndexRoute = Object.values(window.__reactRouterManifest.routes).find(
    (r) => r?.parentId === route.id && r.index
  );
  return childIndexRoute ? "LAYOUT" : "ROUTE";
}
function isLayoutRoute(route) {
  if (!route) {
    return false;
  }
  return getRouteType(route) === "LAYOUT";
}
function isLeafRoute(route) {
  return getRouteType(route) === "ROUTE";
}
var ROUTE_FILLS = {
  GREEN: "fill-green-500 text-white",
  BLUE: "fill-blue-500 text-white",
  PURPLE: "fill-purple-500 text-white"
};
function getRouteColor(route) {
  switch (getRouteType(route)) {
    case "ROOT":
      return ROUTE_FILLS.PURPLE;
    case "LAYOUT":
      return ROUTE_FILLS.BLUE;
    case "ROUTE":
      return ROUTE_FILLS.GREEN;
  }
}
var constructRoutePath = (route, routeWildcards) => {
  const hasWildcard = route.url.includes(":");
  const wildcards = routeWildcards[route.id];
  const path = route.url.split("/").map((p) => {
    if (p.startsWith(":")) {
      return wildcards?.[p] ? wildcards?.[p] : p;
    }
    return p;
  }).join("/");
  const pathToOpen = document.location.origin + (path === "/" ? path : `/${path}`);
  return { pathToOpen, path, hasWildcard };
};
var createExtendedRoutes = () => {
  if (!window.__reactRouterManifest) {
    return [];
  }
  return Object.values(window.__reactRouterManifest.routes).map((route) => {
    return {
      ...route,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      url: convertReactRouterPathToUrl(window.__reactRouterManifest.routes, route),
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      errorBoundary: findParentErrorBoundary(window.__reactRouterManifest.routes, route)
    };
  }).filter((route) => isLeafRoute(route));
};

// src/client/components/CacheInfo.tsx
import { add } from "date-fns/add";
import { formatDistance } from "date-fns/formatDistance";

// src/client/hooks/useCountdown.ts
import { useEffect as useEffect17, useState as useState8 } from "react";
var getTimeLeft = (countDown) => {
  const days = Math.floor(countDown / (1e3 * 60 * 60 * 24));
  const hours = Math.floor(countDown % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  const minutes = Math.floor(countDown % (1e3 * 60 * 60) / (1e3 * 60));
  const seconds = Math.floor(countDown % (1e3 * 60) / 1e3);
  return { days, hours, minutes, seconds };
};
var useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState8(countDownDate - (/* @__PURE__ */ new Date()).getTime());
  useEffect17(() => {
    const timeLeft2 = getTimeLeft(countDown);
    if (timeLeft2.seconds <= 0) {
      return;
    }
    const interval2 = setInterval(() => {
      setCountDown(countDownDate - (/* @__PURE__ */ new Date()).getTime());
    }, 1e3);
    return () => clearInterval(interval2);
  }, [countDownDate]);
  const timeLeft = getTimeLeft(countDown);
  const stringRepresentation = `${timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}${timeLeft.hours ? `${timeLeft.hours}h ` : ""}${timeLeft.minutes ? `${timeLeft.minutes}m ` : ""}${timeLeft.seconds ? `${timeLeft.seconds}s` : ""}`;
  return { ...timeLeft, stringRepresentation };
};

// src/client/components/CacheInfo.tsx
import { jsxs as jsxs12 } from "react/jsx-runtime";
var CacheInfo = ({ cacheDate, cacheControl }) => {
  const { maxAge, sMaxage, private: isPrivate } = cacheControl;
  const age = !isPrivate && !maxAge ? sMaxage : maxAge;
  const targetDate = add(cacheDate, { seconds: age ? Number.parseInt(age) : 0 });
  const { minutes, seconds, stringRepresentation } = useCountdown(targetDate);
  const distance = formatDistance(targetDate, cacheDate, { addSuffix: true });
  if (seconds <= 0) {
    return;
  }
  return /* @__PURE__ */ jsxs12(Tag, { color: minutes < 1 ? "RED" : "PURPLE", children: [
    "[",
    cacheControl.private ? "Private" : "Shared",
    "] Loader Cache expires ",
    distance,
    " (",
    stringRepresentation,
    ")"
  ] });
};

// src/client/components/EditorButton.tsx
import clsx3 from "clsx";
import { jsxs as jsxs13 } from "react/jsx-runtime";
var EditorButton = ({ name, onClick, ...props }) => {
  return /* @__PURE__ */ jsxs13(
    "button",
    {
      onClick,
      type: "button",
      className: clsx3(
        "flex cursor-pointer items-center gap-1 rounded border border-[#1F9CF0] px-2.5 py-0.5 text-sm font-medium text-[#1F9CF0]"
      ),
      ...props,
      children: [
        "Open in ",
        name
      ]
    }
  );
};

// src/client/components/InfoCard.tsx
import clsx4 from "clsx";
import { jsx as jsx33, jsxs as jsxs14 } from "react/jsx-runtime";
var InfoCard = ({
  children: children2,
  title,
  onClear
}) => {
  return /* @__PURE__ */ jsxs14("div", { className: "mb-4 h-min rounded-lg border-solid border-gray-500/40 text-base font-normal text-white transition-all", children: [
    /* @__PURE__ */ jsxs14(
      "h3",
      {
        className: clsx4(
          "flex min-h-[30px] items-center text-left text-sm",
          onClear ? "flex items-center justify-between gap-3" : ""
        ),
        children: [
          title,
          onClear && typeof import.meta.hot === "undefined" && /* @__PURE__ */ jsx33(
            "button",
            {
              type: "button",
              onClick: onClear,
              className: "cursor-pointer rounded bg-red-500 px-2 py-1 text-sm font-semibold text-white",
              children: "Clear"
            }
          )
        ]
      }
    ),
    children2
  ] });
};

// src/client/components/RouteSegmentInfo.tsx
import { jsx as jsx34, jsxs as jsxs15 } from "react/jsx-runtime";
var getLoaderData = (data) => {
  if (typeof data === "string") {
    try {
      const temp = JSON.parse(data);
      return JSON.stringify(temp, null, 2);
    } catch (e) {
      return data;
    }
  }
  return data;
};
var cleanupLoaderOrAction = (routeInfo) => {
  if (!Object.keys(routeInfo).length) return {};
  return {
    executionTime: `${routeInfo.executionTime}ms`,
    ...routeInfo.responseData ? { responseData: routeInfo.responseData } : {},
    ...routeInfo.requestData ? { requestData: routeInfo.requestData } : {},
    ...routeInfo.responseHeaders ? { responseHeaders: routeInfo.responseHeaders } : {},
    ...routeInfo.requestHeaders ? { requestHeaders: routeInfo.requestHeaders } : {},
    ...routeInfo.responseHeaders?.["cache-control"] && {
      cacheInfo: { ...parseCacheControlHeader(new Headers(routeInfo.responseHeaders)) }
    }
  };
};
var cleanServerInfo = (routeInfo) => {
  return {
    loaderInfo: {
      loaderTriggerCount: routeInfo.loaderTriggerCount,
      lowestExecutionTime: `${routeInfo.lowestExecutionTime}ms`,
      highestExecutionTime: `${routeInfo.highestExecutionTime}ms`,
      averageExecutionTime: `${routeInfo.averageExecutionTime}ms`,
      lastLoaderInfo: cleanupLoaderOrAction(routeInfo.lastLoader),
      lastNLoaderCalls: routeInfo.loaders?.map((loader) => cleanupLoaderOrAction(loader)).reverse()
    },
    actionInfo: {
      actionTriggerCount: routeInfo.actionTriggerCount,
      ...routeInfo.lastAction && {
        lastActionInfo: cleanupLoaderOrAction(routeInfo.lastAction)
      },
      lastNActionCalls: routeInfo.actions?.map((action) => cleanupLoaderOrAction(action)).reverse()
    },
    ...cleanupLoaderOrAction(routeInfo.lastLoader)
  };
};
var ROUTE_COLORS = {
  GREEN: "bg-green-500 ring-green-500 text-white",
  BLUE: "bg-blue-500 ring-blue-500 text-white",
  TEAL: "bg-teal-400 ring-teal-400 text-white",
  RED: "bg-red-500 ring-red-500 text-white",
  PURPLE: "bg-purple-500 ring-purple-500 text-white"
};
var RouteSegmentInfo = ({ route, i }) => {
  const { server, setServerInfo } = useServerInfo();
  const { isConnected, sendJsonMessage } = useDevServerConnection();
  const loaderData = getLoaderData(route.data);
  const serverInfo = server?.routes?.[route.id];
  const isRoot = route.id === "root";
  const { setSettings, settings } = useSettingsContext();
  const editorName = settings.editorName;
  const cacheControl = serverInfo?.lastLoader.responseHeaders ? parseCacheControlHeader(new Headers(serverInfo?.lastLoader.responseHeaders)) : void 0;
  const onHover = (path, type) => {
    if (settings.showRouteBoundariesOn === "click") {
      return;
    }
    setSettings({
      hoveredRoute: path,
      isHoveringRoute: type === "enter"
    });
  };
  const entryRoute = window.__reactRouterManifest?.routes[route.id];
  const isLayout = isLayoutRoute(entryRoute);
  const clearServerInfoForRoute = () => {
    const newServerInfo = { ...server?.routes };
    newServerInfo[route.id] = defaultServerRouteState;
    setServerInfo({ routes: newServerInfo });
  };
  return /* @__PURE__ */ jsxs15(
    "li",
    {
      "data-testid": route.id,
      onMouseEnter: () => onHover(route.id === "root" ? "root" : i.toString(), "enter"),
      onMouseLeave: () => onHover(route.id === "root" ? "root" : i.toString(), "leave"),
      className: "mb-8 ml-6 lg:ml-8",
      children: [
        /* @__PURE__ */ jsx34(
          "div",
          {
            className: clsx5(
              "absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full",
              ROUTE_COLORS[isRoot ? "PURPLE" : isLayout ? "BLUE" : "GREEN"]
            ),
            children: /* @__PURE__ */ jsx34(Icon, { name: isRoot ? "Root" : isLayout ? "Layout" : "CornerDownRight", size: "sm" })
          }
        ),
        /* @__PURE__ */ jsxs15("h2", { className: "text-md -mt-3 mb-1 text-white flex items-center justify-between gap-2 font-semibold text-white", children: [
          route.pathname,
          /* @__PURE__ */ jsxs15("div", { className: "flex gap-2", children: [
            Boolean(cacheControl && serverInfo?.lastLoader.timestamp) && /* @__PURE__ */ jsx34(
              CacheInfo,
              {
                cacheControl,
                cacheDate: new Date(serverInfo?.lastLoader.timestamp ?? "")
              },
              JSON.stringify(serverInfo?.lastLoader ?? "")
            ),
            /* @__PURE__ */ jsxs15("div", { className: "flex items-center gap-2", children: [
              isConnected && import.meta.env.DEV && /* @__PURE__ */ jsx34(
                EditorButton,
                {
                  name: editorName,
                  "data-testid": `${route.id}-open-source`,
                  onClick: () => {
                    sendJsonMessage({
                      type: "open-source",
                      data: { routeID: route.id }
                    });
                  }
                }
              ),
              settings.showRouteBoundariesOn === "click" && /* @__PURE__ */ jsx34(
                "button",
                {
                  type: "button",
                  "data-testid": `${route.id}-show-route-boundaries`,
                  className: "rounded border border-green-600 rounded border border-[#1F9CF0] px-2.5 py-0.5 text-sm font-medium text-green-600",
                  onClick: () => {
                    const routeId = route.id === "root" ? "root" : i.toString();
                    if (routeId !== settings.hoveredRoute) {
                      setSettings({
                        isHoveringRoute: false
                      });
                      setTimeout(() => {
                        setSettings({
                          hoveredRoute: routeId,
                          isHoveringRoute: true
                        });
                      });
                    } else {
                      setSettings({
                        isHoveringRoute: !settings.isHoveringRoute
                      });
                    }
                  },
                  children: "Show Route Boundary"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs15("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxs15("p", { className: "mb-2 block text-sm font-normal leading-none text-gray-500  ", children: [
            "Route segment file: ",
            route.id
          ] }),
          /* @__PURE__ */ jsxs15("div", { className: "flex flex-wrap gap-6", children: [
            loaderData && /* @__PURE__ */ jsx34(InfoCard, { title: "Returned loader data", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: loaderData }) }),
            serverInfo && import.meta.env.DEV && /* @__PURE__ */ jsx34(InfoCard, { onClear: clearServerInfoForRoute, title: "Server information", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: cleanServerInfo(serverInfo) }) }),
            route.params && Object.keys(route.params).length > 0 && /* @__PURE__ */ jsx34(InfoCard, { title: "Route params", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: route.params }) }),
            Boolean(route.handle && Object.keys(route.handle).length > 0) && /* @__PURE__ */ jsx34(InfoCard, { title: "Route handle", children: /* @__PURE__ */ jsx34(JsonRenderer, { data: route.handle }) })
          ] })
        ] })
      ]
    }
  );
};

// src/client/tabs/PageTab.tsx
import { Fragment as Fragment4, jsx as jsx35, jsxs as jsxs16 } from "react/jsx-runtime";
var PageTab = () => {
  const routes = useMatches2();
  const reversed = useMemo4(() => routes.reverse(), [routes]);
  const { revalidate, state } = useRevalidator();
  return /* @__PURE__ */ jsxs16(Fragment4, { children: [
    /* @__PURE__ */ jsxs16("div", { className: "sticky w-full top-0 z-30 mb-2 bg-[#212121] pt-2", children: [
      /* @__PURE__ */ jsxs16("div", { className: "mb-1 flex justify-between ", children: [
        /* @__PURE__ */ jsx35("div", { className: "text-lg font-semibold", children: "Active Route Segments" }),
        /* @__PURE__ */ jsx35(
          "button",
          {
            type: "button",
            onClick: () => revalidate(),
            "data-testid": "revalidate-button",
            className: clsx6(
              "z-20 cursor-pointer rounded-lg border border-green-500 px-3 py-1 text-sm font-semibold text-white",
              state !== "idle" && "pointer-events-none opacity-50"
            ),
            children: state !== "idle" ? "Revalidating..." : "Revalidate"
          }
        )
      ] }),
      /* @__PURE__ */ jsx35("hr", { className: "border-gray-700" })
    ] }),
    /* @__PURE__ */ jsx35("div", { className: "relative flex h-full flex-col p-6 px-2 pl-4 lg:px-6", children: /* @__PURE__ */ jsx35(
      "ol",
      {
        className: clsx6("relative border-l border-gray-700", state === "loading" && "pointer-events-none opacity-50"),
        children: reversed.map((route, i) => /* @__PURE__ */ jsx35(RouteSegmentInfo, { route, i }, route.id))
      }
    ) })
  ] });
};

// src/client/tabs/RoutesTab.tsx
import { useState as useState10 } from "react";
import { useMatches as useMatches3, useNavigate as useNavigate2 } from "react-router";

// src/client/components/Accordion.tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React4 from "react";
import { jsx as jsx36, jsxs as jsxs17 } from "react/jsx-runtime";
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx36(AccordionPrimitive.Item, { ref, className: cn("border-b border-b-gray-500", className), ...props }));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React4.forwardRef(({ className, children: children2, ...props }, ref) => /* @__PURE__ */ jsx36(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs17(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center w-full justify-between py-2 text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children2,
      /* @__PURE__ */ jsx36(Icon, { className: "text-white h-4 w-4 shrink-0 transition-transform duration-200", name: "ChevronDown" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React4.forwardRef(({ className, children: children2, ...props }, ref) => /* @__PURE__ */ jsx36(
  AccordionPrimitive.Content,
  {
    ref,
    className: cn(
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx36("div", { className: "pt-0", children: children2 })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// src/client/components/NewRouteForm.tsx
import clsx8 from "clsx";
import { useState as useState9 } from "react";

// src/client/components/Checkbox.tsx
import { jsx as jsx37, jsxs as jsxs18 } from "react/jsx-runtime";
var Checkbox = ({ onChange, id: id2, children: children2, value, hint, ...props }) => {
  return /* @__PURE__ */ jsxs18("div", { children: [
    /* @__PURE__ */ jsx37("label", { className: "text-md cursor-pointer", htmlFor: id2, children: /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-2 py-1", children: [
      /* @__PURE__ */ jsx37(
        "input",
        {
          value: value ? "checked" : void 0,
          checked: value,
          onChange,
          id: id2,
          type: "checkbox",
          ...props
        }
      ),
      children2
    ] }) }),
    hint && /* @__PURE__ */ jsx37("p", { className: "text-sm text-gray-500", children: hint })
  ] });
};

// src/client/components/Input.tsx
import clsx7 from "clsx";
import { jsx as jsx38, jsxs as jsxs19 } from "react/jsx-runtime";
var Label = ({ className, children: children2, ...props }) => {
  return /* @__PURE__ */ jsx38("label", { htmlFor: props.name, className: clsx7("block text-white text-sm", className), ...props, children: children2 });
};
var Hint = ({ children: children2 }) => {
  return /* @__PURE__ */ jsx38("p", { className: "text-sm text-gray-500", children: children2 });
};
var Input = ({ className, name, label, hint, ...props }) => {
  return /* @__PURE__ */ jsxs19("div", { className: "flex w-full flex-col gap-1", children: [
    label && /* @__PURE__ */ jsx38(Label, { htmlFor: name, children: label }),
    /* @__PURE__ */ jsx38(
      "input",
      {
        name,
        id: name,
        className: clsx7(
          "w-full rounded transition-all text-white border border-gray-400 hover:border-gray-400/50 bg-[#121212] px-2 py-1 text-sm",
          className
        ),
        ...props
      }
    ),
    hint && /* @__PURE__ */ jsx38(Hint, { children: hint })
  ] });
};

// src/client/components/NewRouteForm.tsx
import { jsx as jsx39, jsxs as jsxs20 } from "react/jsx-runtime";
var DEFAULT_VALUES = {
  path: "",
  loader: false,
  clientLoader: false,
  action: false,
  clientAction: false,
  headers: false,
  errorBoundary: false,
  revalidate: false,
  handler: false,
  meta: false,
  links: false
};
var NewRouteForm = () => {
  const [newRouteInfo, setNewRouteInfo] = useState9(DEFAULT_VALUES);
  const handleSubmit = () => {
    const { path, ...options } = newRouteInfo;
    import.meta.hot?.send("add-route", { type: "add-route", path, options });
  };
  const setNewInfo = (info) => {
    setNewRouteInfo({ ...newRouteInfo, ...info });
  };
  return /* @__PURE__ */ jsxs20("div", { className: "mb-2 rounded-lg border border-gray-500/20 p-2", children: [
    /* @__PURE__ */ jsx39("div", { className: "mb-2 block ", children: "Route path:" }),
    /* @__PURE__ */ jsx39(
      Input,
      {
        onBlur: () => setNewInfo({
          path: newRouteInfo.path.trim()
        }),
        onChange: (e) => setNewInfo({ path: e.target.value }),
        className: "mb-1"
      }
    ),
    /* @__PURE__ */ jsx39("span", { className: "mb-4 block text-gray-500", children: "This will be added to your routes folder under your entered name, only supports .tsx and .ts extensions, you can also emit the extension" }),
    /* @__PURE__ */ jsx39("div", { className: "mb-2 block", children: "Additional options:" }),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.loader,
        onChange: () => setNewInfo({
          loader: !newRouteInfo.loader
        }),
        id: "loader",
        children: "Add a loader"
      }
    ),
    " ",
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.clientLoader,
        onChange: () => setNewInfo({
          clientLoader: !newRouteInfo.clientLoader
        }),
        id: "clientLoader",
        children: "Add a clientLoader"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.action,
        onChange: () => setNewInfo({
          action: !newRouteInfo.action
        }),
        id: "action",
        children: "Add an action"
      }
    ),
    " ",
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.clientAction,
        onChange: () => setNewInfo({
          clientAction: !newRouteInfo.clientAction
        }),
        id: "clientAction",
        children: "Add a clientAction"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.errorBoundary,
        onChange: () => setNewInfo({
          errorBoundary: !newRouteInfo.errorBoundary
        }),
        id: "error-boundary",
        children: "Add an error boundary"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.handler,
        onChange: () => setNewInfo({
          handler: !newRouteInfo.handler
        }),
        id: "handle",
        children: "Add a handle"
      }
    ),
    /* @__PURE__ */ jsx39(Checkbox, { value: newRouteInfo.meta, onChange: () => setNewInfo({ meta: !newRouteInfo.meta }), id: "meta", children: "Add a meta export" }),
    /* @__PURE__ */ jsx39(Checkbox, { value: newRouteInfo.links, onChange: () => setNewInfo({ links: !newRouteInfo.links }), id: "links", children: "Add a links export" }),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.headers,
        onChange: () => setNewInfo({
          headers: !newRouteInfo.headers
        }),
        id: "headers",
        children: "Add a headers export"
      }
    ),
    /* @__PURE__ */ jsx39(
      Checkbox,
      {
        value: newRouteInfo.revalidate,
        onChange: () => setNewInfo({
          revalidate: !newRouteInfo.revalidate
        }),
        id: "shouldRevalidate",
        children: "Add a shouldRevalidate export"
      }
    ),
    /* @__PURE__ */ jsx39(
      "button",
      {
        onClick: handleSubmit,
        disabled: !newRouteInfo.path,
        type: "button",
        className: clsx8(
          "mr-2 mt-2 self-end text-white rounded border border-gray-400 px-2 py-1 text-sm",
          !newRouteInfo.path && "opacity-50"
        ),
        children: "Add route"
      }
    )
  ] });
};

// src/client/hooks/detached/useListenToRouteChange.ts
import { useEffect as useEffect18, useRef as useRef8 } from "react";
import { useLocation, useNavigate, useNavigation as useNavigation4 } from "react-router";
var LOCAL_STORAGE_ROUTE_KEY = "rdt_route";
var setRouteInLocalStorage = (route) => setStorageItem(LOCAL_STORAGE_ROUTE_KEY, route);
var getRouteFromLocalStorage = () => getStorageItem(LOCAL_STORAGE_ROUTE_KEY);
var useListenToRouteChange = () => {
  const { detachedWindowOwner } = useDetachedWindowControls();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation4();
  const locationRoute = location.pathname + location.search;
  const navigationRoute = (navigation.location?.pathname ?? "") + (navigation.location?.search ?? "");
  const ref = useRef8(locationRoute);
  const route = getRouteFromLocalStorage();
  useEffect18(() => {
    const { detachedWindowOwner: detachedWindowOwner2 } = detachedModeSetup();
    if (!detachedWindowOwner2) {
      return;
    }
    if (route !== locationRoute) {
      setRouteInLocalStorage(locationRoute);
    }
  }, [locationRoute, detachedWindowOwner, route]);
  useAttachListener("storage", "window", (e) => {
    if (e.key !== LOCAL_STORAGE_ROUTE_KEY) {
      return;
    }
    const route2 = getRouteFromLocalStorage();
    if (route2 && route2 !== ref.current && route2 !== navigationRoute && navigation.state === "idle") {
      ref.current = route2;
      navigate(route2);
    }
  });
};

// src/client/tabs/RoutesTab.tsx
import clsx12 from "clsx";
import Tree from "react-d3-tree";

// src/client/components/RouteInfo.tsx
import clsx9 from "clsx";
import { Link } from "react-router";
import { Fragment as Fragment5, jsx as jsx40, jsxs as jsxs21 } from "react/jsx-runtime";
var RouteInfo = ({ route, className, openNewRoute, onClose }) => {
  const { settings, setSettings } = useSettingsContext();
  const { routeWildcards, routeViewMode } = settings;
  const { hasWildcard, path, pathToOpen } = constructRoutePath(route, routeWildcards);
  const isTreeView = routeViewMode === "tree";
  const hasParentErrorBoundary = route.errorBoundary.errorBoundaryId && route.errorBoundary.errorBoundaryId !== route.id;
  const hasErrorBoundary = route.errorBoundary.hasErrorBoundary;
  return /* @__PURE__ */ jsxs21("div", { className: clsx9(className, "relative"), children: [
    isTreeView && /* @__PURE__ */ jsxs21(Fragment5, { children: [
      /* @__PURE__ */ jsx40(Icon, { onClick: onClose, className: "absolute right-2 top-2 cursor-pointer text-red-600", name: "X" }),
      /* @__PURE__ */ jsx40("h1", { className: "text-xl font-semibold", children: route.url }),
      /* @__PURE__ */ jsx40("hr", { className: "mb-4 mt-1" }),
      /* @__PURE__ */ jsxs21("h3", { children: [
        /* @__PURE__ */ jsx40("span", { className: "text-gray-500", children: "Path:" }),
        " ",
        path
      ] }),
      /* @__PURE__ */ jsxs21("h3", { children: [
        /* @__PURE__ */ jsx40("span", { className: "text-gray-500", children: "Url:" }),
        " ",
        pathToOpen
      ] })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx40("span", { className: "whitespace-nowrap text-gray-500", children: "Route file:" }),
      route.id
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "mb-4 mt-4 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx40("span", { className: "text-gray-500", children: "Components contained in the route:" }),
      /* @__PURE__ */ jsxs21("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx40(Tag, { className: "h-max", color: route.hasLoader ? "GREEN" : "RED", children: "Loader" }),
        /* @__PURE__ */ jsx40(Tag, { className: "h-max", color: route.hasAction ? "GREEN" : "RED", children: "Action" }),
        /* @__PURE__ */ jsx40(
          Tag,
          {
            className: clsx9(hasErrorBoundary && "rounded-br-none rounded-tr-none"),
            color: hasErrorBoundary ? "GREEN" : "RED",
            children: "ErrorBoundary"
          }
        )
      ] }),
      hasErrorBoundary ? /* @__PURE__ */ jsx40("div", { className: "mr-2", children: hasParentErrorBoundary ? `Covered by parent ErrorBoundary located in: ${route.errorBoundary.errorBoundaryId}` : "" }) : null
    ] }),
    hasWildcard && /* @__PURE__ */ jsxs21(Fragment5, { children: [
      /* @__PURE__ */ jsx40("p", { className: "mb-2 text-gray-500", children: "Wildcard parameters:" }),
      /* @__PURE__ */ jsx40("div", { className: clsx9("mb-4 grid w-full grid-cols-2 gap-2", isTreeView && "grid-cols-1"), children: route.url.split("/").filter((p) => p.startsWith(":")).map((param) => /* @__PURE__ */ jsxs21("div", { className: "flex w-full gap-2", children: [
        /* @__PURE__ */ jsx40(Tag, { color: "BLUE", children: param }, param),
        /* @__PURE__ */ jsx40(
          Input,
          {
            value: routeWildcards[route.id]?.[param] || "",
            onChange: (e) => setSettings({
              routeWildcards: {
                ...routeWildcards,
                [route.id]: {
                  ...routeWildcards[route.id],
                  [param]: e.target.value
                }
              }
            }),
            placeholder: param
          }
        )
      ] }, param)) })
    ] }),
    isTreeView && /* @__PURE__ */ jsx40(
      "button",
      {
        type: "button",
        className: "mr-2 whitespace-nowrap !text-white rounded border border-gray-400 px-2 py-1 text-sm",
        onClick: openNewRoute(path),
        children: /* @__PURE__ */ jsx40(Link, { className: "text-white", to: path, children: "Open in browser" })
      }
    )
  ] });
};

// src/client/components/RouteNode.tsx
import clsx10 from "clsx";
import { jsx as jsx41, jsxs as jsxs22 } from "react/jsx-runtime";
var RouteNode = ({
  nodeDatum,
  hierarchyPointNode,
  toggleNode,
  setActiveRoute,
  activeRoutes,
  navigate
}) => {
  const parent = hierarchyPointNode.parent?.data;
  const parentName = parent && parent?.name !== "/" ? parent.name : "";
  const name = nodeDatum.name.replace(parentName, "") ?? "/";
  const route = { ...nodeDatum, ...nodeDatum.attributes };
  return /* @__PURE__ */ jsxs22("g", { className: "flex", children: [
    /* @__PURE__ */ jsx41(
      "circle",
      {
        x: 20,
        onClick: toggleNode,
        className: clsx10(
          getRouteColor(route),
          "stroke-white",
          nodeDatum.__rd3t.collapsed && nodeDatum.children?.length && "fill-gray-800"
        ),
        r: 12
      }
    ),
    /* @__PURE__ */ jsx41("g", { children: /* @__PURE__ */ jsx41("foreignObject", { y: -15, x: 17, width: 110, height: 140, children: /* @__PURE__ */ jsx41(
      "p",
      {
        onClick: () => setActiveRoute(route),
        onDoubleClickCapture: () => {
          navigate(route.url);
        },
        style: { width: 100, fontSize: 14 },
        className: clsx10(
          "w-full break-all fill-white stroke-transparent",
          activeRoutes.includes(route.id) && "text-yellow-500"
        ),
        children: nodeDatum.attributes?.id === "root" ? "Root" : name ? name : "Index"
      }
    ) }) })
  ] });
};

// src/client/components/RouteToggle.tsx
import clsx11 from "clsx";
import { jsx as jsx42, jsxs as jsxs23 } from "react/jsx-runtime";
var RouteToggle = () => {
  const { settings, setSettings } = useSettingsContext();
  const { routeViewMode } = settings;
  return /* @__PURE__ */ jsxs23("div", { className: "absolute left-0 top-0 flex items-center gap-2 rounded-lg border border-white px-3 py-1", children: [
    /* @__PURE__ */ jsx42(
      Icon,
      {
        className: clsx11("h-5 w-5 hover:cursor-pointer", routeViewMode === "tree" && "text-yellow-500"),
        onClick: () => setSettings({ routeViewMode: "tree" }),
        name: "Network"
      }
    ),
    "/",
    /* @__PURE__ */ jsx42(
      Icon,
      {
        name: "List",
        className: clsx11("h-5 w-5 hover:cursor-pointer", routeViewMode === "list" && "text-yellow-500"),
        onClick: () => setSettings({ routeViewMode: "list" })
      }
    )
  ] });
};

// src/client/tabs/RoutesTab.tsx
import { jsx as jsx43, jsxs as jsxs24 } from "react/jsx-runtime";
var RoutesTab = () => {
  const matches = useMatches3();
  const navigate = useNavigate2();
  const activeRoutes = matches.map((match) => match.id);
  const { settings } = useSettingsContext();
  const { routeWildcards, routeViewMode } = settings;
  const { detachedWindow } = useDetachedWindowControls();
  const [activeRoute, setActiveRoute] = useState10(null);
  const [routes] = useState10(createExtendedRoutes());
  const [treeRoutes] = useState10(createRouteTree(window.__reactRouterManifest?.routes));
  const isTreeView = routeViewMode === "tree";
  const openNewRoute = (path) => (e) => {
    e?.preventDefault();
    navigate(path);
    if (detachedWindow) {
      setRouteInLocalStorage(path);
    }
  };
  return /* @__PURE__ */ jsxs24("div", { className: clsx12("relative h-full w-full ", !isTreeView && "pt-8"), children: [
    /* @__PURE__ */ jsx43(RouteToggle, {}),
    isTreeView ? /* @__PURE__ */ jsxs24("div", { className: "flex h-full w-full", children: [
      /* @__PURE__ */ jsx43(
        Tree,
        {
          translate: { x: window.innerWidth / 2 - (isTreeView && activeRoute ? 0 : 0), y: 30 },
          pathClassFunc: (link2) => activeRoutes.includes(link2.target.data.attributes.id) ? "stroke-yellow-500" : "stroke-gray-400",
          renderCustomNodeElement: (props) => RouteNode({
            ...props,
            routeWildcards,
            setActiveRoute,
            activeRoutes,
            navigate
          }),
          orientation: "vertical",
          data: treeRoutes
        }
      ),
      activeRoute && /* @__PURE__ */ jsx43(
        RouteInfo,
        {
          openNewRoute,
          onClose: () => setActiveRoute(null),
          route: activeRoute,
          className: "w-[600px] border-l border-l-slate-800 p-2 px-4"
        }
      )
    ] }) : /* @__PURE__ */ jsxs24(Accordion, { className: "h-full w-full overflow-y-auto pr-4", type: "single", collapsible: true, children: [
      /* @__PURE__ */ jsxs24(AccordionItem, { value: "add-new", children: [
        /* @__PURE__ */ jsx43(AccordionTrigger, { className: "text-white", children: /* @__PURE__ */ jsx43("span", { className: "text-lg font-semibold", children: "Add a new route to the project" }) }),
        /* @__PURE__ */ jsx43(AccordionContent, { children: /* @__PURE__ */ jsx43(NewRouteForm, {}) })
      ] }),
      /* @__PURE__ */ jsxs24("div", { className: "py-2", children: [
        /* @__PURE__ */ jsx43("span", { className: "text-lg font-semibold", children: "Project routes" }),
        /* @__PURE__ */ jsx43("hr", { className: "mt-2 border-gray-400" })
      ] }),
      routes?.map((route) => {
        const { path, pathToOpen } = constructRoutePath(route, routeWildcards);
        return /* @__PURE__ */ jsxs24(AccordionItem, { value: route.id, children: [
          /* @__PURE__ */ jsx43(AccordionTrigger, { children: /* @__PURE__ */ jsxs24("div", { className: "justify-center flex-wrap text-white flex px-3 lg:px-0 flex-col lg:flex-row w-full items-start lg:items-center gap-1 ", children: [
            /* @__PURE__ */ jsx43("span", { className: "text-gray-500" }),
            " ",
            route.url,
            " ",
            /* @__PURE__ */ jsxs24("div", { className: "lg:ml-auto flex-wrap flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs24("span", { className: " text-left text-xs text-gray-500", children: [
                'Url: "',
                pathToOpen,
                '"'
              ] }),
              /* @__PURE__ */ jsx43(
                "div",
                {
                  title: pathToOpen,
                  className: "mr-2  whitespace-nowrap rounded border border-gray-400 px-2 py-1 text-sm",
                  onClick: openNewRoute(path),
                  children: "Open in browser"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx43(AccordionContent, { children: /* @__PURE__ */ jsx43(RouteInfo, { openNewRoute, route }) })
        ] }, route.id);
      })
    ] })
  ] });
};

// src/client/tabs/SettingsTab.tsx
import { useState as useState11 } from "react";

// src/client/components/Select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React5 from "react";

// src/client/components/Stack.tsx
import clsx13 from "clsx";
import { jsx as jsx44 } from "react/jsx-runtime";
var GAPS = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4"
};
var Stack = ({ gap = "md", className, children: children2, ...props }) => {
  return /* @__PURE__ */ jsx44("div", { className: clsx13("flex flex-col", GAPS[gap], className), ...props, children: children2 });
};

// src/client/components/Select.tsx
import { jsx as jsx45, jsxs as jsxs25 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React5.forwardRef(({ className, children: children2, ...props }, ref) => /* @__PURE__ */ jsxs25(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "hover:border-gray-400/50 transition-all ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-8 w-full items-center justify-between rounded-md border border-gray-400 bg-[#121212] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      children2,
      /* @__PURE__ */ jsx45(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx45(Icon, { name: "ChevronDown", className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = React5.forwardRef(({ className, children: children2, position = "popper", ...props }, ref) => {
  return /* @__PURE__ */ jsx45(SelectPrimitive.Portal, { itemRef: "ref", className: "react-router-dev-tools", children: /* @__PURE__ */ jsx45(
    SelectPrimitive.Content,
    {
      ref,
      className: cn(
        "relative z-[9999] min-w-[8rem] overflow-hidden rounded-md border border-solid border-[#121212] bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: /* @__PURE__ */ jsx45(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "border border-gray-500 p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: children2
        }
      )
    }
  ) });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx45(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 font-sans text-sm", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React5.forwardRef(({ className, children: children2, ...props }, ref) => /* @__PURE__ */ jsxs25(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 font-sans text-sm outline-none hover:cursor-pointer hover:bg-[#121212] focus:bg-[#121212] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx45("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx45(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx45(Icon, { name: "Check", className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx45(SelectPrimitive.ItemText, { children: children2 })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx45(SelectPrimitive.Separator, { ref, className: cn("bg-grey-600 -mx-1 my-1 h-px", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
var SelectWithOptions = ({
  placeholder,
  label,
  options,
  onSelect,
  hint,
  value,
  className
}) => {
  return /* @__PURE__ */ jsxs25(Stack, { className, gap: "sm", children: [
    label && /* @__PURE__ */ jsx45(Label, { children: label }),
    /* @__PURE__ */ jsxs25(
      Select,
      {
        onOpenChange: () => {
          const el = document.querySelector("div[data-radix-popper-content-wrapper]");
          el?.setAttribute("class", "react-router-dev-tools");
        },
        value,
        onValueChange: onSelect,
        children: [
          /* @__PURE__ */ jsx45(SelectTrigger, { className: "w-full text-white", children: /* @__PURE__ */ jsx45(SelectValue, { placeholder }) }),
          /* @__PURE__ */ jsx45(SelectContent, { children: /* @__PURE__ */ jsxs25(SelectGroup, { children: [
            /* @__PURE__ */ jsx45(SelectLabel, { children: label }),
            options.map((option) => /* @__PURE__ */ jsx45(SelectItem, { value: option.value, children: option.label }, option.value))
          ] }) })
        ]
      }
    ),
    hint && /* @__PURE__ */ jsx45(Hint, { children: hint })
  ] });
};

// src/client/utils/string.ts
var uppercaseFirstLetter2 = (value) => value.charAt(0).toUpperCase() + value.slice(1);

// src/client/tabs/SettingsTab.tsx
import { jsx as jsx46, jsxs as jsxs26 } from "react/jsx-runtime";
var SettingsTab = () => {
  const { settings, setSettings } = useSettingsContext();
  const [minHeight, setMinHeight] = useState11(settings.minHeight.toString());
  const [maxHeight, setMaxHeight] = useState11(settings.maxHeight.toString());
  const [expansionLevel, setExpansionLevel] = useState11(settings.expansionLevel.toString());
  const [openHotkey, setOpenHotkey] = useState11(settings.openHotkey.toString());
  return /* @__PURE__ */ jsxs26(Stack, { className: "mb-4", children: [
    /* @__PURE__ */ jsxs26("h1", { children: [
      /* @__PURE__ */ jsx46("span", { className: "text-lg font-semibold", children: "Settings" }),
      /* @__PURE__ */ jsx46("hr", { className: "mt-2 border-gray-400" })
    ] }),
    /* @__PURE__ */ jsx46(
      Checkbox,
      {
        id: "defaultOpen",
        hint: "The dev tools will be open by default when you run the application and when you refresh the browser.",
        onChange: () => setSettings({ defaultOpen: !settings.defaultOpen }),
        value: settings.defaultOpen,
        children: "Open dev tools by default"
      }
    ),
    /* @__PURE__ */ jsxs26(
      Checkbox,
      {
        id: "requireUrlFlag",
        hint: `Allows you to only show rdt when there is a flag in the URL search params set. (${settings.urlFlag}=true)`,
        onChange: () => setSettings({ requireUrlFlag: !settings.requireUrlFlag }),
        value: settings.requireUrlFlag,
        children: [
          "Show dev tools only when URL flag is set ?",
          settings.urlFlag,
          "=true"
        ]
      }
    ),
    /* @__PURE__ */ jsx46(
      Checkbox,
      {
        id: "hideUntilHover",
        hint: "The dev tools trigger will be hidden on the page until you hover over it.",
        onChange: () => setSettings({ hideUntilHover: !settings.hideUntilHover }),
        value: settings.hideUntilHover,
        children: "Hide the trigger until hovered"
      }
    ),
    /* @__PURE__ */ jsx46(
      Checkbox,
      {
        id: "showBreakpointIndicator",
        hint: "Whether to show the breakpoint indicator or not",
        onChange: () => setSettings({ showBreakpointIndicator: !settings.showBreakpointIndicator }),
        value: settings.showBreakpointIndicator,
        children: "Show breakpoint indicator"
      }
    ),
    /* @__PURE__ */ jsx46(
      Checkbox,
      {
        id: "enableInspector",
        hint: "This allows you to render an inspector provided by bippy to inspect react components",
        onChange: () => setSettings({ enableInspector: !settings.enableInspector }),
        value: settings.enableInspector,
        children: "Enable react component inspector"
      }
    ),
    /* @__PURE__ */ jsx46("hr", { className: "mt-2 border-gray-700" }),
    /* @__PURE__ */ jsxs26(Stack, { gap: "lg", children: [
      settings.requireUrlFlag && /* @__PURE__ */ jsx46(
        Input,
        {
          name: "urlFlag",
          id: "urlFlag",
          label: "URL flag to use",
          hint: `This allows you to change the URL search param flag that will be used to show the dev tools when "Show dev tools only when URL flag is set" is set to true`,
          value: settings.urlFlag,
          onChange: (e) => setSettings({ urlFlag: e.target.value ?? "" }),
          onBlur: (e) => {
            setSettings({ urlFlag: e.target.value.trim() });
          }
        }
      ),
      /* @__PURE__ */ jsx46(
        Input,
        {
          name: "expansionLevel",
          id: "expansionLevel",
          label: "Depth of expansion for JSON objects",
          hint: "This allows you to change the depth of expanded properties of json objects.",
          value: expansionLevel,
          onChange: (e) => setExpansionLevel(e.target.value ?? ""),
          onBlur: (e) => {
            const value = Number.parseInt(e.target.value);
            if (value && !Number.isNaN(value) && value >= 0) {
              setSettings({ expansionLevel: value });
            }
          }
        }
      ),
      /* @__PURE__ */ jsx46(
        Input,
        {
          name: "openHotkey",
          id: "openHotkey",
          label: "Hotkey to open/close development tools",
          hint: "This allows you to change the default hotkey used to open development tools.",
          value: openHotkey,
          onChange: (e) => setOpenHotkey(e.target.value ?? ""),
          onBlur: (e) => {
            const value = e.target.value;
            if (value) {
              setSettings({ openHotkey: value });
            }
          }
        }
      ),
      /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-2 lg:flex-row", children: [
        /* @__PURE__ */ jsx46(
          Input,
          {
            name: "minHeight",
            label: "Min height of the dev tools (px)",
            hint: "The dev tools will not shrink below this height when being dragged.",
            id: "minHeight",
            value: minHeight,
            onChange: (e) => setMinHeight(e.target.value ?? ""),
            onBlur: (e) => {
              const value = Number.parseInt(e.target.value);
              if (value && !Number.isNaN(value) && value < settings.maxHeight && value > 100) {
                setSettings({ minHeight: value });
              }
            }
          }
        ),
        /* @__PURE__ */ jsx46(
          Input,
          {
            name: "maxHeight",
            id: "maxHeight",
            label: "Max height of the dev tools (px)",
            hint: "The dev tools will not expand beyond this height when being dragged.",
            value: maxHeight,
            onChange: (e) => setMaxHeight(e.target.value ?? ""),
            onBlur: (e) => {
              const value = Number.parseInt(e.target.value);
              if (value && !Number.isNaN(value) && value > settings.minHeight) {
                setSettings({ maxHeight: value });
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-2 lg:flex-row", children: [
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Trigger position",
            onSelect: (value) => setSettings({ position: value }),
            value: settings.position,
            className: "w-full",
            options: [
              { label: "Bottom Right", value: "bottom-right" },
              { label: "Bottom Left", value: "bottom-left" },
              { label: "Top Right", value: "top-right" },
              { label: "Top Left", value: "top-left" },
              { label: "Middle Right", value: "middle-right" },
              { label: "Middle Left", value: "middle-left" }
            ],
            hint: "This will determine where your trigger position on the screen is when the tools are collapsed."
          }
        ),
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Environments position",
            onSelect: (value) => setSettings({ liveUrlsPosition: value }),
            value: settings.liveUrlsPosition,
            className: "w-full",
            options: [
              { label: "Bottom Right", value: "bottom-right" },
              { label: "Bottom Left", value: "bottom-left" },
              { label: "Top Right", value: "top-right" },
              { label: "Top Left", value: "top-left" }
            ],
            hint: "This will determine where your environments position on the screen is."
          }
        ),
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Panel position",
            onSelect: (value) => setSettings({ panelLocation: value }),
            value: settings.panelLocation,
            className: "w-full",
            options: [
              { label: "Top", value: "top" },
              { label: "Bottom", value: "bottom" }
            ],
            hint: "This will determine where your panel shows up once opened"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs26("div", { className: "flex flex-col gap-2 lg:flex-row", children: [
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Route boundary gradient",
            onSelect: (value) => setSettings({ routeBoundaryGradient: value }),
            value: settings.routeBoundaryGradient,
            options: RouteBoundaryOptions.map((option) => ({
              label: uppercaseFirstLetter2(option),
              value: option
            })),
            className: "w-full",
            hint: "This will determine the look of the gradient shown for route boundaries."
          }
        ),
        /* @__PURE__ */ jsx46(
          SelectWithOptions,
          {
            label: "Show route boundaries on",
            onSelect: (value) => setSettings({ showRouteBoundariesOn: value }),
            value: settings.showRouteBoundariesOn,
            options: [
              { value: "hover", label: "Hover" },
              { value: "click", label: "Click" }
            ],
            className: "w-full",
            hint: "This will determine if the route boundaries show on hover of a route segment or clicking a button."
          }
        )
      ] })
    ] })
  ] });
};

// src/client/tabs/index.tsx
import { jsx as jsx47 } from "react/jsx-runtime";
var tabs = [
  {
    name: "Active page",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Layers" }),
    id: "page",
    component: /* @__PURE__ */ jsx47(PageTab, {}),
    hideTimeline: false
  },
  {
    name: "Routes",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "GitMerge" }),
    id: "routes",
    component: /* @__PURE__ */ jsx47(RoutesTab, {}),
    hideTimeline: false
  },
  {
    name: "Errors",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Shield" }),
    id: "errors",
    component: /* @__PURE__ */ jsx47(ErrorsTab, {}),
    hideTimeline: false
  },
  {
    name: "Network",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Network" }),
    id: "network",
    component: /* @__PURE__ */ jsx47(NetworkTab, {}),
    hideTimeline: true
  },
  {
    name: "Settings",
    icon: /* @__PURE__ */ jsx47(Icon, { size: "md", name: "Settings" }),
    id: "settings",
    component: /* @__PURE__ */ jsx47(SettingsTab, {}),
    hideTimeline: false
  }
];

// src/client/hooks/useTabs.ts
var shouldHideTimeline = (activeTab, tab, settings) => {
  if (activeTab === "routes" && settings.routeViewMode === "tree") return true;
  return tab?.hideTimeline;
};
var useTabs = (pluginsArray) => {
  const { settings } = useSettingsContext();
  const { activeTab } = settings;
  const plugins = pluginsArray?.map((plugin) => typeof plugin === "function" ? plugin() : plugin);
  const allTabs = useMemo5(() => [...tabs, ...plugins ? plugins : []], [plugins]);
  const { Component, hideTimeline } = useMemo5(() => {
    const tab = allTabs.find((tab2) => tab2.id === activeTab);
    return { Component: tab?.component, hideTimeline: shouldHideTimeline(activeTab, tab, settings) };
  }, [activeTab, allTabs, settings]);
  return {
    visibleTabs: allTabs,
    Component,
    allTabs,
    hideTimeline,
    activeTab,
    isPluginTab: !tabs.find((tab) => activeTab === tab.id)
  };
};

// src/client/layout/ContentPanel.tsx
import { jsx as jsx48, jsxs as jsxs27 } from "react/jsx-runtime";
var ContentPanel = ({ plugins }) => {
  const { Component, hideTimeline, isPluginTab, activeTab } = useTabs(plugins);
  return /* @__PURE__ */ jsxs27("div", { className: "flex h-full w-full overflow-y-hidden", children: [
    /* @__PURE__ */ jsx48(
      "div",
      {
        className: clsx14(
          "z-20 h-full w-full overflow-y-auto overflow-x-hidden bg-main px-1 lg:px-4 pt-3 pb-4 ",
          isPluginTab && "unset",
          activeTab === "page" && "!pt-0"
        ),
        children: Component
      }
    ),
    !hideTimeline && /* @__PURE__ */ jsxs27(Fragment6, { children: [
      /* @__PURE__ */ jsx48("div", { className: "w-1 bg-gray-500/20" }),
      /* @__PURE__ */ jsx48("div", { className: clsx14("z-10 hidden lg:block h-full w-1/3 p-2"), children: /* @__PURE__ */ jsx48(TimelineTab, {}) })
    ] })
  ] });
};

// src/client/layout/MainPanel.tsx
import clsx15 from "clsx";
import { useState as useState13 } from "react";

// src/client/hooks/useDebounce.ts
import React6 from "react";
function debounce(func, timeout2 = 300) {
  let timer2;
  return (...args) => {
    clearTimeout(timer2);
    timer2 = setTimeout(() => {
      func.apply(this, args);
    }, timeout2);
  };
}
function useDebounce(callback, delay = 300) {
  const callbackRef = React6.useRef(callback);
  React6.useEffect(() => {
    callbackRef.current = callback;
  });
  return React6.useMemo(() => debounce((...args) => callbackRef.current(...args), delay), [delay]);
}

// src/client/hooks/useResize.ts
import { useCallback as useCallback5, useEffect as useEffect20, useState as useState12 } from "react";
var useResize = () => {
  const { setSettings, settings } = useSettingsContext();
  const { height, maxHeight, minHeight, panelLocation } = settings;
  const [isResizing, setIsResizing] = useState12(false);
  const enableResize = useCallback5(() => {
    setIsResizing(true);
  }, [setIsResizing]);
  const disableResize = useCallback5(() => {
    setIsResizing(false);
  }, [setIsResizing]);
  const resize = useCallback5(
    (e) => {
      if (isResizing) {
        window.getSelection()?.removeAllRanges();
        const newHeight = panelLocation === "top" ? e.clientY : window.innerHeight - e.clientY;
        if (newHeight > maxHeight) {
          setSettings({ height: maxHeight });
          return;
        }
        if (newHeight < minHeight) {
          setSettings({ height: minHeight });
          return;
        }
        setSettings({ height: newHeight });
      }
    },
    [isResizing, maxHeight, minHeight, setSettings, panelLocation]
  );
  useEffect20(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);
    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);
  return { height, enableResize, disableResize, isResizing };
};

// src/client/layout/MainPanel.tsx
import { jsx as jsx49, jsxs as jsxs28 } from "react/jsx-runtime";
var useResizeDetachedPanel = () => {
  const { isDetached } = useDetachedWindowControls();
  const [state, setState] = useState13(0);
  const debounce2 = useDebounce(() => {
    setState(state + 1);
  });
  useAttachWindowListener("resize", debounce2, isDetached);
};
var MainPanel = ({ children: children2, isOpen, isEmbedded = false, className }) => {
  const { settings } = useSettingsContext();
  const { detachedWindow } = useDetachedWindowControls();
  const { height, panelLocation } = settings;
  const { enableResize, disableResize, isResizing } = useResize();
  useResizeDetachedPanel();
  return /* @__PURE__ */ jsxs28(
    "div",
    {
      "data-testid": "react-router-devtools-main-panel",
      style: {
        zIndex: 9998,
        ...!isEmbedded && { height: detachedWindow ? window.innerHeight : height }
      },
      className: clsx15(
        "duration-600 box-border flex w-screen flex-col overflow-auto bg-main text-white opacity-0 transition-all",
        isOpen ? "opacity-100 drop-shadow-2xl" : "!h-0",
        isResizing && "cursor-grabbing ",
        !isEmbedded ? `fixed left-0 ${panelLocation === "bottom" ? "bottom-0" : "top-0 border-b-2 border-main"}` : "",
        className
      ),
      children: [
        panelLocation === "bottom" && /* @__PURE__ */ jsx49(
          "div",
          {
            onMouseDown: enableResize,
            onMouseUp: disableResize,
            className: clsx15("absolute z-50 h-1 w-full", isResizing ? "cursor-grabbing" : "cursor-ns-resize")
          }
        ),
        children2,
        panelLocation === "top" && /* @__PURE__ */ jsx49(
          "div",
          {
            onMouseDown: enableResize,
            onMouseUp: disableResize,
            className: clsx15("absolute bottom-0 z-50 h-1 w-full", isResizing ? "cursor-grabbing" : "cursor-ns-resize")
          }
        )
      ]
    }
  );
};

// src/client/layout/Tabs.tsx
import clsx16 from "clsx";

// src/client/hooks/useHorizontalScroll.ts
import { useEffect as useEffect21, useRef as useRef9 } from "react";
var useHorizontalScroll = () => {
  const ref = useRef9(null);
  useEffect21(() => {
    const elem = ref.current;
    const onWheel = (ev) => {
      if (!elem || ev.deltaY === 0) return;
      elem.scrollTo({
        left: elem.scrollLeft + ev.deltaY,
        behavior: "smooth"
      });
    };
    elem?.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      elem?.removeEventListener("wheel", onWheel);
    };
  }, []);
  return ref;
};

// src/client/layout/Tabs.tsx
import { Fragment as Fragment7, jsx as jsx50, jsxs as jsxs29 } from "react/jsx-runtime";
var Tab = ({
  tab,
  activeTab,
  className,
  onClick
}) => {
  const { setSettings } = useSettingsContext();
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: ignored
    /* @__PURE__ */ jsxs29(
      "div",
      {
        "data-testid": tab.id,
        onClick: () => onClick ? onClick() : setSettings({ activeTab: tab.id }),
        className: clsx16(
          "group relative flex shrink-0 cursor-pointer items-center justify-center border-0 border-b border-solid border-b-[#212121] border-r-[#212121] p-2 font-sans transition-all",
          activeTab !== tab.id && "hover:bg-[#212121]",
          activeTab === tab.id && "bg-[#212121]",
          "hover:bg-[#212121]/50"
        ),
        children: [
          /* @__PURE__ */ jsx50("div", { className: clsx16(className, "group-hover:opacity-80 transition-all"), children: tab.icon }),
          /* @__PURE__ */ jsx50(
            "div",
            {
              className: clsx16(
                "duration-400 invisible text-white opacity-0 transition after:absolute after:-left-2 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:-rotate-90 after:border-x-4 after:border-b-[6px] after:border-x-transparent after:border-b-gray-700 group-hover:visible",
                "absolute left-full z-50 ml-2 whitespace-nowrap rounded border border-gray-700 bg-gray-800 px-2 group-hover:opacity-100"
              ),
              children: tab.name
            }
          )
        ]
      }
    )
  );
};
var Tabs = ({ plugins, setIsOpen }) => {
  const { settings } = useSettingsContext();
  const { htmlErrors } = useHtmlErrors();
  const { setPersistOpen } = usePersistOpen();
  const { activeTab } = settings;
  const { visibleTabs } = useTabs(plugins);
  const scrollRef = useHorizontalScroll();
  const { setDetachedWindowOwner, detachedWindowOwner, detachedWindow } = useDetachedWindowControls();
  const handleDetachment = () => {
    const rdtWindow = window.open(
      window.location.href,
      "",
      `popup,width=${window.innerWidth},height=${settings.height},top=${window.screen.height},left=${window.screenLeft}}`
    );
    if (rdtWindow) {
      setDetachedWindowOwner(true);
      setStorageItem(REACT_ROUTER_DEV_TOOLS_IS_DETACHED, "true");
      setSessionItem(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER, "true");
      rdtWindow.RDT_MOUNTED = true;
    }
  };
  const getErrorCount = () => {
    return htmlErrors.length + (window.HYDRATION_OVERLAY.ERROR ? 1 : 0);
  };
  const hasErrors = getErrorCount() > 0;
  return /* @__PURE__ */ jsx50("div", { className: "relative flex h-full bg-gray-800", children: /* @__PURE__ */ jsxs29("div", { ref: scrollRef, className: "react-router-dev-tools-tab  flex h-full w-full flex-col", children: [
    visibleTabs.map((tab) => /* @__PURE__ */ jsx50(
      Tab,
      {
        tab: {
          ...tab,
          name: tab.id === "errors" && hasErrors ? `Errors (${getErrorCount()})` : tab.name
        },
        activeTab,
        className: clsx16(
          "cursor-pointer",
          tab.id === "errors" && activeTab !== "errors" && hasErrors && "animate-pulse font-bold text-red-600 duration-1000"
        )
      },
      tab.id
    )),
    /* @__PURE__ */ jsx50("div", { className: clsx16("mt-auto flex w-full flex-col items-center"), children: !detachedWindow && setIsOpen && /* @__PURE__ */ jsxs29(Fragment7, { children: [
      !detachedWindowOwner && /* @__PURE__ */ jsx50(
        Tab,
        {
          className: "transition-all hover:text-green-600",
          tab: {
            icon: /* @__PURE__ */ jsx50(Icon, { name: "CopySlash", size: "md", onClick: handleDetachment }),
            id: "detach",
            name: "Detach",
            hideTimeline: false,
            component: /* @__PURE__ */ jsx50(Fragment7, {})
          }
        }
      ),
      /* @__PURE__ */ jsx50(
        Tab,
        {
          className: "hover:text-red-600",
          tab: {
            icon: /* @__PURE__ */ jsx50(Icon, { name: "X", size: "md" }),
            id: "close",
            name: "Close",
            hideTimeline: false,
            component: /* @__PURE__ */ jsx50(Fragment7, {})
          },
          onClick: () => {
            setPersistOpen(false);
            setIsOpen(false);
          }
        }
      )
    ] }) })
  ] }) });
};

// src/client/embedded-dev-tools.tsx
import { jsx as jsx51, jsxs as jsxs30 } from "react/jsx-runtime";
var Embedded = ({ plugins: pluginArray, mainPanelClassName, className }) => {
  useTimelineHandler();
  useReactTreeListeners();
  useSetRouteBoundaries();
  const { settings } = useSettingsContext();
  const { position } = settings;
  const leftSideOriented = position.includes("left");
  const url = useLocation2().search;
  const plugins = pluginArray?.map((plugin) => typeof plugin === "function" ? plugin() : plugin);
  if (settings.requireUrlFlag && !url.includes(settings.urlFlag)) return null;
  return /* @__PURE__ */ jsx51("div", { id: REACT_ROUTER_DEV_TOOLS, className: clsx17("react-router-dev-tools react-router-dev-tools-reset", className), children: /* @__PURE__ */ jsxs30(MainPanel, { className: mainPanelClassName, isEmbedded: true, isOpen: true, children: [
    /* @__PURE__ */ jsx51(Tabs, { plugins }),
    /* @__PURE__ */ jsx51(ContentPanel, { leftSideOriented, plugins })
  ] }) });
};
var hydrating = true;
function useHydrated() {
  const [hydrated, setHydrated] = useState14(() => !hydrating);
  useEffect22(function hydrate() {
    hydrating = false;
    setHydrated(true);
  }, []);
  return hydrated;
}
var EmbeddedDevTools = ({ plugins, mainPanelClassName, className }) => {
  const hydrated = useHydrated();
  if (!hydrated) return null;
  return /* @__PURE__ */ jsx51(RDTContextProvider, { children: /* @__PURE__ */ jsx51(Embedded, { mainPanelClassName, className, plugins }) });
};

// src/client/init/root.tsx
import { useEffect as useEffect27, useState as useState19 } from "react";
import { createPortal } from "react-dom";

// src/client/react-router-dev-tools.tsx
import { useEffect as useEffect26, useState as useState18 } from "react";
import { useLocation as useLocation4 } from "react-router";

// src/client/components/Trigger.tsx
import clsx18 from "clsx";

// src/client/components/Logo.tsx
import { jsx as jsx52, jsxs as jsxs31 } from "react/jsx-runtime";
var Logo = ({ className, style }) => {
  return /* @__PURE__ */ jsxs31("svg", { style, className, viewBox: "0 0 602 360", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx52("title", { children: "Logo" }),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M481.36 180C481.36 196.572 474.638 211.572 463.757 222.42C452.875 233.28 437.845 240 421.24 240C404.635 240 389.605 246.708 378.735 257.568C367.853 268.428 361.12 283.428 361.12 300C361.12 316.572 354.398 331.572 343.517 342.42C332.635 353.28 317.605 360 301 360C284.395 360 269.365 353.28 258.495 342.42C247.613 331.572 240.88 316.572 240.88 300C240.88 283.428 247.613 268.428 258.495 257.568C269.365 246.708 284.395 240 301 240C317.605 240 332.635 233.28 343.517 222.42C354.398 211.572 361.12 196.572 361.12 180C361.12 146.856 334.21 120 301 120C284.395 120 269.365 113.28 258.495 102.42C247.613 91.572 240.88 76.572 240.88 60C240.88 43.428 247.613 28.428 258.495 17.568C269.365 6.708 284.395 0 301 0C334.21 0 361.12 26.856 361.12 60C361.12 76.572 367.853 91.572 378.735 102.42C389.605 113.28 404.635 120 421.24 120C454.45 120 481.36 146.856 481.36 180Z",
        fill: "#F44250"
      }
    ),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M240.88 180C240.88 146.862 213.963 120 180.76 120C147.557 120 120.64 146.862 120.64 180C120.64 213.137 147.557 240 180.76 240C213.963 240 240.88 213.137 240.88 180Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M120.64 300C120.64 266.863 93.7233 240 60.5199 240C27.3165 240 0.399902 266.863 0.399902 300C0.399902 333.138 27.3165 360 60.5199 360C93.7233 360 120.64 333.138 120.64 300Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsx52(
      "path",
      {
        d: "M601.6 300C601.6 266.863 574.683 240 541.48 240C508.277 240 481.36 266.863 481.36 300C481.36 333.138 508.277 360 541.48 360C574.683 360 601.6 333.138 601.6 300Z",
        fill: "white"
      }
    )
  ] });
};

// src/client/components/Trigger.tsx
import { jsx as jsx53 } from "react/jsx-runtime";
var Trigger3 = ({
  isOpen,
  setIsOpen
}) => {
  const { settings } = useSettingsContext();
  const { setPersistOpen } = usePersistOpen();
  const { hideUntilHover, position } = settings;
  const handleHover = (e, event) => {
    if (!hideUntilHover) return;
    const classesToRemove = "opacity-0";
    const classesToAdd = "opacity-100";
    if (event === "enter") {
      e.currentTarget.classList.remove(classesToRemove);
      e.currentTarget.classList.add(classesToAdd);
    }
    if (event === "leave") {
      e.currentTarget.classList.remove(classesToAdd);
      e.currentTarget.classList.add(classesToRemove);
    }
  };
  return /* @__PURE__ */ jsx53(
    "button",
    {
      type: "button",
      "data-testid": "react-router-devtools-trigger",
      style: { zIndex: 9999 },
      onClick: () => {
        setIsOpen(!isOpen);
        setPersistOpen(!isOpen);
      },
      onMouseEnter: (e) => handleHover(e, "enter"),
      onMouseLeave: (e) => handleHover(e, "leave"),
      className: clsx18(
        "fixed m-1.5 h-14 w-14 cursor-pointer p-2 bg-main flex items-center justify-center rounded-full transition-all ",
        "hover:cursor-pointer hover:ring-2 hover:ring-offset-2 ring-[#212121]",
        hideUntilHover && "opacity-0",
        position === "bottom-right" && "bottom-0 right-0",
        position === "bottom-left" && "bottom-0 left-0",
        position === "top-right" && "right-0 top-0",
        position === "top-left" && "left-0 top-0",
        position === "middle-right" && "right-0 top-1/2 -translate-y-1/2",
        position === "middle-left" && "left-0 top-1/2 -translate-y-1/2",
        isOpen && "hidden"
        // Hide the button when the dev tools is open
      ),
      children: /* @__PURE__ */ jsx53(
        Logo,
        {
          className: clsx18(
            "focus:outline-none w-full h-full -mt-1 rounded-full transition-all duration-200 overflow-visible"
          )
        }
      )
    }
  );
};

// src/client/hooks/detached/useCheckIfStillDetached.ts
import { useCallback as useCallback6, useContext as useContext9, useEffect as useEffect23, useState as useState15 } from "react";
var useCheckIfStillDetached = () => {
  const { dispatch: dispatch2 } = useContext9(RDTContext);
  const [checking, setChecking] = useState15(false);
  const isDetached = getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_IS_DETACHED);
  useEffect23(() => {
    if (!checking || !isDetached) {
      return;
    }
    const isNotDetachedAnymore = getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED);
    if (isNotDetachedAnymore) {
      setStorageItem(REACT_ROUTER_DEV_TOOLS_IS_DETACHED, "false");
      setStorageItem(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED, "false");
      sessionStorage.removeItem(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER);
      sessionStorage.removeItem(REACT_ROUTER_DEV_TOOLS_DETACHED);
      const state = getExistingStateFromStorage();
      dispatch2({ type: "SET_WHOLE_STATE", payload: state });
      setChecking(false);
    }
  }, [checking, dispatch2, isDetached]);
  const checkDetachment = useCallback6(
    (e) => {
      if (e.key !== REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED) {
        return;
      }
      const shouldCheckDetached = getBooleanFromStorage(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED);
      if (shouldCheckDetached && !checking) {
        setTimeout(() => setChecking(true), 200);
      }
    },
    [checking]
  );
  useEffect23(() => {
    if (checking || !isDetached) {
      return;
    }
    addEventListener("storage", checkDetachment);
    return () => removeEventListener("storage", checkDetachment);
  }, [checking, isDetached, checkDetachment]);
};

// src/client/hooks/detached/useResetDetachmentCheck.ts
var useResetDetachmentCheck = () => {
  const { isDetached } = useDetachedWindowControls();
  useCheckIfStillDetached();
  useAttachListener("unload", "window", () => setStorageItem(REACT_ROUTER_DEV_TOOLS_CHECK_DETACHED, "true"), isDetached);
};

// src/client/hooks/detached/useSyncStateWhenDetached.ts
var refreshRequiredKeys = [REACT_ROUTER_DEV_TOOLS_SETTINGS, REACT_ROUTER_DEV_TOOLS_STATE];
var useSyncStateWhenDetached = () => {
  const { dispatch: dispatch2, state } = useRDTContext();
  useAttachListener("storage", "window", (e) => {
    if (!state.detachedWindow && !state.detachedWindowOwner) {
      return;
    }
    if (!refreshRequiredKeys.includes(e.key)) {
      return;
    }
    if (e.key === REACT_ROUTER_DEV_TOOLS_SETTINGS) {
      const oldSettings = JSON.stringify(state.settings);
      if (oldSettings === e.newValue) {
        return;
      }
    }
    if (e.key === REACT_ROUTER_DEV_TOOLS_STATE) {
      const { settings, ...rest } = state;
      const oldState = JSON.stringify(rest);
      if (oldState === e.newValue) {
        return;
      }
    }
    const newState = getExistingStateFromStorage();
    dispatch2({ type: "SET_WHOLE_STATE", payload: newState });
  });
};

// node_modules/bippy/dist/inspect.js
import React17, { createContext as createContext9, memo, Children, useContext as useContext10, useCallback as useCallback7, useState as useState16, useLayoutEffect, useRef as useRef10, useMemo as useMemo6, useEffect as useEffect24 } from "react";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(!mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var require_is_object = __commonJS({
  "node_modules/is-object/index.js"(exports, module) {
    module.exports = function isObject(x2) {
      return typeof x2 === "object" && x2 !== null;
    };
  }
});
var require_is_window = __commonJS({
  "node_modules/is-window/index.js"(exports, module) {
    module.exports = function(obj) {
      if (obj == null) {
        return false;
      }
      var o = Object(obj);
      return o === o.window;
    };
  }
});
var require_is_dom = __commonJS({
  "node_modules/is-dom/index.js"(exports, module) {
    var isObject = require_is_object();
    var isWindow = require_is_window();
    function isNode(val) {
      if (!isObject(val) || !isWindow(window) || typeof window.Node !== "function") {
        return false;
      }
      return typeof val.nodeType === "number" && typeof val.nodeName === "string";
    }
    module.exports = isNode;
  }
});
var themes_exports = {};
__export(themes_exports, {
  chromeDark: () => theme,
  chromeLight: () => theme2
});
var theme = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
  BASE_COLOR: "rgb(213, 213, 213)",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
  OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",
  HTML_TAG_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
  HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "rgb(145, 145, 145)",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
  TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
  TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
  TABLE_SORT_ICON_COLOR: "black",
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
};
var theme2 = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "white",
  BASE_COLOR: "black",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
  OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(13, 34, 170)",
  HTML_TAG_COLOR: "rgb(168, 148, 166)",
  HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
  HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "#6e6e6e",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "#aaa",
  TABLE_TH_BACKGROUND_COLOR: "#eee",
  TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
  TABLE_SORT_ICON_COLOR: "#6e6e6e",
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
};
var ExpandedPathsContext = createContext9([{}, () => {
}]);
var unselectable = {
  WebkitTouchCallout: "none",
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  OUserSelect: "none",
  userSelect: "none"
};
var createTheme = (theme32) => ({
  DOMNodePreview: {
    htmlOpenTag: {
      base: {
        color: theme32.HTML_TAG_COLOR
      },
      tagName: {
        color: theme32.HTML_TAGNAME_COLOR,
        textTransform: theme32.HTML_TAGNAME_TEXT_TRANSFORM
      },
      htmlAttributeName: {
        color: theme32.HTML_ATTRIBUTE_NAME_COLOR
      },
      htmlAttributeValue: {
        color: theme32.HTML_ATTRIBUTE_VALUE_COLOR
      }
    },
    htmlCloseTag: {
      base: {
        color: theme32.HTML_TAG_COLOR
      },
      offsetLeft: {
        marginLeft: -theme32.TREENODE_PADDING_LEFT
      },
      tagName: {
        color: theme32.HTML_TAGNAME_COLOR,
        textTransform: theme32.HTML_TAGNAME_TEXT_TRANSFORM
      }
    },
    htmlComment: {
      color: theme32.HTML_COMMENT_COLOR
    },
    htmlDoctype: {
      color: theme32.HTML_DOCTYPE_COLOR
    }
  },
  ObjectPreview: {
    objectDescription: {
      fontStyle: "italic"
    },
    preview: {
      fontStyle: "italic"
    },
    arrayMaxProperties: theme32.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES,
    objectMaxProperties: theme32.OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES
  },
  ObjectName: {
    base: {
      color: theme32.OBJECT_NAME_COLOR
    },
    dimmed: {
      opacity: 0.6
    }
  },
  ObjectValue: {
    objectValueNull: {
      color: theme32.OBJECT_VALUE_NULL_COLOR
    },
    objectValueUndefined: {
      color: theme32.OBJECT_VALUE_UNDEFINED_COLOR
    },
    objectValueRegExp: {
      color: theme32.OBJECT_VALUE_REGEXP_COLOR
    },
    objectValueString: {
      color: theme32.OBJECT_VALUE_STRING_COLOR
    },
    objectValueSymbol: {
      color: theme32.OBJECT_VALUE_SYMBOL_COLOR
    },
    objectValueNumber: {
      color: theme32.OBJECT_VALUE_NUMBER_COLOR
    },
    objectValueBoolean: {
      color: theme32.OBJECT_VALUE_BOOLEAN_COLOR
    },
    objectValueFunctionPrefix: {
      color: theme32.OBJECT_VALUE_FUNCTION_PREFIX_COLOR,
      fontStyle: "italic"
    },
    objectValueFunctionName: {
      fontStyle: "italic"
    }
  },
  TreeView: {
    treeViewOutline: {
      padding: 0,
      margin: 0,
      listStyleType: "none"
    }
  },
  TreeNode: {
    treeNodeBase: {
      color: theme32.BASE_COLOR,
      backgroundColor: theme32.BASE_BACKGROUND_COLOR,
      lineHeight: theme32.TREENODE_LINE_HEIGHT,
      cursor: "default",
      boxSizing: "border-box",
      listStyle: "none",
      fontFamily: theme32.TREENODE_FONT_FAMILY,
      fontSize: theme32.TREENODE_FONT_SIZE
    },
    treeNodePreviewContainer: {},
    treeNodePlaceholder: {
      whiteSpace: "pre",
      fontSize: theme32.ARROW_FONT_SIZE,
      marginRight: theme32.ARROW_MARGIN_RIGHT,
      ...unselectable
    },
    treeNodeArrow: {
      base: {
        color: theme32.ARROW_COLOR,
        display: "inline-block",
        fontSize: theme32.ARROW_FONT_SIZE,
        marginRight: theme32.ARROW_MARGIN_RIGHT,
        ...parseFloat(theme32.ARROW_ANIMATION_DURATION) > 0 ? {
          transition: `transform ${theme32.ARROW_ANIMATION_DURATION} ease 0s`
        } : {},
        ...unselectable
      },
      expanded: {
        WebkitTransform: "rotateZ(90deg)",
        MozTransform: "rotateZ(90deg)",
        transform: "rotateZ(90deg)"
      },
      collapsed: {
        WebkitTransform: "rotateZ(0deg)",
        MozTransform: "rotateZ(0deg)",
        transform: "rotateZ(0deg)"
      }
    },
    treeNodeChildNodesContainer: {
      margin: 0,
      paddingLeft: theme32.TREENODE_PADDING_LEFT
    }
  },
  TableInspector: {
    base: {
      color: theme32.BASE_COLOR,
      position: "relative",
      border: `1px solid ${theme32.TABLE_BORDER_COLOR}`,
      fontFamily: theme32.BASE_FONT_FAMILY,
      fontSize: theme32.BASE_FONT_SIZE,
      lineHeight: "120%",
      boxSizing: "border-box",
      cursor: "default"
    }
  },
  TableInspectorHeaderContainer: {
    base: {
      top: 0,
      height: "17px",
      left: 0,
      right: 0,
      overflowX: "hidden"
    },
    table: {
      tableLayout: "fixed",
      borderSpacing: 0,
      borderCollapse: "separate",
      height: "100%",
      width: "100%",
      margin: 0
    }
  },
  TableInspectorDataContainer: {
    tr: {
      display: "table-row"
    },
    td: {
      boxSizing: "border-box",
      border: "none",
      height: "16px",
      verticalAlign: "top",
      padding: "1px 4px",
      WebkitUserSelect: "text",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      lineHeight: "14px"
    },
    div: {
      position: "static",
      top: "17px",
      bottom: 0,
      overflowY: "overlay",
      transform: "translateZ(0)",
      left: 0,
      right: 0,
      overflowX: "hidden"
    },
    table: {
      positon: "static",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      borderTop: "0 none transparent",
      margin: 0,
      backgroundImage: theme32.TABLE_DATA_BACKGROUND_IMAGE,
      backgroundSize: theme32.TABLE_DATA_BACKGROUND_SIZE,
      tableLayout: "fixed",
      borderSpacing: 0,
      borderCollapse: "separate",
      width: "100%",
      fontSize: theme32.BASE_FONT_SIZE,
      lineHeight: "120%"
    }
  },
  TableInspectorTH: {
    base: {
      position: "relative",
      height: "auto",
      textAlign: "left",
      backgroundColor: theme32.TABLE_TH_BACKGROUND_COLOR,
      borderBottom: `1px solid ${theme32.TABLE_BORDER_COLOR}`,
      fontWeight: "normal",
      verticalAlign: "middle",
      padding: "0 4px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      lineHeight: "14px",
      ":hover": {
        backgroundColor: theme32.TABLE_TH_HOVER_COLOR
      }
    },
    div: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      fontSize: theme32.BASE_FONT_SIZE,
      lineHeight: "120%"
    }
  },
  TableInspectorLeftBorder: {
    none: {
      borderLeft: "none"
    },
    solid: {
      borderLeft: `1px solid ${theme32.TABLE_BORDER_COLOR}`
    }
  },
  TableInspectorSortIcon: {
    display: "block",
    marginRight: 3,
    width: 8,
    height: 7,
    marginTop: -7,
    color: theme32.TABLE_SORT_ICON_COLOR,
    fontSize: 12,
    ...unselectable
  }
});
var DEFAULT_THEME_NAME = "chromeLight";
var ThemeContext = createContext9(createTheme(themes_exports[DEFAULT_THEME_NAME]));
var useStyles = (baseStylesKey) => {
  const themeStyles = useContext10(ThemeContext);
  return themeStyles[baseStylesKey];
};
var themeAcceptor = (WrappedComponent) => {
  const ThemeAcceptor = ({ theme: theme32 = DEFAULT_THEME_NAME, ...restProps }) => {
    const themeStyles = useMemo6(() => {
      switch (Object.prototype.toString.call(theme32)) {
        case "[object String]":
          return createTheme(themes_exports[theme32]);
        case "[object Object]":
          return createTheme(theme32);
        default:
          return createTheme(themes_exports[DEFAULT_THEME_NAME]);
      }
    }, [theme32]);
    return /* @__PURE__ */ React17.createElement(ThemeContext.Provider, {
      value: themeStyles
    }, /* @__PURE__ */ React17.createElement(WrappedComponent, {
      ...restProps
    }));
  };
  return ThemeAcceptor;
};
var Arrow3 = ({ expanded, styles }) => /* @__PURE__ */ React17.createElement("span", {
  style: {
    ...styles.base,
    ...expanded ? styles.expanded : styles.collapsed
  }
}, "\u25B6");
var TreeNode = memo((props) => {
  props = {
    expanded: true,
    nodeRenderer: ({ name }) => /* @__PURE__ */ React17.createElement("span", null, name),
    onClick: () => {
    },
    shouldShowArrow: false,
    shouldShowPlaceholder: true,
    ...props
  };
  const { expanded, onClick, children: children2, nodeRenderer, title, shouldShowArrow, shouldShowPlaceholder } = props;
  const styles = useStyles("TreeNode");
  const NodeRenderer = nodeRenderer;
  return /* @__PURE__ */ React17.createElement("li", {
    "aria-expanded": expanded,
    role: "treeitem",
    style: styles.treeNodeBase,
    title
  }, /* @__PURE__ */ React17.createElement("div", {
    style: styles.treeNodePreviewContainer,
    onClick
  }, shouldShowArrow || Children.count(children2) > 0 ? /* @__PURE__ */ React17.createElement(Arrow3, {
    expanded,
    styles: styles.treeNodeArrow
  }) : shouldShowPlaceholder && /* @__PURE__ */ React17.createElement("span", {
    style: styles.treeNodePlaceholder
  }, "\xA0"), /* @__PURE__ */ React17.createElement(NodeRenderer, {
    ...props
  })), /* @__PURE__ */ React17.createElement("ol", {
    role: "group",
    style: styles.treeNodeChildNodesContainer
  }, expanded ? children2 : void 0));
});
var DEFAULT_ROOT_PATH = "$";
var WILDCARD = "*";
function hasChildNodes(data, dataIterator) {
  return !dataIterator(data).next().done;
}
var wildcardPathsFromLevel = (level) => {
  return Array.from({ length: level }, (_, i) => [DEFAULT_ROOT_PATH].concat(Array.from({ length: i }, () => "*")).join("."));
};
var getExpandedPaths = (data, dataIterator, expandPaths, expandLevel, prevExpandedPaths) => {
  const wildcardPaths = [].concat(wildcardPathsFromLevel(expandLevel)).concat(expandPaths).filter((path2) => typeof path2 === "string");
  const expandedPaths = [];
  wildcardPaths.forEach((wildcardPath) => {
    const keyPaths = wildcardPath.split(".");
    const populatePaths = (curData, curPath, depth) => {
      if (depth === keyPaths.length) {
        expandedPaths.push(curPath);
        return;
      }
      const key = keyPaths[depth];
      if (depth === 0) {
        if (hasChildNodes(curData, dataIterator) && (key === DEFAULT_ROOT_PATH || key === WILDCARD)) {
          populatePaths(curData, DEFAULT_ROOT_PATH, depth + 1);
        }
      } else {
        if (key === WILDCARD) {
          for (const { name, data: data2 } of dataIterator(curData)) {
            if (hasChildNodes(data2, dataIterator)) {
              populatePaths(data2, `${curPath}.${name}`, depth + 1);
            }
          }
        } else {
          const value = curData[key];
          if (hasChildNodes(value, dataIterator)) {
            populatePaths(value, `${curPath}.${key}`, depth + 1);
          }
        }
      }
    };
    populatePaths(data, "", 0);
  });
  return expandedPaths.reduce((obj, path2) => {
    obj[path2] = true;
    return obj;
  }, { ...prevExpandedPaths });
};
var ConnectedTreeNode = memo((props) => {
  const { data, dataIterator, path: path2, depth, nodeRenderer } = props;
  const [expandedPaths, setExpandedPaths] = useContext10(ExpandedPathsContext);
  const nodeHasChildNodes = hasChildNodes(data, dataIterator);
  const expanded = !!expandedPaths[path2];
  const handleClick = useCallback7(() => nodeHasChildNodes && setExpandedPaths((prevExpandedPaths) => ({
    ...prevExpandedPaths,
    [path2]: !expanded
  })), [nodeHasChildNodes, setExpandedPaths, path2, expanded]);
  return /* @__PURE__ */ React17.createElement(TreeNode, {
    expanded,
    onClick: handleClick,
    shouldShowArrow: nodeHasChildNodes,
    shouldShowPlaceholder: depth > 0,
    nodeRenderer,
    ...props
  }, expanded ? [...dataIterator(data)].map(({ name, data: data2, ...renderNodeProps }) => {
    return /* @__PURE__ */ React17.createElement(ConnectedTreeNode, {
      name,
      data: data2,
      depth: depth + 1,
      path: `${path2}.${name}`,
      key: name,
      dataIterator,
      nodeRenderer,
      ...renderNodeProps
    });
  }) : null);
});
var TreeView = memo(({ name, data, dataIterator, nodeRenderer, expandPaths, expandLevel }) => {
  const styles = useStyles("TreeView");
  const stateAndSetter = useState16({});
  const [, setExpandedPaths] = stateAndSetter;
  useLayoutEffect(() => setExpandedPaths((prevExpandedPaths) => getExpandedPaths(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths)), [data, dataIterator, expandPaths, expandLevel]);
  return /* @__PURE__ */ React17.createElement(ExpandedPathsContext.Provider, {
    value: stateAndSetter
  }, /* @__PURE__ */ React17.createElement("ol", {
    role: "tree",
    style: styles.treeViewOutline
  }, /* @__PURE__ */ React17.createElement(ConnectedTreeNode, {
    name,
    data,
    dataIterator,
    depth: 0,
    path: DEFAULT_ROOT_PATH,
    nodeRenderer
  })));
});
var ObjectName = ({ name, dimmed = false, styles = {} }) => {
  const themeStyles = useStyles("ObjectName");
  const appliedStyles = {
    ...themeStyles.base,
    ...dimmed ? themeStyles["dimmed"] : {},
    ...styles
  };
  return /* @__PURE__ */ React17.createElement("span", {
    style: appliedStyles
  }, name);
};
var ObjectValue = ({ object, styles }) => {
  const themeStyles = useStyles("ObjectValue");
  const mkStyle = (key) => ({ ...themeStyles[key], ...styles });
  switch (typeof object) {
    case "bigint":
      return /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueNumber")
      }, String(object), "n");
    case "number":
      return /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueNumber")
      }, String(object));
    case "string":
      return /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueString")
      }, '"', object, '"');
    case "boolean":
      return /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueBoolean")
      }, String(object));
    case "undefined":
      return /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueUndefined")
      }, "undefined");
    case "object":
      if (object === null) {
        return /* @__PURE__ */ React17.createElement("span", {
          style: mkStyle("objectValueNull")
        }, "null");
      }
      if (object instanceof Date) {
        return /* @__PURE__ */ React17.createElement("span", null, object.toString());
      }
      if (object instanceof RegExp) {
        return /* @__PURE__ */ React17.createElement("span", {
          style: mkStyle("objectValueRegExp")
        }, object.toString());
      }
      if (Array.isArray(object)) {
        return /* @__PURE__ */ React17.createElement("span", null, `Array(${object.length})`);
      }
      if (!object.constructor) {
        return /* @__PURE__ */ React17.createElement("span", null, "Object");
      }
      if (typeof object.constructor.isBuffer === "function" && object.constructor.isBuffer(object)) {
        return /* @__PURE__ */ React17.createElement("span", null, `Buffer[${object.length}]`);
      }
      return /* @__PURE__ */ React17.createElement("span", null, object.constructor.name);
    case "function":
      return /* @__PURE__ */ React17.createElement("span", null, /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueFunctionPrefix")
      }, "\u0192\xA0"), /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueFunctionName")
      }, object.name, "()"));
    case "symbol":
      return /* @__PURE__ */ React17.createElement("span", {
        style: mkStyle("objectValueSymbol")
      }, object.toString());
    default:
      return /* @__PURE__ */ React17.createElement("span", null);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
function getPropertyValue(object, propertyName) {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName);
  if (propertyDescriptor.get) {
    try {
      return propertyDescriptor.get();
    } catch {
      return propertyDescriptor.get;
    }
  }
  return object[propertyName];
}
function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }
  return arr.slice(1).reduce((xs, x2) => xs.concat([sep, x2]), [arr[0]]);
}
var ObjectPreview = ({ data }) => {
  const styles = useStyles("ObjectPreview");
  const object = data;
  if (typeof object !== "object" || object === null || object instanceof Date || object instanceof RegExp) {
    return /* @__PURE__ */ React17.createElement(ObjectValue, {
      object
    });
  }
  if (Array.isArray(object)) {
    const maxProperties = styles.arrayMaxProperties;
    const previewArray = object.slice(0, maxProperties).map((element, index) => /* @__PURE__ */ React17.createElement(ObjectValue, {
      key: index,
      object: element
    }));
    if (object.length > maxProperties) {
      previewArray.push(/* @__PURE__ */ React17.createElement("span", {
        key: "ellipsis"
      }, "\u2026"));
    }
    const arrayLength = object.length;
    return /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement("span", {
      style: styles.objectDescription
    }, arrayLength === 0 ? `` : `(${arrayLength})\xA0`), /* @__PURE__ */ React17.createElement("span", {
      style: styles.preview
    }, "[", intersperse(previewArray, ", "), "]"));
  } else {
    const maxProperties = styles.objectMaxProperties;
    const propertyNodes = [];
    for (const propertyName in object) {
      if (hasOwnProperty.call(object, propertyName)) {
        let ellipsis;
        if (propertyNodes.length === maxProperties - 1 && Object.keys(object).length > maxProperties) {
          ellipsis = /* @__PURE__ */ React17.createElement("span", {
            key: "ellipsis"
          }, "\u2026");
        }
        const propertyValue = getPropertyValue(object, propertyName);
        propertyNodes.push(/* @__PURE__ */ React17.createElement("span", {
          key: propertyName
        }, /* @__PURE__ */ React17.createElement(ObjectName, {
          name: propertyName || `""`
        }), ":\xA0", /* @__PURE__ */ React17.createElement(ObjectValue, {
          object: propertyValue
        }), ellipsis));
        if (ellipsis)
          break;
      }
    }
    const objectConstructorName = object.constructor ? object.constructor.name : "Object";
    return /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement("span", {
      style: styles.objectDescription
    }, objectConstructorName === "Object" ? "" : `${objectConstructorName} `), /* @__PURE__ */ React17.createElement("span", {
      style: styles.preview
    }, "{", intersperse(propertyNodes, ", "), "}"));
  }
};
var ObjectRootLabel = ({ name, data }) => {
  if (typeof name === "string") {
    return /* @__PURE__ */ React17.createElement("span", null, /* @__PURE__ */ React17.createElement(ObjectName, {
      name
    }), /* @__PURE__ */ React17.createElement("span", null, ": "), /* @__PURE__ */ React17.createElement(ObjectPreview, {
      data
    }));
  } else {
    return /* @__PURE__ */ React17.createElement(ObjectPreview, {
      data
    });
  }
};
var ObjectLabel = ({ name, data, isNonenumerable = false }) => {
  const object = data;
  return /* @__PURE__ */ React17.createElement("span", null, typeof name === "string" ? /* @__PURE__ */ React17.createElement(ObjectName, {
    name,
    dimmed: isNonenumerable
  }) : /* @__PURE__ */ React17.createElement(ObjectPreview, {
    data: name
  }), /* @__PURE__ */ React17.createElement("span", null, ": "), /* @__PURE__ */ React17.createElement(ObjectValue, {
    object
  }));
};
var createIterator = (showNonenumerable, sortObjectKeys) => {
  const objectIterator = function* (data) {
    const shouldIterate = typeof data === "object" && data !== null || typeof data === "function";
    if (!shouldIterate)
      return;
    const dataIsArray = Array.isArray(data);
    if (!dataIsArray && data[Symbol.iterator]) {
      let i = 0;
      for (const entry of data) {
        if (Array.isArray(entry) && entry.length === 2) {
          const [k, v] = entry;
          yield {
            name: k,
            data: v
          };
        } else {
          yield {
            name: i.toString(),
            data: entry
          };
        }
        i++;
      }
    } else {
      const keys = Object.getOwnPropertyNames(data);
      if (sortObjectKeys === true && !dataIsArray) {
        keys.sort();
      } else if (typeof sortObjectKeys === "function") {
        keys.sort(sortObjectKeys);
      }
      for (const propertyName of keys) {
        if (propertyIsEnumerable.call(data, propertyName)) {
          const propertyValue = getPropertyValue(data, propertyName);
          yield {
            name: propertyName || `""`,
            data: propertyValue
          };
        } else if (showNonenumerable) {
          let propertyValue;
          try {
            propertyValue = getPropertyValue(data, propertyName);
          } catch (e) {
          }
          if (propertyValue !== void 0) {
            yield {
              name: propertyName,
              data: propertyValue,
              isNonenumerable: true
            };
          }
        }
      }
      if (showNonenumerable && data !== Object.prototype) {
        yield {
          name: "__proto__",
          data: Object.getPrototypeOf(data),
          isNonenumerable: true
        };
      }
    }
  };
  return objectIterator;
};
var defaultNodeRenderer = ({ depth, name, data, isNonenumerable }) => depth === 0 ? /* @__PURE__ */ React17.createElement(ObjectRootLabel, {
  name,
  data
}) : /* @__PURE__ */ React17.createElement(ObjectLabel, {
  name,
  data,
  isNonenumerable
});
var ObjectInspector = ({ showNonenumerable = false, sortObjectKeys, nodeRenderer, ...treeViewProps }) => {
  const dataIterator = createIterator(showNonenumerable, sortObjectKeys);
  const renderer = nodeRenderer ? nodeRenderer : defaultNodeRenderer;
  return /* @__PURE__ */ React17.createElement(TreeView, {
    nodeRenderer: renderer,
    dataIterator,
    ...treeViewProps
  });
};
var themedObjectInspector = themeAcceptor(ObjectInspector);
function getHeaders(data) {
  if (typeof data === "object") {
    let rowHeaders = [];
    if (Array.isArray(data)) {
      const nRows = data.length;
      rowHeaders = [...Array(nRows).keys()];
    } else if (data !== null) {
      rowHeaders = Object.keys(data);
    }
    const colHeaders = rowHeaders.reduce((colHeaders2, rowHeader) => {
      const row = data[rowHeader];
      if (typeof row === "object" && row !== null) {
        const cols = Object.keys(row);
        cols.reduce((xs, x2) => {
          if (!xs.includes(x2)) {
            xs.push(x2);
          }
          return xs;
        }, colHeaders2);
      }
      return colHeaders2;
    }, []);
    return {
      rowHeaders,
      colHeaders
    };
  }
  return void 0;
}
var DataContainer = ({ rows, columns, rowsData }) => {
  const styles = useStyles("TableInspectorDataContainer");
  const borderStyles = useStyles("TableInspectorLeftBorder");
  return /* @__PURE__ */ React17.createElement("div", {
    style: styles.div
  }, /* @__PURE__ */ React17.createElement("table", {
    style: styles.table
  }, /* @__PURE__ */ React17.createElement("colgroup", null), /* @__PURE__ */ React17.createElement("tbody", null, rows.map((row, i) => /* @__PURE__ */ React17.createElement("tr", {
    key: row,
    style: styles.tr
  }, /* @__PURE__ */ React17.createElement("td", {
    style: { ...styles.td, ...borderStyles.none }
  }, row), columns.map((column) => {
    const rowData = rowsData[i];
    if (typeof rowData === "object" && rowData !== null && hasOwnProperty.call(rowData, column)) {
      return /* @__PURE__ */ React17.createElement("td", {
        key: column,
        style: { ...styles.td, ...borderStyles.solid }
      }, /* @__PURE__ */ React17.createElement(ObjectValue, {
        object: rowData[column]
      }));
    } else {
      return /* @__PURE__ */ React17.createElement("td", {
        key: column,
        style: { ...styles.td, ...borderStyles.solid }
      });
    }
  }))))));
};
var SortIconContainer = (props) => /* @__PURE__ */ React17.createElement("div", {
  style: {
    position: "absolute",
    top: 1,
    right: 0,
    bottom: 1,
    display: "flex",
    alignItems: "center"
  }
}, props.children);
var SortIcon = ({ sortAscending }) => {
  const styles = useStyles("TableInspectorSortIcon");
  const glyph = sortAscending ? "\u25B2" : "\u25BC";
  return /* @__PURE__ */ React17.createElement("div", {
    style: styles
  }, glyph);
};
var TH = ({
  sortAscending = false,
  sorted = false,
  onClick = void 0,
  borderStyle = {},
  children: children2,
  ...thProps
}) => {
  const styles = useStyles("TableInspectorTH");
  const [hovered, setHovered] = useState16(false);
  const handleMouseEnter = useCallback7(() => setHovered(true), []);
  const handleMouseLeave = useCallback7(() => setHovered(false), []);
  return /* @__PURE__ */ React17.createElement("th", {
    ...thProps,
    style: {
      ...styles.base,
      ...borderStyle,
      ...hovered ? styles.base[":hover"] : {}
    },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick
  }, /* @__PURE__ */ React17.createElement("div", {
    style: styles.div
  }, children2), sorted && /* @__PURE__ */ React17.createElement(SortIconContainer, null, /* @__PURE__ */ React17.createElement(SortIcon, {
    sortAscending
  })));
};
var HeaderContainer = ({
  indexColumnText = "(index)",
  columns = [],
  sorted,
  sortIndexColumn,
  sortColumn,
  sortAscending,
  onTHClick,
  onIndexTHClick
}) => {
  const styles = useStyles("TableInspectorHeaderContainer");
  const borderStyles = useStyles("TableInspectorLeftBorder");
  return /* @__PURE__ */ React17.createElement("div", {
    style: styles.base
  }, /* @__PURE__ */ React17.createElement("table", {
    style: styles.table
  }, /* @__PURE__ */ React17.createElement("tbody", null, /* @__PURE__ */ React17.createElement("tr", null, /* @__PURE__ */ React17.createElement(TH, {
    borderStyle: borderStyles.none,
    sorted: sorted && sortIndexColumn,
    sortAscending,
    onClick: onIndexTHClick
  }, indexColumnText), columns.map((column) => /* @__PURE__ */ React17.createElement(TH, {
    borderStyle: borderStyles.solid,
    key: column,
    sorted: sorted && sortColumn === column,
    sortAscending,
    onClick: onTHClick.bind(null, column)
  }, column))))));
};
var TableInspector = ({
  data,
  columns
}) => {
  const styles = useStyles("TableInspector");
  const [{ sorted, sortIndexColumn, sortColumn, sortAscending }, setState] = useState16({
    sorted: false,
    sortIndexColumn: false,
    sortColumn: void 0,
    sortAscending: false
  });
  const handleIndexTHClick = useCallback7(() => {
    setState(({ sortIndexColumn: sortIndexColumn2, sortAscending: sortAscending2 }) => ({
      sorted: true,
      sortIndexColumn: true,
      sortColumn: void 0,
      sortAscending: sortIndexColumn2 ? !sortAscending2 : true
    }));
  }, []);
  const handleTHClick = useCallback7((col) => {
    setState(({ sortColumn: sortColumn2, sortAscending: sortAscending2 }) => ({
      sorted: true,
      sortIndexColumn: false,
      sortColumn: col,
      sortAscending: col === sortColumn2 ? !sortAscending2 : true
    }));
  }, []);
  if (typeof data !== "object" || data === null) {
    return /* @__PURE__ */ React17.createElement("div", null);
  }
  let { rowHeaders, colHeaders } = getHeaders(data);
  if (columns !== void 0) {
    colHeaders = columns;
  }
  let rowsData = rowHeaders.map((rowHeader) => data[rowHeader]);
  let columnDataWithRowIndexes;
  if (sortColumn !== void 0) {
    columnDataWithRowIndexes = rowsData.map((rowData, index) => {
      if (typeof rowData === "object" && rowData !== null) {
        const columnData = rowData[sortColumn];
        return [columnData, index];
      }
      return [void 0, index];
    });
  } else {
    if (sortIndexColumn) {
      columnDataWithRowIndexes = rowHeaders.map((rowData, index) => {
        const columnData = rowHeaders[index];
        return [columnData, index];
      });
    }
  }
  if (columnDataWithRowIndexes !== void 0) {
    const comparator = (mapper, ascending2) => {
      return (a, b) => {
        const v1 = mapper(a);
        const v2 = mapper(b);
        const type1 = typeof v1;
        const type2 = typeof v2;
        const lt = (v12, v22) => {
          if (v12 < v22) {
            return -1;
          } else if (v12 > v22) {
            return 1;
          } else {
            return 0;
          }
        };
        let result;
        if (type1 === type2) {
          result = lt(v1, v2);
        } else {
          const order = {
            string: 0,
            number: 1,
            object: 2,
            symbol: 3,
            boolean: 4,
            undefined: 5,
            function: 6
          };
          result = lt(order[type1], order[type2]);
        }
        if (!ascending2)
          result = -result;
        return result;
      };
    };
    const sortedRowIndexes = columnDataWithRowIndexes.sort(comparator((item) => item[0], sortAscending)).map((item) => item[1]);
    rowHeaders = sortedRowIndexes.map((i) => rowHeaders[i]);
    rowsData = sortedRowIndexes.map((i) => rowsData[i]);
  }
  return /* @__PURE__ */ React17.createElement("div", {
    style: styles.base
  }, /* @__PURE__ */ React17.createElement(HeaderContainer, {
    columns: colHeaders,
    sorted,
    sortIndexColumn,
    sortColumn,
    sortAscending,
    onTHClick: handleTHClick,
    onIndexTHClick: handleIndexTHClick
  }), /* @__PURE__ */ React17.createElement(DataContainer, {
    rows: rowHeaders,
    columns: colHeaders,
    rowsData
  }));
};
var themedTableInspector = themeAcceptor(TableInspector);
var TEXT_NODE_MAX_INLINE_CHARS = 80;
var shouldInline = (data) => data.childNodes.length === 0 || data.childNodes.length === 1 && data.childNodes[0].nodeType === Node.TEXT_NODE && data.textContent.length < TEXT_NODE_MAX_INLINE_CHARS;
var OpenTag = ({ tagName, attributes, styles }) => {
  return /* @__PURE__ */ React17.createElement("span", {
    style: styles.base
  }, "<", /* @__PURE__ */ React17.createElement("span", {
    style: styles.tagName
  }, tagName), (() => {
    if (attributes) {
      const attributeNodes = [];
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        attributeNodes.push(/* @__PURE__ */ React17.createElement("span", {
          key: i
        }, " ", /* @__PURE__ */ React17.createElement("span", {
          style: styles.htmlAttributeName
        }, attribute.name), '="', /* @__PURE__ */ React17.createElement("span", {
          style: styles.htmlAttributeValue
        }, attribute.value), '"'));
      }
      return attributeNodes;
    }
  })(), ">");
};
var CloseTag = ({ tagName, isChildNode = false, styles }) => /* @__PURE__ */ React17.createElement("span", {
  style: Object.assign({}, styles.base, isChildNode && styles.offsetLeft)
}, "</", /* @__PURE__ */ React17.createElement("span", {
  style: styles.tagName
}, tagName), ">");
var nameByNodeType = {
  1: "ELEMENT_NODE",
  3: "TEXT_NODE",
  7: "PROCESSING_INSTRUCTION_NODE",
  8: "COMMENT_NODE",
  9: "DOCUMENT_NODE",
  10: "DOCUMENT_TYPE_NODE",
  11: "DOCUMENT_FRAGMENT_NODE"
};
var DOMNodePreview = ({ isCloseTag, data, expanded }) => {
  const styles = useStyles("DOMNodePreview");
  if (isCloseTag) {
    return /* @__PURE__ */ React17.createElement(CloseTag, {
      styles: styles.htmlCloseTag,
      isChildNode: true,
      tagName: data.tagName
    });
  }
  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return /* @__PURE__ */ React17.createElement("span", null, /* @__PURE__ */ React17.createElement(OpenTag, {
        tagName: data.tagName,
        attributes: data.attributes,
        styles: styles.htmlOpenTag
      }), shouldInline(data) ? data.textContent : !expanded && "\u2026", !expanded && /* @__PURE__ */ React17.createElement(CloseTag, {
        tagName: data.tagName,
        styles: styles.htmlCloseTag
      }));
    case Node.TEXT_NODE:
      return /* @__PURE__ */ React17.createElement("span", null, data.textContent);
    case Node.CDATA_SECTION_NODE:
      return /* @__PURE__ */ React17.createElement("span", null, "<![CDATA[" + data.textContent + "]]>");
    case Node.COMMENT_NODE:
      return /* @__PURE__ */ React17.createElement("span", {
        style: styles.htmlComment
      }, "<!--", data.textContent, "-->");
    case Node.PROCESSING_INSTRUCTION_NODE:
      return /* @__PURE__ */ React17.createElement("span", null, data.nodeName);
    case Node.DOCUMENT_TYPE_NODE:
      return /* @__PURE__ */ React17.createElement("span", {
        style: styles.htmlDoctype
      }, "<!DOCTYPE ", data.name, data.publicId ? ` PUBLIC "${data.publicId}"` : "", !data.publicId && data.systemId ? " SYSTEM" : "", data.systemId ? ` "${data.systemId}"` : "", ">");
    case Node.DOCUMENT_NODE:
      return /* @__PURE__ */ React17.createElement("span", null, data.nodeName);
    case Node.DOCUMENT_FRAGMENT_NODE:
      return /* @__PURE__ */ React17.createElement("span", null, data.nodeName);
    default:
      return /* @__PURE__ */ React17.createElement("span", null, nameByNodeType[data.nodeType]);
  }
};
var domIterator = function* (data) {
  if (data && data.childNodes) {
    const textInlined = shouldInline(data);
    if (textInlined) {
      return;
    }
    for (let i = 0; i < data.childNodes.length; i++) {
      const node = data.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length === 0)
        continue;
      yield {
        name: `${node.tagName}[${i}]`,
        data: node
      };
    }
    if (data.tagName) {
      yield {
        name: "CLOSE_TAG",
        data: {
          tagName: data.tagName
        },
        isCloseTag: true
      };
    }
  }
};
var DOMInspector = (props) => {
  return /* @__PURE__ */ React17.createElement(TreeView, {
    nodeRenderer: DOMNodePreview,
    dataIterator: domIterator,
    ...props
  });
};
var themedDOMInspector = themeAcceptor(DOMInspector);
var import_is_dom = __toESM(require_is_dom());
var Inspector = ({ table = false, data, ...rest }) => {
  if (table) {
    return /* @__PURE__ */ React17.createElement(themedTableInspector, {
      data,
      ...rest
    });
  }
  if ((0, import_is_dom.default)(data))
    return /* @__PURE__ */ React17.createElement(themedDOMInspector, {
      data,
      ...rest
    });
  return /* @__PURE__ */ React17.createElement(themedObjectInspector, {
    data,
    ...rest
  });
};
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}
function select_default(select) {
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
function array(x2) {
  return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
}
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
function sparse_default(update) {
  return new Array(update.length);
}
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};
function constant_default(x2) {
  return function() {
    return x2;
  };
}
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
function sort_default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
function nodes_default() {
  return Array.from(this);
}
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
function size_default() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}
function empty_default() {
  return !this.node();
}
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}
function sourceEvent_default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}
function pointer_default(event, node) {
  event = sourceEvent_default(event);
  if (node === void 0) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}
var nonpassivecapture = { capture: true, passive: false };
function noevent_default(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function nodrag_default(view) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent_default, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2) h = (g - b) / s + (g < b) * 6;
    else if (g === max2) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
var constant_default2 = (x2) => () => x2;
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b, y2);
  };
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y2) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}
var rgb_default = function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var epsilon2 = 1e-12;
function cosh(x2) {
  return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
}
function sinh(x2) {
  return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
}
function tanh(x2) {
  return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id2 in schedules) return;
  create(node, id2, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2])) throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed) start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED) return stop2();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED) return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop2), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop2();
    }
  }
  function stop2() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules) return;
    delete node.__transition;
  }
}
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2) delete node.__transition;
}
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}
function easeConstant(id2, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
function merge_default2(transition2) {
  if (transition2._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id2) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}
function select_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0) resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0) resolve();
  });
}
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default2,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;
var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}
var Path = class {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x2, y2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x2, y2) {
    this._append`L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  quadraticCurveTo(x1, y1, x2, y2) {
    this._append`Q${+x1},${+y1},${this._x1 = +x2},${this._y1 = +y2}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    } else {
      let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append`L${x0},${y0}`;
    }
    if (!r) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x2 - dx},${y2 - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    } else if (da > epsilon) {
      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x2 + r * Math.cos(a1)},${this._y1 = y2 + r * Math.sin(a1)}`;
    }
  }
  rect(x2, y2, w, h) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
};
function count(node) {
  var sum = 0, children2 = node.children, i = children2 && children2.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children2[i].value;
  node.value = sum;
}
function count_default() {
  return this.eachAfter(count);
}
function each_default2(callback, that) {
  let index = -1;
  for (const node of this) {
    callback.call(that, node, ++index, this);
  }
  return this;
}
function eachBefore_default(callback, that) {
  var node = this, nodes = [node], children2, i, index = -1;
  while (node = nodes.pop()) {
    callback.call(that, node, ++index, this);
    if (children2 = node.children) {
      for (i = children2.length - 1; i >= 0; --i) {
        nodes.push(children2[i]);
      }
    }
  }
  return this;
}
function eachAfter_default(callback, that) {
  var node = this, nodes = [node], next = [], children2, i, n, index = -1;
  while (node = nodes.pop()) {
    next.push(node);
    if (children2 = node.children) {
      for (i = 0, n = children2.length; i < n; ++i) {
        nodes.push(children2[i]);
      }
    }
  }
  while (node = next.pop()) {
    callback.call(that, node, ++index, this);
  }
  return this;
}
function find_default(callback, that) {
  let index = -1;
  for (const node of this) {
    if (callback.call(that, node, ++index, this)) {
      return node;
    }
  }
}
function sum_default(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0, children2 = node.children, i = children2 && children2.length;
    while (--i >= 0) sum += children2[i].value;
    node.value = sum;
  });
}
function sort_default2(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}
function path_default(end) {
  var start2 = this, ancestor = leastCommonAncestor(start2, end), nodes = [start2];
  while (start2 !== ancestor) {
    start2 = start2.parent;
    nodes.push(start2);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}
function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(), bNodes = b.ancestors(), c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}
function ancestors_default() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}
function descendants_default() {
  return Array.from(this);
}
function leaves_default() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}
function links_default() {
  var root2 = this, links = [];
  root2.each(function(node) {
    if (node !== root2) {
      links.push({ source: node.parent, target: node });
    }
  });
  return links;
}
function* iterator_default2() {
  var node = this, current, next = [node], children2, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      yield node;
      if (children2 = node.children) {
        for (i = 0, n = children2.length; i < n; ++i) {
          next.push(children2[i]);
        }
      }
    }
  } while (next.length);
}
function hierarchy(data, children2) {
  if (data instanceof Map) {
    data = [void 0, data];
    if (children2 === void 0) children2 = mapChildren;
  } else if (children2 === void 0) {
    children2 = objectChildren;
  }
  var root2 = new Node2(data), node, nodes = [root2], child, childs, i, n;
  while (node = nodes.pop()) {
    if ((childs = children2(node.data)) && (n = (childs = Array.from(childs)).length)) {
      node.children = childs;
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = childs[i] = new Node2(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }
  return root2.eachBefore(computeHeight);
}
function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}
function objectChildren(d) {
  return d.children;
}
function mapChildren(d) {
  return Array.isArray(d) ? d[1] : null;
}
function copyData(node) {
  if (node.data.value !== void 0) node.value = node.data.value;
  node.data = node.data.data;
}
function computeHeight(node) {
  var height = 0;
  do
    node.height = height;
  while ((node = node.parent) && node.height < ++height);
}
function Node2(data) {
  this.data = data;
  this.depth = this.height = 0;
  this.parent = null;
}
Node2.prototype = hierarchy.prototype = {
  constructor: Node2,
  count: count_default,
  each: each_default2,
  eachAfter: eachAfter_default,
  eachBefore: eachBefore_default,
  find: find_default,
  sum: sum_default,
  sort: sort_default2,
  path: path_default,
  ancestors: ancestors_default,
  descendants: descendants_default,
  leaves: leaves_default,
  links: links_default,
  copy: node_copy,
  [Symbol.iterator]: iterator_default2
};
function optional(f) {
  return f == null ? null : required(f);
}
function required(f) {
  if (typeof f !== "function") throw new Error();
  return f;
}
var preroot = { depth: -1 };
var ambiguous = {};
var imputed = {};
function defaultId(d) {
  return d.id;
}
function defaultParentId(d) {
  return d.parentId;
}
function stratify_default() {
  var id2 = defaultId, parentId = defaultParentId, path2;
  function stratify(data) {
    var nodes = Array.from(data), currentId = id2, currentParentId = parentId, n, d, i, root2, parent, node, nodeId, nodeKey, nodeByKey = /* @__PURE__ */ new Map();
    if (path2 != null) {
      const I = nodes.map((d2, i2) => normalize(path2(d2, i2, data)));
      const P = I.map(parentof);
      const S = new Set(I).add("");
      for (const i2 of P) {
        if (!S.has(i2)) {
          S.add(i2);
          I.push(i2);
          P.push(parentof(i2));
          nodes.push(imputed);
        }
      }
      currentId = (_, i2) => I[i2];
      currentParentId = (_, i2) => P[i2];
    }
    for (i = 0, n = nodes.length; i < n; ++i) {
      d = nodes[i], node = nodes[i] = new Node2(d);
      if ((nodeId = currentId(d, i, data)) != null && (nodeId += "")) {
        nodeKey = node.id = nodeId;
        nodeByKey.set(nodeKey, nodeByKey.has(nodeKey) ? ambiguous : node);
      }
      if ((nodeId = currentParentId(d, i, data)) != null && (nodeId += "")) {
        node.parent = nodeId;
      }
    }
    for (i = 0; i < n; ++i) {
      node = nodes[i];
      if (nodeId = node.parent) {
        parent = nodeByKey.get(nodeId);
        if (!parent) throw new Error("missing: " + nodeId);
        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
        if (parent.children) parent.children.push(node);
        else parent.children = [node];
        node.parent = parent;
      } else {
        if (root2) throw new Error("multiple roots");
        root2 = node;
      }
    }
    if (!root2) throw new Error("no root");
    if (path2 != null) {
      while (root2.data === imputed && root2.children.length === 1) {
        root2 = root2.children[0], --n;
      }
      for (let i2 = nodes.length - 1; i2 >= 0; --i2) {
        node = nodes[i2];
        if (node.data !== imputed) break;
        node.data = null;
      }
    }
    root2.parent = preroot;
    root2.eachBefore(function(node2) {
      node2.depth = node2.parent.depth + 1;
      --n;
    }).eachBefore(computeHeight);
    root2.parent = null;
    if (n > 0) throw new Error("cycle");
    return root2;
  }
  stratify.id = function(x2) {
    return arguments.length ? (id2 = optional(x2), stratify) : id2;
  };
  stratify.parentId = function(x2) {
    return arguments.length ? (parentId = optional(x2), stratify) : parentId;
  };
  stratify.path = function(x2) {
    return arguments.length ? (path2 = optional(x2), stratify) : path2;
  };
  return stratify;
}
function normalize(path2) {
  path2 = `${path2}`;
  let i = path2.length;
  if (slash(path2, i - 1) && !slash(path2, i - 2)) path2 = path2.slice(0, -1);
  return path2[0] === "/" ? path2 : `/${path2}`;
}
function parentof(path2) {
  let i = path2.length;
  if (i < 2) return "";
  while (--i > 1) if (slash(path2, i)) break;
  return path2.slice(0, i);
}
function slash(path2, i) {
  if (path2[i] === "/") {
    let k = 0;
    while (i > 0 && path2[--i] === "\\") ++k;
    if ((k & 1) === 0) return true;
  }
  return false;
}
function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}
function nextLeft(v) {
  var children2 = v.children;
  return children2 ? children2[0] : v.t;
}
function nextRight(v) {
  var children2 = v.children;
  return children2 ? children2[children2.length - 1] : v.t;
}
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}
function executeShifts(v) {
  var shift = 0, change = 0, children2 = v.children, i = children2.length, w;
  while (--i >= 0) {
    w = children2[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}
function TreeNode2(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null;
  this.a = this;
  this.z = 0;
  this.m = 0;
  this.c = 0;
  this.s = 0;
  this.t = null;
  this.i = i;
}
TreeNode2.prototype = Object.create(Node2.prototype);
function treeRoot(root2) {
  var tree = new TreeNode2(root2, 0), node, nodes = [tree], child, children2, i, n;
  while (node = nodes.pop()) {
    if (children2 = node._.children) {
      node.children = new Array(n = children2.length);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new TreeNode2(children2[i], i));
        child.parent = node;
      }
    }
  }
  (tree.parent = new TreeNode2(null, 0)).children = [tree];
  return tree;
}
function tree_default() {
  var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = null;
  function tree(root2) {
    var t = treeRoot(root2);
    t.eachAfter(firstWalk), t.parent.m = -t.z;
    t.eachBefore(secondWalk);
    if (nodeSize) root2.eachBefore(sizeNode);
    else {
      var left = root2, right = root2, bottom = root2;
      root2.eachBefore(function(node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var s = left === right ? 1 : separation(left, right) / 2, tx = s - left.x, kx = dx / (right.x + s + tx), ky = dy / (bottom.depth || 1);
      root2.eachBefore(function(node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }
    return root2;
  }
  function firstWalk(v) {
    var children2 = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
    if (children2) {
      executeShifts(v);
      var midpoint = (children2[0].z + children2[children2.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }
  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }
  tree.separation = function(x2) {
    return arguments.length ? (separation = x2, tree) : separation;
  };
  tree.size = function(x2) {
    return arguments.length ? (nodeSize = false, dx = +x2[0], dy = +x2[1], tree) : nodeSize ? null : [dx, dy];
  };
  tree.nodeSize = function(x2) {
    return arguments.length ? (nodeSize = true, dx = +x2[0], dy = +x2[1], tree) : nodeSize ? [dx, dy] : null;
  };
  return tree;
}
function constant_default4(x2) {
  return function constant() {
    return x2;
  };
}
function withPath(shape) {
  let digits = 3;
  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };
  return () => new Path(digits);
}
var slice = Array.prototype.slice;
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}
var Bump = class {
  constructor(context, x2) {
    this._context = context;
    this._x = x2;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x2, y2);
        else this._context.moveTo(x2, y2);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
        break;
      }
    }
    this._x0 = x2, this._y0 = y2;
  }
};
function bumpY(context) {
  return new Bump(context, false);
}
function linkSource(d) {
  return d.source;
}
function linkTarget(d) {
  return d.target;
}
function link(curve) {
  let source = linkSource, target = linkTarget, x2 = x, y2 = y, context = null, output = null, path2 = withPath(link2);
  function link2() {
    let buffer;
    const argv = slice.call(arguments);
    const s = source.apply(this, argv);
    const t = target.apply(this, argv);
    if (context == null) output = curve(buffer = path2());
    output.lineStart();
    argv[0] = s, output.point(+x2.apply(this, argv), +y2.apply(this, argv));
    argv[0] = t, output.point(+x2.apply(this, argv), +y2.apply(this, argv));
    output.lineEnd();
    if (buffer) return output = null, buffer + "" || null;
  }
  link2.source = function(_) {
    return arguments.length ? (source = _, link2) : source;
  };
  link2.target = function(_) {
    return arguments.length ? (target = _, link2) : target;
  };
  link2.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default4(+_), link2) : x2;
  };
  link2.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default4(+_), link2) : y2;
  };
  link2.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link2) : context;
  };
  return link2;
}
function linkVertical() {
  return link(bumpY);
}
var constant_default5 = (x2) => () => x2;
function ZoomEvent(type2, {
  sourceEvent,
  target,
  transform: transform2,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform2, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
function Transform(k, x2, y2) {
  this.k = k;
  this.x = x2;
  this.y = y2;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x2, y2) {
    return x2 === 0 & y2 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y2);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x2) {
    return x2 * this.k + this.x;
  },
  applyY: function(y2) {
    return y2 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x2) {
    return (x2 - this.x) / this.k;
  },
  invertY: function(y2) {
    return (y2 - this.y) / this.k;
  },
  rescaleX: function(x2) {
    return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
  },
  rescaleY: function(y2) {
    return y2.copy().domain(y2.range().map(this.invertY, this).map(y2.invert, y2));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity2 = new Transform(1, 0, 0);
Transform.prototype;
function nopropagation2(event) {
  event.stopImmediatePropagation();
}
function noevent_default3(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity2;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform2, extent, translateExtent) {
  var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
  return transform2.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom_default2() {
  var filter2 = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default, listeners = dispatch_default("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom(selection2) {
    selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom.transform = function(collection, transform2, point, event) {
    var selection2 = collection.selection ? collection.selection() : collection;
    selection2.property("__zoom", defaultTransform);
    if (collection !== selection2) {
      schedule(collection, transform2, point, event);
    } else {
      selection2.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
      });
    }
  };
  zoom.scaleBy = function(selection2, k, p, event) {
    zoom.scaleTo(selection2, function() {
      var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };
  zoom.scaleTo = function(selection2, k, p, event) {
    zoom.transform(selection2, function() {
      var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };
  zoom.translateBy = function(selection2, x2, y2, event) {
    zoom.transform(selection2, function() {
      return constrain(this.__zoom.translate(
        typeof x2 === "function" ? x2.apply(this, arguments) : x2,
        typeof y2 === "function" ? y2.apply(this, arguments) : y2
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom.translateTo = function(selection2, x2, y2, p, event) {
    zoom.transform(selection2, function() {
      var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity2.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x2 === "function" ? -x2.apply(this, arguments) : -x2,
        typeof y2 === "function" ? -y2.apply(this, arguments) : -y2
      ), e, translateExtent);
    }, p, event);
  };
  function scale(transform2, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
  }
  function translate(transform2, p0, p1) {
    var x2 = p0[0] - p1[0] * transform2.k, y2 = p0[1] - p1[1] * transform2.k;
    return x2 === transform2.x && y2 === transform2.y ? transform2 : new Transform(transform2.k, x2, y2);
  }
  function centroid(extent2) {
    return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
  }
  function schedule(transition2, transform2, point, event) {
    transition2.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
      return function(t) {
        if (t === 1) t = b;
        else {
          var l = i(t), k = w / l[2];
          t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform2) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform2.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform2.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform2.invert(this.touch1[0]);
      this.that.__zoom = transform2;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type2) {
      var d = select_default2(this.that).datum();
      listeners.call(
        type2,
        this.that,
        new ZoomEvent(type2, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type: type2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    } else if (t.k === k) return;
    else {
      g.mouse = [p, t.invert(p)];
      interrupt_default(this);
      g.start();
    }
    noevent_default3(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter2.apply(this, arguments)) return;
    var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default2(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
    nodrag_default(event.view);
    nopropagation2(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt_default(this);
    g.start();
    function mousemoved(event2) {
      noevent_default3(event2);
      if (!g.moved) {
        var dx = event2.clientX - x0, dy = event2.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped(event2) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g.moved);
      noevent_default3(event2);
      g.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    noevent_default3(event);
    if (duration > 0) select_default2(this).transition().duration(duration).call(schedule, t1, p0, event);
    else select_default2(this).call(zoom.transform, t1, p0, event);
  }
  function touchstarted(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
    nopropagation2(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer_default(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
        touchstarting = null;
      }, touchDelay);
      interrupt_default(this);
      g.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
    noevent_default3(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer_default(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
    nopropagation2(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      if (g.taps === 2) {
        t = pointer_default(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select_default2(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }
  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default5(+_), zoom) : wheelDelta;
  };
  zoom.filter = function(_) {
    return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant_default5(!!_), zoom) : filter2;
  };
  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default5(!!_), zoom) : touchable;
  };
  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default5([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };
  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };
  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };
  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };
  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };
  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };
  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };
  return zoom;
}
var renderCounts = /* @__PURE__ */ new WeakMap();
var fiberStates = /* @__PURE__ */ new Map();
var FIBER_PROP_EXPLANATIONS = {
  tag: "Numeric type identifier for this fiber (e.g. 1=FunctionComponent, 5=HostComponent)",
  elementType: "The original function/class/element type",
  type: "The resolved function/class after going through any HOCs",
  stateNode: "Reference to the actual instance (DOM node, class instance, etc)",
  return: "Parent fiber",
  child: "First child fiber",
  sibling: "Next sibling fiber",
  index: "Position among siblings",
  ref: "Ref object or function",
  pendingProps: "Props that are about to be applied",
  memoizedProps: "Props from the last render",
  memoizedState: "State from the last render",
  dependencies: "Context and other dependencies this fiber subscribes to",
  flags: "Side-effects flags (e.g. needs update, deletion)",
  lanes: "Priority lanes for updates",
  childLanes: "Priority lanes for child updates"
};
var throttle = (fn, wait) => {
  let timeout2 = null;
  return function() {
    if (!timeout2) {
      timeout2 = setTimeout(() => {
        fn.apply(this, arguments);
        timeout2 = null;
      }, wait);
    }
  };
};
var isMac = typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("mac");
var theme3 = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "12px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "none",
  BASE_COLOR: "#FFF",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "#FFC799",
  OBJECT_VALUE_NULL_COLOR: "#A0A0A0",
  OBJECT_VALUE_UNDEFINED_COLOR: "#A0A0A0",
  OBJECT_VALUE_REGEXP_COLOR: "#FF8080",
  OBJECT_VALUE_STRING_COLOR: "#99FFE4",
  OBJECT_VALUE_SYMBOL_COLOR: "#FFC799",
  OBJECT_VALUE_NUMBER_COLOR: "#FFC799",
  OBJECT_VALUE_BOOLEAN_COLOR: "#FFC799",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "#FFC799",
  HTML_TAG_COLOR: "#FFC799",
  HTML_TAGNAME_COLOR: "#FFC799",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "#A0A0A0",
  HTML_ATTRIBUTE_VALUE_COLOR: "#99FFE4",
  HTML_COMMENT_COLOR: "#8b8b8b94",
  HTML_DOCTYPE_COLOR: "#A0A0A0",
  ARROW_COLOR: "#A0A0A0",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "#282828",
  TABLE_TH_BACKGROUND_COLOR: "#161616",
  TABLE_TH_HOVER_COLOR: "#232323",
  TABLE_SORT_ICON_COLOR: "#A0A0A0",
  TABLE_DATA_BACKGROUND_IMAGE: "none",
  TABLE_DATA_BACKGROUND_SIZE: "0"
};
var ControlButton = React17.memo(
  ({ onClick, children: children2 }) => /* @__PURE__ */ React17.createElement(
    "button",
    {
      type: "button",
      onClick,
      onMouseEnter: (e) => {
        e.currentTarget.style.opacity = "1";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.opacity = "0.8";
      },
      style: {
        padding: "0.5ch 0.75ch",
        background: "transparent",
        border: "1px solid #282828",
        color: "#FFF",
        borderRadius: "0.25rem",
        cursor: "pointer",
        fontSize: "0.75rem",
        lineHeight: 1,
        opacity: 0.8,
        transition: "opacity 150ms"
      }
    },
    children2
  )
);
var Controls = React17.memo(
  ({
    onZoomIn,
    onZoomOut,
    onReset,
    onFit
  }) => /* @__PURE__ */ React17.createElement(
    "div",
    {
      style: {
        position: "absolute",
        right: "1ch",
        bottom: "1ch",
        display: "flex",
        gap: "0.5ch",
        zIndex: 1,
        background: "#161616",
        padding: "0.5ch",
        borderRadius: "0.25rem",
        border: "1px solid #282828"
      }
    },
    /* @__PURE__ */ React17.createElement(ControlButton, { onClick: onZoomIn }, "+"),
    /* @__PURE__ */ React17.createElement(ControlButton, { onClick: onZoomOut }, "-"),
    /* @__PURE__ */ React17.createElement(ControlButton, { onClick: onReset }, "Reset"),
    /* @__PURE__ */ React17.createElement(ControlButton, { onClick: onFit }, "Fit")
  )
);
var BackButton = React17.memo(({ onClick }) => /* @__PURE__ */ React17.createElement(
  "button",
  {
    type: "button",
    onClick,
    style: {
      padding: "0.5ch 1ch",
      background: "#161616",
      border: "1px solid #282828",
      color: "#FFF",
      borderRadius: "0.25rem",
      cursor: "pointer",
      fontSize: "0.875rem",
      opacity: 0.8,
      transition: "opacity 150ms"
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.opacity = "1";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.opacity = "0.8";
    }
  },
  "\u2190 Back"
));
var BreadcrumbButton = React17.memo(
  ({
    name,
    onClick,
    onKeyDown
  }) => /* @__PURE__ */ React17.createElement(
    "button",
    {
      type: "button",
      onClick,
      onKeyDown,
      style: {
        cursor: "pointer",
        textDecoration: "underline",
        color: "#A0A0A0",
        background: "none",
        border: "none",
        padding: 0,
        font: "inherit"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.backgroundColor = "#232323";
        e.currentTarget.style.color = "#FFF";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.backgroundColor = "";
        e.currentTarget.style.color = "#A0A0A0";
      }
    },
    name
  )
);
var CloseButton = React17.memo(({ onClick }) => /* @__PURE__ */ React17.createElement(
  "button",
  {
    type: "button",
    onClick,
    style: {
      border: "none",
      background: "none",
      cursor: "pointer",
      padding: "0.5ch",
      fontSize: "2ch",
      opacity: 0.5,
      color: "#FFF"
    }
  },
  "\xD7"
));
React17.memo(
  ({
    fiber,
    onFiberSelect,
    isDialogMode = true
  }) => {
    const svgRef = useRef10(null);
    const [svgWidth, setSvgWidth] = useState16(0);
    const [svgHeight, setSvgHeight] = useState16(0);
    const svgGroupRef = useRef10(null);
    const zoomRef = useRef10();
    const linksGroupRef = useRef10(null);
    const nodesGroupRef = useRef10(null);
    const renderedFibersRef = useRef10(/* @__PURE__ */ new Set());
    const flashTimeoutRef = useRef10();
    const [timelineIndex, setTimelineIndex] = useState16(-1);
    const [isPlaying, setIsPlaying] = useState16(false);
    const playIntervalRef = useRef10();
    const [activeTab, setActiveTab] = useState16("graph");
    const [tooltip, setTooltip] = useState16(null);
    const handlePropertyHover = (e, propName) => {
      if (!isDialogMode) return;
      const explanation = FIBER_PROP_EXPLANATIONS[propName];
      setTooltip(explanation || null);
    };
    const handlePropertyLeave = () => {
      setTooltip(null);
    };
    const { nodes, links } = useMemo6(() => {
      const nodes2 = [];
      const links2 = [];
      const nodeMap = /* @__PURE__ */ new Map();
      let nodeCounter = 0;
      const baseId = getFiberId(fiber).toString();
      const rootId = `${baseId}-${nodeCounter++}`;
      const rootName = typeof fiber.type === "string" ? fiber.type : fiber.type === null && fiber.tag === HostRootTag ? "#root" : fiber.type === null && fiber.tag === HostTextTag ? "#text" : getDisplayName(fiber.type) || fiber.type?.name || fiber.type?.displayName || "Component";
      const rootNode = {
        id: rootId,
        name: rootName,
        fiber,
        depth: 0
      };
      nodes2.push(rootNode);
      nodeMap.set(rootId, rootNode);
      if (fiber.child) {
        const stack2 = [
          {
            fiber: fiber.child,
            parentId: rootId,
            depth: 1
          }
        ];
        while (stack2.length > 0) {
          const current = stack2.pop();
          if (!current) continue;
          const { fiber: currentFiber, parentId, depth } = current;
          if (currentFiber.tag === FragmentTag) {
            if (currentFiber.child) {
              stack2.push({
                fiber: currentFiber.child,
                parentId,
                depth
              });
            }
            if (currentFiber.sibling && currentFiber.return === currentFiber.sibling.return) {
              stack2.push({
                fiber: currentFiber.sibling,
                parentId: currentFiber.return ? nodeMap.get(getFiberId(currentFiber.return).toString())?.id || parentId : parentId,
                depth
              });
            }
            continue;
          }
          if (currentFiber.type === null && isHostFiber(currentFiber)) {
            if (currentFiber.child) {
              stack2.push({
                fiber: currentFiber.child,
                parentId,
                depth
              });
            }
            if (currentFiber.sibling && currentFiber.return === currentFiber.sibling.return) {
              stack2.push({
                fiber: currentFiber.sibling,
                parentId: currentFiber.return ? nodeMap.get(getFiberId(currentFiber.return).toString())?.id || parentId : parentId,
                depth
              });
            }
            continue;
          }
          const childId = `${getFiberId(currentFiber)}-${nodeCounter++}`;
          let name = "unknown";
          if (typeof currentFiber.type === "string") {
            name = currentFiber.type;
          } else if (currentFiber.type === null && currentFiber.tag === HostTextTag) {
            const text = currentFiber.stateNode?.nodeValue?.trim() || "";
            if (text) {
              name = text.length > 20 ? `"${text.slice(0, 20)}..."` : `"${text}"`;
            } else {
              name = "#text";
            }
          } else if (currentFiber.type === null && currentFiber.tag === HostRootTag) {
            name = "#root";
          } else {
            name = getDisplayName(currentFiber.type) || currentFiber.type?.name || currentFiber.type?.displayName || "Component";
          }
          const node = {
            id: childId,
            name,
            fiber: currentFiber,
            depth
          };
          nodes2.push(node);
          nodeMap.set(childId, node);
          links2.push({
            source: parentId,
            target: childId
          });
          if (currentFiber.child) {
            stack2.push({
              fiber: currentFiber.child,
              parentId: childId,
              depth: depth + 1
            });
          }
          if (currentFiber.sibling && currentFiber.return === currentFiber.sibling.return) {
            stack2.push({
              fiber: currentFiber.sibling,
              parentId: currentFiber.return ? nodeMap.get(getFiberId(currentFiber.return).toString())?.id || parentId : parentId,
              depth
            });
          }
        }
      }
      return { nodes: nodes2, links: links2 };
    }, [fiber]);
    const { descendants, treeLinks } = useMemo6(() => {
      if (!svgWidth || !svgHeight || nodes.length === 0) {
        return { descendants: [], treeLinks: [] };
      }
      const stratify = stratify_default().id((d) => d.id).parentId((d) => {
        if (d.id === nodes[0].id) return null;
        const parentLink = links.find((link2) => link2.target === d.id);
        if (parentLink?.source && nodes.some((n) => n.id === parentLink.source)) {
          return parentLink.source.toString();
        }
        return null;
      });
      try {
        const root2 = stratify(nodes);
        if (!root2) return { descendants: [], treeLinks: [] };
        const treeLayout = tree_default().size([svgWidth - 200, svgHeight - 100]).nodeSize([180, 200]);
        const treeData = treeLayout(root2);
        return {
          descendants: treeData.descendants(),
          treeLinks: treeData.links()
        };
      } catch (e) {
        console.error("Error creating tree layout:", e);
        return { descendants: [], treeLinks: [] };
      }
    }, [nodes, links, svgWidth, svgHeight]);
    useEffect24(() => {
      if (!svgRef.current || !svgGroupRef.current) return;
      const zoom = zoom_default2().extent([
        [0, 0],
        [svgWidth, svgHeight]
      ]).scaleExtent([0.2, 8]).on("zoom", ({ transform: transform2 }) => {
        if (!svgGroupRef.current) return;
        svgGroupRef.current.style.transform = `translate(${transform2.x}px, ${transform2.y}px) scale(${transform2.k})`;
      });
      zoomRef.current = zoom;
      select_default2(svgRef.current).call(zoom);
      if (!isDialogMode) {
        const scale = 0.4;
        const x2 = svgWidth / 2;
        const y2 = svgHeight / 3;
        select_default2(svgRef.current).call(
          zoom.transform,
          identity2.translate(x2, y2).scale(scale)
        );
      }
      return () => {
        if (svgRef.current) {
          select_default2(svgRef.current).on(".zoom", null);
        }
      };
    }, [svgWidth, svgHeight, isDialogMode]);
    useEffect24(() => {
      if (!linksGroupRef.current || treeLinks.length === 0) return;
      select_default2(linksGroupRef.current).selectAll("path").data(treeLinks).join("path").attr(
        "d",
        linkVertical().x((d) => d.x).y((d) => d.y)
      ).attr("fill", "none").attr("stroke", "#404040").attr("stroke-width", "2");
    }, [treeLinks]);
    useEffect24(() => {
      if (!nodesGroupRef.current || descendants.length === 0) return;
      const nodeElements = select_default2(nodesGroupRef.current).selectAll("g").data(descendants, (d) => d.data.id);
      nodeElements.exit().remove();
      const nodeEnter = nodeElements.enter().append("g").attr("transform", (d) => `translate(${d.x},${d.y})`).style("cursor", "pointer").on("click", (event, d) => {
        event.stopPropagation();
        const element = getNearestHostFiber(d.data.fiber)?.stateNode;
        if (element instanceof HTMLElement) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          const originalOutline = element.style.outline;
          const originalTransition = element.style.transition;
          element.style.outline = "2px solid #FFC799";
          element.style.transition = "outline 0.1s ease-in-out";
          setTimeout(() => {
            element.style.outline = originalOutline;
            element.style.transition = originalTransition;
          }, 1e3);
        }
        onFiberSelect?.(d.data.fiber);
      });
      const nodeUpdate = nodeElements.merge(nodeEnter);
      nodeUpdate.attr("transform", (d) => `translate(${d.x},${d.y})`);
      const updateRect = (selection2) => {
        selection2.each(function(d) {
          const g = select_default2(this);
          const isRoot = d.data.id === nodes[0].id;
          const isPreview = !isDialogMode;
          const scale = isRoot ? isPreview ? 2 : 1.75 : 1;
          const isRendered = renderedFibersRef.current.has(
            getFiberId(d.data.fiber).toString()
          );
          const rect = g.selectAll("rect").data([d]).join("rect").attr("x", -75 * scale).attr("y", -30 * scale).attr("width", 150 * scale).attr("height", 60 * scale).attr("rx", 6 * scale).attr("fill", isCompositeFiber(d.data.fiber) ? "#FFF" : "#232323").attr("stroke", isRendered ? "#FFC799" : "#505050").attr("stroke-width", isRoot ? "3" : "2");
          rect.on("mouseover", function() {
            select_default2(this).attr("stroke", "#808080").attr("stroke-width", isRoot ? "4" : "3");
          }).on("mouseout", function() {
            select_default2(this).attr("stroke", isRendered ? "#FFC799" : "#505050").attr("stroke-width", isRoot ? "3" : "2");
          });
          const renderCount = renderCounts.get(d.data.fiber) || 0;
          const renderText = renderCount > 0 ? ` \xD7${renderCount}` : "";
          g.selectAll("text.name").data([d]).join("text").attr("class", "name").attr("text-anchor", "middle").attr("dy", `${-0.6 * scale}em`).attr("fill", isCompositeFiber(d.data.fiber) ? "#000" : "#FFF").attr("font-weight", "500").attr(
            "font-size",
            isRoot ? isPreview ? "1.75em" : "1.5em" : "1em"
          ).text(d.data.name + renderText);
          g.selectAll("text.props").data([d]).join("text").attr("class", "props").attr("text-anchor", "middle").attr("dy", `${0.9 * scale}em`).attr("fill", isCompositeFiber(d.data.fiber) ? "#666" : "#999").attr(
            "font-size",
            isRoot ? isPreview ? "1.25em" : "1.1em" : "0.75em"
          ).text(() => {
            const props = d.data.fiber.memoizedProps;
            if (!props || typeof props !== "object") return "";
            const propNames = Object.keys(props);
            if (propNames.length === 0) return "";
            const displayProps = propNames.slice(0, 3);
            if (propNames.length > 3) {
              return `${displayProps.join(", ")}...`;
            }
            return displayProps.join(", ");
          });
        });
      };
      updateRect(nodeUpdate);
    }, [descendants, nodes, isDialogMode, onFiberSelect]);
    const handleZoomIn = useCallback7(() => {
      if (!svgRef.current || !zoomRef.current) return;
      select_default2(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, 1.5);
    }, []);
    const handleZoomOut = useCallback7(() => {
      if (!svgRef.current || !zoomRef.current) return;
      select_default2(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, 0.75);
    }, []);
    const handleReset = useCallback7(() => {
      if (!svgRef.current || !zoomRef.current) return;
      select_default2(svgRef.current).transition().duration(200).call(zoomRef.current.transform, identity2);
    }, []);
    const handleFit = useCallback7(() => {
      if (!svgRef.current || !svgGroupRef.current || !zoomRef.current) return;
      const bounds = svgGroupRef.current.getBBox();
      const fullWidth = svgWidth;
      const fullHeight = svgHeight;
      const width = bounds.width;
      const height = bounds.height;
      const midX = bounds.x + width / 2;
      const midY = bounds.y + height / 2;
      const scale = 0.9 / Math.max(width / fullWidth, height / fullHeight);
      const translate = [
        fullWidth / 2 - scale * midX,
        fullHeight / 2 - scale * midY
      ];
      select_default2(svgRef.current).transition().duration(200).call(
        zoomRef.current.transform,
        identity2.translate(translate[0], translate[1]).scale(scale)
      );
    }, [svgWidth, svgHeight]);
    useEffect24(() => {
      if (!svgRef.current) return;
      const resizeObserver = new ResizeObserver(() => {
        if (!svgRef.current) return;
        setSvgWidth(svgRef.current.clientWidth);
        setSvgHeight(svgRef.current.clientHeight);
      });
      resizeObserver.observe(svgRef.current);
      return () => resizeObserver.disconnect();
    }, []);
    useEffect24(() => {
      if (nodes.length > 0) {
        setTimeout(handleFit, 0);
      }
    }, [nodes.length, handleFit]);
    useEffect24(() => {
      onCommitFiberRoot((root2) => {
        if (flashTimeoutRef.current) {
          clearTimeout(flashTimeoutRef.current);
        }
        renderedFibersRef.current = /* @__PURE__ */ new Set();
        traverseRenderedFibers(root2, (renderedFiber) => {
          const fiberId2 = getFiberId(renderedFiber).toString();
          renderedFibersRef.current.add(fiberId2);
          const states = fiberStates.get(fiberId2) || [];
          states.push({
            props: renderedFiber.memoizedProps ?? {},
            hookState: renderedFiber.memoizedState ?? {},
            timestamp: Date.now()
          });
          fiberStates.set(fiberId2, states);
          renderCounts.set(
            renderedFiber,
            (renderCounts.get(renderedFiber) || 0) + 1
          );
        });
        if (nodesGroupRef.current) {
          const nodeElements = select_default2(nodesGroupRef.current).selectAll("g");
          nodeElements.each(function(d) {
            const isRendered = renderedFibersRef.current.has(
              getFiberId(d.data.fiber).toString()
            );
            if (isRendered) {
              const rect = select_default2(this).select("rect");
              rect.attr("stroke", "#FFC799").style("filter", "drop-shadow(0 0 8px #FFC799)").transition().duration(400).style("filter", "none").attr("stroke", "#505050");
              const renderCount = renderCounts.get(d.data.fiber) || 0;
              const renderText = renderCount > 0 ? ` \xD7${renderCount}` : "";
              select_default2(this).select("text.name").text(d.data.name + renderText);
            }
          });
        }
        flashTimeoutRef.current = setTimeout(() => {
          renderedFibersRef.current = /* @__PURE__ */ new Set();
        }, 400);
      });
      return () => {
        if (flashTimeoutRef.current) {
          clearTimeout(flashTimeoutRef.current);
        }
      };
    }, []);
    const handleTimelineChange = useCallback7(
      (index) => {
        setTimelineIndex(index);
        const fiberId2 = getFiberId(fiber).toString();
        const states = fiberStates.get(fiberId2);
        if (states?.[index]) {
          const rdtHook = getRDTHook();
          if (rdtHook?.renderers.size > 0) {
            const renderer = Array.from(rdtHook.renderers.values())?.[0];
            const overrideProps = renderer?.currentDispatcherRef?.current?.overrideProps;
            const overrideHookState = renderer?.currentDispatcherRef?.current?.overrideHookState;
            const state = states?.[index];
            if (state) {
              if (overrideProps) {
                overrideProps(fiber, state.props);
              }
              if (overrideHookState) {
                overrideHookState(fiber, state.hookState);
              }
            }
          }
        }
      },
      [fiber]
    );
    const handlePlayPause = useCallback7(() => {
      setIsPlaying((prev) => !prev);
    }, []);
    const handleStepForward = useCallback7(() => {
      const states = fiberStates.get(getFiberId(fiber).toString());
      if (states) {
        const nextIndex = Math.min(timelineIndex + 1, states.length - 1);
        handleTimelineChange(nextIndex);
      }
    }, [fiber, timelineIndex, handleTimelineChange]);
    const handleStepBack = useCallback7(() => {
      const states = fiberStates.get(getFiberId(fiber).toString());
      if (states) {
        const prevIndex = Math.max(timelineIndex - 1, 0);
        handleTimelineChange(prevIndex);
      }
    }, [fiber, timelineIndex, handleTimelineChange]);
    useEffect24(() => {
      if (isPlaying) {
        playIntervalRef.current = setInterval(() => {
          const states = fiberStates.get(getFiberId(fiber).toString());
          if (states) {
            const nextIndex = timelineIndex + 1;
            if (nextIndex >= states.length) {
              setIsPlaying(false);
            } else {
              handleTimelineChange(nextIndex);
            }
          }
        }, 1e3);
      } else if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
      return () => {
        if (playIntervalRef.current) {
          clearInterval(playIntervalRef.current);
        }
      };
    }, [isPlaying, fiber, timelineIndex, handleTimelineChange]);
    return /* @__PURE__ */ React17.createElement(
      "div",
      {
        style: {
          height: "50ch",
          marginTop: "2ch",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }
      },
      isDialogMode && /* @__PURE__ */ React17.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "0.5ch",
            marginBottom: "1ch",
            padding: "0 1ch",
            borderBottom: "1px solid #282828"
          }
        },
        /* @__PURE__ */ React17.createElement(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("graph"),
            style: {
              background: "transparent",
              border: "none",
              color: activeTab === "graph" ? "#FFC799" : "#A0A0A0",
              padding: "1ch",
              cursor: "pointer",
              position: "relative",
              fontSize: "0.875rem",
              fontWeight: activeTab === "graph" ? 500 : 400
            }
          },
          "Graph View",
          activeTab === "graph" && /* @__PURE__ */ React17.createElement(
            "div",
            {
              style: {
                position: "absolute",
                bottom: "-1px",
                left: 0,
                right: 0,
                height: "2px",
                background: "#FFC799",
                borderRadius: "2px 2px 0 0"
              }
            }
          )
        ),
        /* @__PURE__ */ React17.createElement(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("fiber"),
            style: {
              background: "transparent",
              border: "none",
              color: activeTab === "fiber" ? "#FFC799" : "#A0A0A0",
              padding: "1ch",
              cursor: "pointer",
              position: "relative",
              fontSize: "0.875rem",
              fontWeight: activeTab === "fiber" ? 500 : 400
            }
          },
          "Fiber View",
          activeTab === "fiber" && /* @__PURE__ */ React17.createElement(
            "div",
            {
              style: {
                position: "absolute",
                bottom: "-1px",
                left: 0,
                right: 0,
                height: "2px",
                background: "#FFC799",
                borderRadius: "2px 2px 0 0"
              }
            }
          )
        )
      ),
      /* @__PURE__ */ React17.createElement("div", { style: { position: "relative", flex: 1 } }, /* @__PURE__ */ React17.createElement(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            display: activeTab === "graph" ? "block" : "none"
          }
        },
        /* @__PURE__ */ React17.createElement(
          Controls,
          {
            onZoomIn: handleZoomIn,
            onZoomOut: handleZoomOut,
            onReset: handleReset,
            onFit: handleFit
          }
        ),
        /* @__PURE__ */ React17.createElement(
          "svg",
          {
            ref: svgRef,
            viewBox: `0 0 ${svgWidth} ${svgHeight}`,
            xmlns: "http://www.w3.org/2000/svg",
            style: {
              width: "100%",
              height: "100%",
              background: "#101010",
              borderRadius: "0.25rem",
              cursor: "grab"
            },
            "aria-label": "Fiber Tree Visualization"
          },
          /* @__PURE__ */ React17.createElement("title", null, "Fiber Tree Visualization"),
          /* @__PURE__ */ React17.createElement("g", { ref: svgGroupRef }, /* @__PURE__ */ React17.createElement("g", { ref: linksGroupRef, className: "links" }), /* @__PURE__ */ React17.createElement("g", { ref: nodesGroupRef, className: "nodes" }))
        )
      ), /* @__PURE__ */ React17.createElement(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            display: activeTab === "fiber" ? "block" : "none",
            overflow: "auto",
            background: "#101010",
            borderRadius: "0.25rem",
            padding: "1ch"
          }
        },
        /* @__PURE__ */ React17.createElement(
          Inspector,
          {
            theme: theme3,
            data: fiber,
            expandLevel: 1,
            table: false,
            nodeRenderer: (props) => {
              const Component = props.depth === 0 ? ObjectRootLabel : ObjectLabel;
              return /* @__PURE__ */ React17.createElement(
                "span",
                {
                  onMouseEnter: (e) => handlePropertyHover(e, props.name),
                  onMouseLeave: handlePropertyLeave,
                  style: {
                    cursor: FIBER_PROP_EXPLANATIONS[props.name] ? "help" : "default",
                    padding: "1px 0",
                    display: "inline-block",
                    fontWeight: FIBER_PROP_EXPLANATIONS[props.name] ? 500 : "normal"
                  }
                },
                /* @__PURE__ */ React17.createElement(
                  Component,
                  {
                    name: props.name,
                    data: props.data,
                    isNonenumerable: props.isNonenumerable
                  }
                )
              );
            }
          }
        ),
        tooltip && /* @__PURE__ */ React17.createElement(
          "div",
          {
            style: {
              position: "absolute",
              zIndex: 1001,
              backgroundColor: "#161616",
              color: "#FFF",
              bottom: "2ch",
              right: "2ch",
              pointerEvents: "none",
              overflowY: "auto",
              padding: "1ch",
              fontSize: "1ch",
              border: "1px solid #282828",
              borderRadius: "0.25ch"
            }
          },
          tooltip
        )
      )),
      isDialogMode && /* @__PURE__ */ React17.createElement(
        "div",
        {
          style: {
            background: "#161616",
            padding: "1ch",
            margin: "1ch 1ch 0 1ch",
            borderRadius: "0.25rem",
            border: "1px solid #282828",
            display: "flex",
            flexDirection: "column",
            gap: "0.5ch",
            opacity: fiberStates.get(getFiberId(fiber).toString())?.length ? 1 : 0.5
          }
        },
        /* @__PURE__ */ React17.createElement(
          "div",
          {
            style: { display: "flex", alignItems: "center", gap: "0.5ch" }
          },
          /* @__PURE__ */ React17.createElement(
            "button",
            {
              type: "button",
              onClick: handleStepBack,
              disabled: !fiberStates.get(getFiberId(fiber).toString())?.length,
              style: {
                background: "transparent",
                border: "1px solid #282828",
                color: "#FFF",
                borderRadius: "0.25rem",
                cursor: fiberStates.get(getFiberId(fiber).toString())?.length ? "pointer" : "not-allowed",
                padding: "0.25ch 0.5ch"
              }
            },
            "\u23EE"
          ),
          /* @__PURE__ */ React17.createElement(
            "button",
            {
              type: "button",
              onClick: handlePlayPause,
              disabled: !fiberStates.get(getFiberId(fiber).toString())?.length,
              style: {
                background: "transparent",
                border: "1px solid #282828",
                color: "#FFF",
                borderRadius: "0.25rem",
                cursor: fiberStates.get(getFiberId(fiber).toString())?.length ? "pointer" : "not-allowed",
                padding: "0.25ch 0.5ch"
              }
            },
            isPlaying ? "\u23F8" : "\u25B6\uFE0F"
          ),
          /* @__PURE__ */ React17.createElement(
            "button",
            {
              type: "button",
              onClick: handleStepForward,
              disabled: !fiberStates.get(getFiberId(fiber).toString())?.length,
              style: {
                background: "transparent",
                border: "1px solid #282828",
                color: "#FFF",
                borderRadius: "0.25rem",
                cursor: fiberStates.get(getFiberId(fiber).toString())?.length ? "pointer" : "not-allowed",
                padding: "0.25ch 0.5ch"
              }
            },
            "\u23ED"
          ),
          /* @__PURE__ */ React17.createElement("span", { style: { color: "#A0A0A0", fontSize: "0.75rem" } }, timelineIndex >= 0 && fiberStates.get(getFiberId(fiber).toString())?.[timelineIndex]?.timestamp ? new Date(
            fiberStates.get(getFiberId(fiber).toString())?.[timelineIndex]?.timestamp ?? 0
          ).toLocaleTimeString() : "--:--:--"),
          !fiberStates.get(getFiberId(fiber).toString())?.length && /* @__PURE__ */ React17.createElement(
            "span",
            {
              style: {
                color: "#A0A0A0",
                fontSize: "0.75rem",
                marginLeft: "auto"
              }
            },
            "No state changes recorded yet"
          )
        ),
        /* @__PURE__ */ React17.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "0.25ch",
              height: "2ch",
              position: "relative"
            }
          },
          (fiberStates.get(getFiberId(fiber).toString()) ?? []).map(
            (state, i) => {
              const isActive = i === timelineIndex;
              return /* @__PURE__ */ React17.createElement(
                "div",
                {
                  key: state.timestamp,
                  onClick: () => handleTimelineChange(i),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleTimelineChange(i);
                    }
                  },
                  role: "button",
                  tabIndex: 0,
                  style: {
                    flex: 1,
                    height: "100%",
                    background: isActive ? "#FFC799" : "#282828",
                    cursor: "pointer",
                    position: "relative",
                    borderRadius: "0.125rem",
                    transition: "background-color 150ms",
                    outline: "none"
                  },
                  onMouseEnter: (e) => {
                    const target = e.currentTarget;
                    const tooltip2 = document.createElement("div");
                    tooltip2.style.position = "absolute";
                    tooltip2.style.bottom = "100%";
                    tooltip2.style.left = "50%";
                    tooltip2.style.transform = "translateX(-50%)";
                    tooltip2.style.background = "#161616";
                    tooltip2.style.color = "#FFF";
                    tooltip2.style.padding = "0.5ch";
                    tooltip2.style.borderRadius = "0.25rem";
                    tooltip2.style.fontSize = "0.75rem";
                    tooltip2.style.whiteSpace = "nowrap";
                    tooltip2.style.pointerEvents = "none";
                    tooltip2.style.border = "1px solid #282828";
                    tooltip2.style.zIndex = "1000";
                    const changes = [];
                    const states = fiberStates.get(
                      getFiberId(fiber).toString()
                    );
                    const prevState = i > 0 && states ? states[i - 1] : null;
                    if (prevState) {
                      const propChanges = Object.keys(state.props).filter(
                        (key) => state.props[key] !== prevState.props[key]
                      );
                      if (propChanges.length > 0) {
                        changes.push(`Props: ${propChanges.join(", ")}`);
                      }
                      const hookChanges = Object.keys(
                        state.hookState
                      ).filter(
                        (key) => state.hookState[key] !== prevState.hookState[key]
                      );
                      if (hookChanges.length > 0) {
                        changes.push(`State: ${hookChanges.join(", ")}`);
                      }
                    }
                    tooltip2.textContent = changes.length > 0 ? changes.join(" | ") : prevState ? "No changes" : "Initial state";
                    target.appendChild(tooltip2);
                  },
                  onMouseLeave: (e) => {
                    const tooltip2 = e.currentTarget.querySelector("div");
                    if (tooltip2) {
                      tooltip2.remove();
                    }
                  }
                }
              );
            }
          ),
          !fiberStates.get(getFiberId(fiber).toString())?.length && /* @__PURE__ */ React17.createElement(
            "div",
            {
              style: {
                flex: 1,
                height: "100%",
                background: "#282828",
                borderRadius: "0.125rem",
                opacity: 0.5
              }
            }
          )
        ),
        /* @__PURE__ */ React17.createElement(
          "input",
          {
            type: "range",
            min: 0,
            max: (fiberStates.get(getFiberId(fiber).toString())?.length ?? 1) - 1,
            value: timelineIndex,
            onChange: (e) => handleTimelineChange(Number(e.target.value)),
            disabled: !fiberStates.get(getFiberId(fiber).toString())?.length,
            style: {
              width: "100%",
              accentColor: "#FFC799",
              opacity: fiberStates.get(getFiberId(fiber).toString())?.length ? 1 : 0.5
            }
          }
        )
      )
    );
  }
);
var Inspector2 = React17.memo(
  ({ enabled = true, dangerouslyRunInProduction = false }) => {
    const [element, setElement] = useState16(null);
    const [rect, setRect] = useState16(null);
    const [isActive, setIsActive] = useState16(true);
    const [isDialogMode, setIsDialogMode] = useState16(false);
    const [tooltip, setTooltip] = useState16(null);
    const [selectedFiber, setSelectedFiber] = useState16(null);
    const [position, setPosition] = useState16({
      top: 0,
      left: 0
    });
    const [fiberHistory, setFiberHistory] = useState16([]);
    const getFiberForDisplay = useCallback7(() => {
      if (selectedFiber) return selectedFiber;
      const fiber2 = getFiberFromHostInstance(element);
      return fiber2;
    }, [selectedFiber, element]);
    const handlePropertyHover = (_e, propName) => {
      if (!isDialogMode) return;
      const explanation = FIBER_PROP_EXPLANATIONS[propName];
      setTooltip(explanation || null);
    };
    const handlePropertyLeave = () => {
      setTooltip(null);
    };
    const handleClose = useCallback7(() => {
      setIsDialogMode(false);
      setFiberHistory([]);
      setTooltip(null);
      setSelectedFiber(null);
      setElement(null);
      setRect(null);
    }, []);
    useEffect24(() => {
      const handleKeyDown = (e) => {
        if (e.key === "o" && (e.metaKey || e.ctrlKey) && rect) {
          e.preventDefault();
          const currentFiber = getFiberForDisplay();
          if (currentFiber) {
            setFiberHistory([currentFiber]);
          }
          setIsDialogMode(true);
        } else if (e.key === "Escape") {
          handleClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [rect, getFiberForDisplay, handleClose]);
    useEffect24(() => {
      if (!isDialogMode) {
        setTooltip(null);
        setFiberHistory([]);
        setSelectedFiber(null);
        setElement(null);
        setRect(null);
      }
    }, [isDialogMode]);
    useEffect24(() => {
      const handleMouseMove = (event) => {
        if (isDialogMode) return;
        const isActive2 = isInstrumentationActive() || hasRDTHook();
        if (!isActive2) {
          setIsActive(false);
          return;
        }
        if (!dangerouslyRunInProduction) {
          const rdtHook = getRDTHook();
          for (const renderer of rdtHook.renderers.values()) {
            const buildType = detectReactBuildType(renderer);
            if (buildType === "production") {
              setIsActive(false);
              return;
            }
          }
        }
        if (!enabled) {
          setElement(null);
          setRect(null);
          setSelectedFiber(null);
          return;
        }
        if (!isDialogMode) {
          const element2 = document.elementFromPoint(
            event.clientX,
            event.clientY
          );
          if (!element2) return;
          setElement(element2);
          setRect(element2.getBoundingClientRect());
          setSelectedFiber(null);
        }
      };
      const throttledMouseMove = throttle(handleMouseMove, 16);
      document.addEventListener("mousemove", throttledMouseMove);
      return () => {
        document.removeEventListener("mousemove", throttledMouseMove);
      };
    }, [enabled, isDialogMode, dangerouslyRunInProduction]);
    useEffect24(() => {
      if (!rect) return;
      const padding = 10;
      const inspectorWidth = 400;
      const inspectorHeight = 320;
      let left = rect.left + rect.width + padding;
      let top = rect.top;
      if (left + inspectorWidth > window.innerWidth) {
        left = Math.max(padding, rect.left - inspectorWidth - padding);
      }
      if (top >= rect.top && top <= rect.bottom) {
        if (rect.bottom + inspectorHeight + padding <= window.innerHeight) {
          top = rect.bottom + padding;
        } else if (rect.top - inspectorHeight - padding >= 0) {
          top = rect.top - inspectorHeight - padding;
        } else {
          top = window.innerHeight - inspectorHeight - padding;
        }
      }
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - inspectorHeight - padding)
      );
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - inspectorWidth - padding)
      );
      setPosition({ top, left });
    }, [rect]);
    useEffect24(() => {
      if (selectedFiber) {
        const element2 = getNearestHostFiber(selectedFiber)?.stateNode;
        if (element2) {
          setElement(element2);
          setRect(element2.getBoundingClientRect());
        }
      }
    }, [selectedFiber]);
    const handleBack = () => {
      const previousFiber = fiberHistory[fiberHistory.length - 1];
      if (previousFiber) {
        setFiberHistory((prev) => prev.slice(0, -1));
        setSelectedFiber(previousFiber);
      }
    };
    if (!rect || !isActive) return null;
    const fiber = getFiberForDisplay();
    if (!fiber) return null;
    let foundInspect = false;
    traverseFiber(
      fiber,
      (innerFiber) => {
        if (innerFiber.type === Inspector2) {
          foundInspect = true;
          return true;
        }
      },
      true
    );
    if (foundInspect) return null;
    const dialogStyle = isDialogMode ? {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80vw",
      height: "80vh",
      maxWidth: "none",
      maxHeight: "none",
      padding: "2ch",
      boxShadow: "0 0 0 5px rgba(0, 0, 0, 0.3)",
      backgroundColor: "#1a1a1a",
      border: "1px solid #333",
      zIndex: 1e3
    } : {};
    const overlayStyle = isDialogMode ? {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 999
    } : {};
    const fiberStack = fiber ? getFiberStack(fiber) : [];
    return /* @__PURE__ */ React17.createElement(React17.Fragment, null, isDialogMode && /* @__PURE__ */ React17.createElement(
      "div",
      {
        style: overlayStyle,
        onClick: handleClose,
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            handleClose();
          }
        },
        role: "button",
        tabIndex: 0
      }
    ), /* @__PURE__ */ React17.createElement(
      "div",
      {
        style: {
          position: "fixed",
          backgroundColor: "#101010",
          color: "#FFF",
          zIndex: 50,
          padding: "1ch",
          width: "50ch",
          height: isDialogMode ? "80ch" : "40ch",
          transition: "all 150ms, z-index 0ms",
          overflow: "visible",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.3)",
          border: "1px solid #282828",
          top: position.top,
          left: position.left,
          opacity: rect ? 1 : 0,
          transform: rect ? "translateY(0)" : "translateY(10px)",
          pointerEvents: rect ? "auto" : "none",
          display: "flex",
          flexDirection: "column",
          ...dialogStyle
        }
      },
      /* @__PURE__ */ React17.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }
        },
        /* @__PURE__ */ React17.createElement("div", { style: { display: "flex", alignItems: "center", gap: "1ch" } }, fiberHistory.length > 0 && /* @__PURE__ */ React17.createElement(BackButton, { onClick: handleBack }), /* @__PURE__ */ React17.createElement(
          "h3",
          {
            style: {
              fontSize: "0.875rem",
              backgroundColor: "#161616",
              color: "#FFF",
              padding: "0 0.5ch",
              borderRadius: "0.125rem",
              width: "fit-content",
              margin: 0
            }
          },
          `<${typeof fiber.type === "string" ? fiber.type : getDisplayName(fiber.type) || "unknown"}>`,
          !isDialogMode && /* @__PURE__ */ React17.createElement(
            "span",
            {
              style: {
                marginLeft: "1ch",
                opacity: 0.5,
                fontSize: "0.75rem"
              }
            },
            `Press ${isMac ? "\u2318" : "ctrl"}O to expand`
          )
        )),
        isDialogMode && /* @__PURE__ */ React17.createElement(CloseButton, { onClick: handleClose })
      ),
      isDialogMode && /* @__PURE__ */ React17.createElement(
        "div",
        {
          style: {
            borderTop: "1px solid #282828",
            padding: "0.5ch 0",
            fontSize: "0.75rem",
            color: "#A0A0A0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }
        },
        fiberStack.reverse().map((f, i, arr) => {
          const name = typeof f.type === "string" ? f.type : getDisplayName(f.type) || "unknown";
          if (!name) return null;
          return /* @__PURE__ */ React17.createElement(React17.Fragment, { key: getFiberId(f) }, /* @__PURE__ */ React17.createElement(
            BreadcrumbButton,
            {
              name,
              onClick: () => {
                if (selectedFiber) {
                  setFiberHistory((prev) => [...prev, selectedFiber]);
                }
                setSelectedFiber(f);
                const element2 = getNearestHostFiber(f)?.stateNode;
                if (element2) {
                  setElement(element2);
                  setRect(element2.getBoundingClientRect());
                }
              },
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (selectedFiber) {
                    setFiberHistory((prev) => [...prev, selectedFiber]);
                  }
                  setSelectedFiber(f);
                  const element2 = getNearestHostFiber(f)?.stateNode;
                  if (element2) {
                    setElement(element2);
                    setRect(element2.getBoundingClientRect());
                  }
                }
              }
            }
          ), i < arr.length - 1 && " > ");
        })
      ),
      /* @__PURE__ */ React17.createElement("div", { style: { flex: 1, overflow: "auto" } }, fiber && /* @__PURE__ */ React17.createElement(
        Inspector,
        {
          theme: theme3,
          data: fiber,
          expandLevel: 1,
          table: false,
          nodeRenderer: (props) => {
            const Component = props.depth === 0 ? ObjectRootLabel : ObjectLabel;
            return /* @__PURE__ */ React17.createElement(
              "span",
              {
                onMouseEnter: (e) => handlePropertyHover(e, props.name),
                onMouseLeave: handlePropertyLeave,
                style: {
                  cursor: FIBER_PROP_EXPLANATIONS[props.name] ? "help" : "default",
                  padding: "1px 0",
                  display: "inline-block",
                  fontWeight: FIBER_PROP_EXPLANATIONS[props.name] ? 500 : "normal"
                }
              },
              /* @__PURE__ */ React17.createElement(
                Component,
                {
                  name: props.name,
                  data: props.data,
                  isNonenumerable: props.isNonenumerable
                }
              )
            );
          }
        }
      )),
      tooltip && /* @__PURE__ */ React17.createElement(
        "div",
        {
          style: {
            position: "absolute",
            zIndex: 1001,
            backgroundColor: "#161616",
            color: "#FFF",
            bottom: "2ch",
            right: "2ch",
            pointerEvents: "none",
            overflowY: "auto",
            padding: "1ch",
            fontSize: "1ch",
            border: "1px solid #282828",
            borderRadius: "0.25ch"
          }
        },
        tooltip
      )
    ), !isDialogMode && /* @__PURE__ */ React17.createElement(
      "div",
      {
        style: {
          position: "fixed",
          zIndex: 40,
          pointerEvents: "none",
          transition: "all 150ms",
          border: "1px dashed #505050",
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          opacity: rect ? 1 : 0
        }
      }
    ));
  }
);

// src/client/react-router-dev-tools.tsx
import { useHotkeys as useHotkeys2 } from "react-hotkeys-hook";

// src/client/components/Breakpoints.tsx
import clsx19 from "clsx";

// src/client/hooks/useOnWindowResize.ts
import { useEffect as useEffect25, useState as useState17 } from "react";
var useOnWindowResize = () => {
  const [windowSize, setWindowSize] = useState17({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect25(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};

// src/client/components/Breakpoints.tsx
import { jsx as jsx54 } from "react/jsx-runtime";
var Breakpoints = () => {
  const { width } = useOnWindowResize();
  const { settings } = useSettingsContext();
  const breakpoints = settings.breakpoints;
  const show = settings.showBreakpointIndicator;
  const breakpoint = breakpoints.find((bp) => bp.min <= width && bp.max >= width);
  if (!breakpoint || !breakpoint.name || !show) {
    return null;
  }
  return /* @__PURE__ */ jsx54(
    "div",
    {
      className: clsx19(
        "flex fixed bottom-0 left-0 mb-5 rounded-full bg-[#212121] z-[9998] size-10 text-white flex items-center justify-center items-center gap-2 mx-1"
      ),
      children: breakpoint?.name
    }
  );
};

// src/client/components/LiveUrls.tsx
import clsx20 from "clsx";
import { Link as Link2, useLocation as useLocation3 } from "react-router";
import { jsx as jsx55 } from "react/jsx-runtime";
var LiveUrls = () => {
  const { settings } = useSettingsContext();
  const location = useLocation3();
  const envsPosition = settings.liveUrlsPosition;
  const envsClassName = {
    "bottom-0": envsPosition === "bottom-left" || envsPosition === "bottom-right",
    "top-0": envsPosition === "top-left" || envsPosition === "top-right",
    "right-0": envsPosition === "bottom-right" || envsPosition === "top-right",
    "left-0": envsPosition === "bottom-left" || envsPosition === "top-left"
  };
  if (settings.liveUrls.length === 0) return null;
  return /* @__PURE__ */ jsx55("div", { className: clsx20("flex fixed items-center z-[9998] gap-2 px-2", envsClassName), children: settings.liveUrls.map((env) => {
    return /* @__PURE__ */ jsx55(
      Link2,
      {
        referrerPolicy: "no-referrer",
        target: "_blank",
        to: env.url + location.pathname,
        className: "flex transition-all hover:text-gray-500 items-center gap-2 text-sm font-semibold text-gray-400",
        children: env.name
      },
      env.name
    );
  }) });
};

// src/client/hooks/useOpenElementSource.ts
var useOpenElementSource = () => {
  const { sendJsonMessage } = useDevServerConnection();
  useAttachDocumentListener("contextmenu", (e) => {
    if (!e.shiftKey || !e) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    const rdtSource = target?.getAttribute("data-source");
    if (rdtSource) {
      const [source, line, column] = rdtSource.split(":::");
      return sendJsonMessage({
        type: "open-source",
        data: { source, line, column }
      });
    }
    for (const key in e.target) {
      if (key.startsWith("__reactFiber")) {
        const fiberNode = e.target[key];
        const originalSource = fiberNode?._debugSource;
        const source = fiberNode?._debugOwner?._debugSource ?? fiberNode?._debugSource;
        const line = source?.fileName?.startsWith("/") ? originalSource?.lineNumber : source?.lineNumber;
        const fileName = source?.fileName?.startsWith("/") ? originalSource?.fileName : source?.fileName;
        if (fileName && line) {
          return sendJsonMessage({
            type: "open-source",
            data: { source: fileName, line, column: 0 }
          });
        }
      }
    }
  });
};

// src/client/react-router-dev-tools.tsx
import { jsx as jsx56, jsxs as jsxs32 } from "react/jsx-runtime";
var recursivelyChangeTabIndex = (node, remove2 = true) => {
  if (remove2) {
    node.setAttribute("tabIndex", "-1");
  } else {
    node.removeAttribute("tabIndex");
  }
  for (const child of node.children) {
    recursivelyChangeTabIndex(child, remove2);
  }
};
var DevTools = ({ plugins: pluginArray }) => {
  useTimelineHandler();
  useResetDetachmentCheck();
  useReactTreeListeners();
  useSetRouteBoundaries();
  useSyncStateWhenDetached();
  useDevServerConnection();
  useOpenElementSource();
  useListenToRouteChange();
  const { setPersistOpen } = usePersistOpen();
  const url = useLocation4().search;
  const { detachedWindowOwner, isDetached, setDetachedWindowOwner } = useDetachedWindowControls();
  const { settings } = useSettingsContext();
  const { persistOpen } = usePersistOpen();
  const { position } = settings;
  const [isOpen, setIsOpen] = useState18(isDetached || settings.defaultOpen || persistOpen);
  const leftSideOriented = position.includes("left");
  const plugins = pluginArray?.map((plugin) => typeof plugin === "function" ? plugin() : plugin);
  const debounceSetOpen = useDebounce(() => {
    setIsOpen(!isOpen);
    setPersistOpen(!isOpen);
  }, 100);
  useHotkeys2(settings.openHotkey, () => debounceSetOpen());
  useHotkeys2("esc", () => isOpen ? debounceSetOpen() : null);
  useEffect26(() => {
    const el = document.getElementById(REACT_ROUTER_DEV_TOOLS);
    if (!el) return;
    recursivelyChangeTabIndex(el, !isOpen);
  }, [isOpen]);
  if (settings.requireUrlFlag && !url.includes(settings.urlFlag)) return null;
  if (detachedWindowOwner) {
    return /* @__PURE__ */ jsx56(
      "div",
      {
        "data-testid": "react-router-devtools",
        id: REACT_ROUTER_DEV_TOOLS,
        className: "react-router-dev-tools react-router-dev-tools-reset",
        children: /* @__PURE__ */ jsx56(
          Trigger3,
          {
            isOpen: false,
            setIsOpen: () => {
              setDetachedWindowOwner(false);
              setStorageItem(REACT_ROUTER_DEV_TOOLS_IS_DETACHED, "false");
              setSessionItem(REACT_ROUTER_DEV_TOOLS_DETACHED_OWNER, "false");
            }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxs32(
    "div",
    {
      "data-testid": "react-router-devtools",
      id: REACT_ROUTER_DEV_TOOLS,
      className: "react-router-dev-tools react-router-dev-tools-reset",
      children: [
        /* @__PURE__ */ jsx56(Trigger3, { isOpen, setIsOpen }),
        /* @__PURE__ */ jsx56(LiveUrls, {}),
        /* @__PURE__ */ jsx56(Breakpoints, {}),
        /* @__PURE__ */ jsx56(Inspector2, { enabled: settings.enableInspector }),
        /* @__PURE__ */ jsx56(MainPanel, { isOpen, children: /* @__PURE__ */ jsxs32("div", { className: "flex h-full", children: [
          /* @__PURE__ */ jsx56(Tabs, { plugins, setIsOpen }),
          /* @__PURE__ */ jsx56(ContentPanel, { leftSideOriented, plugins })
        ] }) })
      ]
    }
  );
};
var ReactRouterDevTools = ({ plugins, config }) => {
  return /* @__PURE__ */ jsx56(RDTContextProvider, { config, children: /* @__PURE__ */ jsx56(DevTools, { plugins }) });
};

// src/client/init/hydration.ts
function removeStyleAndDataAttributes(inputString) {
  const styleTagRegex = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
  const scriptTagRegex = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
  const templateRegex = /<template\b[^>]*>[\s\S]*?<\/template>/gi;
  const styleRegex = /style="([^"]*)"/g;
  let resultString = inputString.replaceAll(styleTagRegex, "").replaceAll(scriptTagRegex, "").replaceAll(templateRegex, "").replaceAll("<!--$?-->", "").replaceAll("<!--/$-->", "");
  resultString = resultString.replaceAll(styleRegex, (match, styleValue2) => {
    const updatedStyle = styleValue2.trim().endsWith(";") ? styleValue2 : `${styleValue2};`;
    return `style="${updatedStyle.replaceAll(" ", "")}"`;
  });
  return resultString;
}
var hydrationDetector = () => {
  if (typeof window !== "undefined") {
    if (!window.HYDRATION_OVERLAY) {
      window.HYDRATION_OVERLAY = {};
    }
    window.addEventListener("error", (event) => {
      const msg = event.message.toLowerCase();
      const isHydrationMsg = msg.includes("hydration") || msg.includes("hydrating") || msg.includes("minified react error #418");
      if (isHydrationMsg) {
        window.HYDRATION_OVERLAY.ERROR = true;
        const appRootEl = document.querySelector("html");
        if (appRootEl) {
          window.HYDRATION_OVERLAY.CSR_HTML = removeStyleAndDataAttributes(appRootEl.outerHTML);
        }
      }
    });
  }
  const HYDRATION_OVERLAY_ELEMENT = typeof document !== "undefined" && document.querySelector("html");
  if (HYDRATION_OVERLAY_ELEMENT) {
    window.HYDRATION_OVERLAY.SSR_HTML = removeStyleAndDataAttributes(HYDRATION_OVERLAY_ELEMENT.outerHTML);
  }
};

// src/client/init/root.tsx
import { jsx as jsx57, jsxs as jsxs33 } from "react/jsx-runtime";
var hydrating2 = true;
function useHydrated2() {
  const [hydrated, setHydrated] = useState19(() => !hydrating2);
  useEffect27(function hydrate() {
    hydrating2 = false;
    setHydrated(true);
  }, []);
  return hydrated;
}
var defineClientConfig = (config) => config;
var withViteDevTools = (Component, config) => (props) => {
  hydrationDetector();
  function AppWithDevTools(props2) {
    const hydrated = useHydrated2();
    if (!hydrated)
      return /* @__PURE__ */ jsx57(RequestProvider, { children: /* @__PURE__ */ jsx57(Component, { ...props2 }) });
    return /* @__PURE__ */ jsxs33(RequestProvider, { children: [
      /* @__PURE__ */ jsx57(Component, { ...props2 }),
      createPortal(/* @__PURE__ */ jsx57(ReactRouterDevTools, { ...config }), document.body)
    ] });
  }
  return AppWithDevTools(props);
};

// src/client/hof.ts
var sendEventToDevServer = (req) => {
  if (req.data) {
    req.data = convertBigIntToString(req.data);
  }
  import.meta.hot?.send("request-event", req);
};
var analyzeClientLoaderOrAction = (loaderOrAction, routeId, type) => {
  return async (args) => {
    const startTime = Date.now();
    const headers = Object.fromEntries(args.request.headers.entries());
    sendEventToDevServer({
      type,
      url: args.request.url,
      headers,
      startTime,
      id: routeId,
      method: args.request.method
    });
    let aborted = false;
    args.request.signal.addEventListener("abort", () => {
      aborted = true;
      sendEventToDevServer({
        type,
        url: args.request.url,
        headers,
        startTime,
        endTime: Date.now(),
        id: routeId,
        method: args.request.method,
        aborted: true
      });
    });
    const data = await loaderOrAction(args);
    if (!aborted) {
      sendEventToDevServer({
        type,
        url: args.request.url,
        headers,
        startTime,
        endTime: Date.now(),
        id: routeId,
        data,
        method: args.request.method
      });
    }
    return data;
  };
};
var withClientLoaderWrapper = (clientLoader, routeId) => {
  return analyzeClientLoaderOrAction(clientLoader, routeId, "client-loader");
};
var withLinksWrapper = (links, rdtStylesheet) => {
  return () => [...links(), { rel: "stylesheet", href: rdtStylesheet }];
};
var withClientActionWrapper = (clientAction, routeId) => {
  return analyzeClientLoaderOrAction(clientAction, routeId, "client-action");
};
export {
  EmbeddedDevTools,
  defineClientConfig,
  withClientActionWrapper,
  withClientLoaderWrapper,
  withLinksWrapper,
  withViteDevTools
};
/*! Bundled license information:

bippy/dist/chunk-DE5T66AV.js:
  (**
   * @license bippy
   *
   * Copyright (c) Aiden Bai, Million Software, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

bippy/dist/inspect.js:
  (**
   * @license bippy
   *
   * Copyright (c) Aiden Bai, Million Software, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
