type MyPick<T, K extends keyof T> = {
    [key in K]: T[key]
}


type MyRecord<T extends keyof any, K> = {
    [P in T]: K
}
// https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.zh-CN.md
// 对象只读
type MyReadonly<T> = {
    readonly [P in keyof T] : T[P]
}


// https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.zh-CN.md
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

// type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type TupleToObject<T extends readonly (string | symbol | number)[]> = {
    [P in T[number]]: P
}



// https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.zh-CN.md
type MyExclude<T, S extends T> = T extends S ? never : T

