import { IconClose, IconLoading } from "@arco-design/web-react/icon";
import { useMount } from "ahooks";
import React, { useRef, useState } from "react";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";
import {
    IconProps,
    SearchBoxClassNames,
    SearchBoxTranslations,
} from "react-instantsearch-hooks-web/dist/es/ui/SearchBox";
export function cx(
    ...classs: Array<string | number | boolean | undefined | null>
) {
    return classs.filter(Boolean).join(" ");
}

export type SearchBoxProps = Omit<
    React.ComponentProps<"div">,
    "onSubmit" | "onReset" | "onChange"
> &
    Pick<React.ComponentProps<"form">, "onSubmit"> &
    Required<Pick<React.ComponentProps<"form">, "onReset">> &
    Pick<
        React.ComponentProps<"input">,
        "placeholder" | "onChange" | "autoFocus"
    > & {
        inputRef: React.RefObject<HTMLInputElement>;
        isSearchStalled: boolean;
        value: string;
        resetIconComponent?: React.JSXElementConstructor<IconProps>;
        submitIconComponent?: React.JSXElementConstructor<IconProps>;
        loadingIconComponent?: React.JSXElementConstructor<IconProps>;
        classs?: Partial<SearchBoxClassNames>;
        translations: SearchBoxTranslations;
    };

function DefaultSubmitIcon({ classs }: IconProps) {
    return (
        <svg
            class={cx("ais-SearchBox-submitIcon", classs.submitIcon)}
            width="10"
            height="10"
            viewBox="0 0 40 40">
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
        </svg>
    );
}

export function SearchBoxUI({
    inputRef,
    isSearchStalled,
    onChange,
    onReset,
    onSubmit,
    placeholder,
    value,
    autoFocus,
    submitIconComponent: SubmitIcon = DefaultSubmitIcon,
    classs = {},
    translations,
    ...props
}: SearchBoxProps) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (onSubmit) {
            onSubmit(event);
        }

        if (inputRef.current) {
            inputRef.current.blur();
        }
    }

    function handleReset(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        onReset(event);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <div {...props} class={cx("ais-SearchBox", classs.root, props.class)}>
            <form
                action=""
                class={cx("ais-SearchBox-form", classs.form)}
                noValidate
                onSubmit={handleSubmit}
                onReset={handleReset}>
                <input
                    ref={inputRef}
                    class={cx("ais-SearchBox-input", classs.input)}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder={placeholder}
                    spellCheck={false}
                    maxLength={512}
                    type="search"
                    value={value}
                    onChange={onChange}
                    autoFocus={autoFocus}
                />
                <button
                    class={cx("ais-SearchBox-submit", classs.submit)}
                    type="submit"
                    title={translations.submitTitle}>
                    <SubmitIcon classs={classs} />
                </button>
                <button
                    class={cx("ais-SearchBox-reset", classs.reset)}
                    type="reset"
                    title={translations.resetTitle}
                    hidden={value.length === 0 || isSearchStalled}>
                    <IconClose></IconClose>
                </button>
                <span
                    class={cx(
                        "ais-SearchBox-loadingIndicator",
                        classs.loadingIndicator
                    )}
                    hidden={!isSearchStalled}>
                    <IconLoading spin></IconLoading>
                </span>
            </form>
        </div>
    );
}
type UiProps = Pick<
    SearchBoxProps,
    | "inputRef"
    | "isSearchStalled"
    | "onChange"
    | "onReset"
    | "onSubmit"
    | "value"
    | "autoFocus"
    | "translations"
>;
export type SearchBoxInnerProps = Omit<
    SearchBoxProps,
    Exclude<keyof UiProps, "onSubmit" | "autoFocus">
> &
    UseSearchBoxProps & {
        /**
         * Whether to trigger the search only on submit.
         * @default true
         */
        searchAsYouType?: boolean;
    };
export function SearchBoxInner({
    queryHook,
    searchAsYouType = true,
    ...props
}: SearchBoxInnerProps) {
    const { query, refine, isSearchStalled, clear } = useSearchBox(
        { queryHook },
        { $$widgetType: "ais.searchBox" }
    );
    const [inputValue, setInputValue] = useState(props.defaultValue as string);
    const inputRef = useRef<HTMLInputElement>(null);

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        if (!searchAsYouType) {
            refine(inputValue);
        }

        if (props.onSubmit) {
            props.onSubmit(event);
        }
    }
    function setQuery(newQuery: string) {
        if (!newQuery) {
            clear();
        }
        setInputValue(newQuery);

        if (searchAsYouType) {
            refine(newQuery);
        }
    }
    // Track when the InstantSearch query changes to synchronize it with
    // the React state.
    // We bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (query !== inputValue && document.activeElement !== inputRef.current) {
        setInputValue(query);
    }
    useMount(() => {
        if (props.defaultValue) {
            // refine(props.defaultValue as string);
            setQuery(props.defaultValue as string);
            // setInputValue(props.defaultValue as string);
        }
    });

    const uiProps: UiProps = {
        inputRef,
        isSearchStalled,
        onChange(i) {
            setQuery(i.currentTarget.value);
        },
        onReset() {
            setQuery("");
        },
        onSubmit,
        value: inputValue,
        translations: {
            submitTitle: "搜索",
            resetTitle: "清空搜索",
        },
    };

    return <SearchBoxUI {...props} {...uiProps} />;
}
