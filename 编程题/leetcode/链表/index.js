
// 有序链表合并
// https://www.kancloud.cn/hanxuming/realquestionsforfrontend/3194625
function ListNode(val) {
    this.val = val;
    this.next = null;
  }
  
  function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(-1);
    let cur = dummy;
  
    while (l1 !== null && l2 !== null) {
      if (l1.val < l2.val) {
        cur.next = l1;
        l1 = l1.next;
      } else {
        cur.next = l2;
        l2 = l2.next;
      }
      cur = cur.next;
    }
  
    cur.next = l1 ? l1 : l2;
  
    return dummy.next;
  }


// 链表判断是否有环
// https://www.kancloud.cn/hanxuming/realquestionsforfrontend/3194626
function hasCycle(head) {
  if (head === null || head.next === null) {
    return false;
  }
  
  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    if (fast === null || fast.next === null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }

  return true;
}


// https://leetcode.cn/problems/reverse-linked-list/description/
// 反转链表
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while(curr){
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};