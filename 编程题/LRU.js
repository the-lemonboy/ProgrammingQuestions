// ./LRU.ts
export class LRUCache {
    capacity: number; // 容量
    cache: Map<number, number | null>; // 缓存
    constructor(capacity: number) {
      this.capacity = capacity;
      this.cache = new Map();
    }
    get(key: number): number {
      if (this.cache.has(key)) {
        let temp = this.cache.get(key) as number;
        //访问到的 key 若在缓存中，将其提前
        this.cache.delete(key);
        this.cache.set(key, temp);
        return temp;
      }
      return -1;
    }
    put(key: number, value: number): void {
      if (this.cache.has(key)) {
        this.cache.delete(key);
        //存在则删除，if 结束再提前
      } else if (this.cache.size >= this.capacity) {
        // 超过缓存长度,淘汰最近没使用的
        this.cache.delete(this.cache.keys().next().value);
        console.log(`refresh: key:${key} , value:${value}`)
      }
      this.cache.set(key, value);
    }
    toString(){
      console.log('capacity',this.capacity)
      console.table(this.cache)
    }
  }
import { SplitNode } from 'three/webgpu';
  // ./index.ts
  import {LRUCache} from './lru'
  const list = new LRUCache(4)
  list.put(2,2)   // 入 2，剩余容量3
  list.put(3,3)   // 入 3，剩余容量2
  list.put(4,4)   // 入 4，剩余容量1
  list.put(5,5)   // 入 5，已满    从头至尾         2-3-4-5
  list.put(4,4)   // 入4，已存在 ——> 置队尾         2-3-5-4
  list.put(1,1)   // 入1，不存在 ——> 删除队首 插入1  3-5-4-1
  list.get(3)     // 获取3，刷新3——> 置队尾         5-4-1-3
  list.toString()
  


  class LRUCache{
    constructor(capacity){
        this.capacity = capacity
        this.cache = new Map()
    }
    get(key){
        if(this.cache.has(key)){
            this.cache.delete(key)
            this.cache.set(key,key)
            return key
        }
    }
    set(key,value){
        if(this.cache.size >= this.capacity){
          // 关键* keys()按照先插入的值获取
            this.cache.delete(this.cache.keys().next().value)
        }else if(this.cache.has(key)){
            this.cache.delete(key)
        }
        // 优先级前置
        this.cache.set(key,value)
        return [key,value]
    }
  }