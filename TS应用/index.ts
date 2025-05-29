import { DeepMerge } from './types'
// -------------------ts重载

export function range(stop: number): number[]
export function range(start: number, stop: number, step?: number): number[]
export function range(...args: any): number[] {
    let start: number, stop: number, step: number

    if (args.length === 1) {
        start = 0
        step = 1;
        ([stop] = args)
    }
    else {
        ([start, stop, step = 1] = args)
    }

    const arr: number[] = []
    let current = start
    while (current < stop) {
        arr.push(current)
        current += step || 1
    }

    return arr
}


// -------------------------
export const isObject = (val: any): val is object => toString(val) === '[object Object]'
function isMergableObject(item: any): item is object {
    return isObject(item) && !Array.isArray(item)
}
export function objectKeys<T extends object>(obj: T) {
    return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}
export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
    if (!sources.length)
        return target as any

    const source = sources.shift()
    if (source === undefined)
        return target as any

    if (isMergableObject(target) && isMergableObject(source)) {
        objectKeys(source).forEach((key) => {
            if (key === '__proto__' || key === 'constructor' || key === 'prototype')
                return

            // @ts-expect-error
            if (isMergableObject(source[key])) {
                // @ts-expect-error
                if (!target[key])
                    // @ts-expect-error
                    target[key] = {}

                // @ts-expect-error
                if (isMergableObject(target[key])) {
                    deepMerge(target[key], source[key])
                }
                else {
                    // @ts-expect-error
                    target[key] = source[key]
                }
            }
            else {
                // @ts-expect-error
                target[key] = source[key]
            }
        })
    }

    return deepMerge(target, ...sources)
}