
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


// https://leetcode.cn/problems/linked-list-cycle/description/?envType=problem-list-v2&envId=2cktkvj
// 141. 环形链表
var hasCycle = function(head) {
  let point1 = head
  let point2 = head
  while(point2 && point2.next ){
      point1 = point1.next
      point2 = point2.next.next
      if(point1 === point2) return true
  }
  return false
};
