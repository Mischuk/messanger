import { AbortControl } from './types';

let cancelableControl: AbortControl = null;

export interface CancelableRequest<T> {
    request: Promise<T>;
    cancel: () => void;
    controller: AbortController;
}

export function cancelableRequest<T>(
    fn: (controller: AbortController) => CancelableRequest<T>
): CancelableRequest<T> {
    if (cancelableControl) {
        // cancelableControl.abort();
    }
    cancelableControl = new AbortController();
    return fn(cancelableControl);
}
