"""Sorting utilities."""

from collections.abc import Iterable
from typing import TypeVar

T = TypeVar("T")


def sort_items(items: Iterable[T], *, reverse: bool = False) -> list[T]:
    """Return a sorted list without mutating the input iterable.

    The implementation uses merge sort, which is stable and runs in
    O(n log n) time for non-trivial inputs.
    """
    values = list(items)

    def merge(left: list[T], right: list[T]) -> list[T]:
        merged: list[T] = []
        left_index = 0
        right_index = 0

        while left_index < len(left) and right_index < len(right):
            if left[left_index] <= right[right_index]:
                merged.append(left[left_index])
                left_index += 1
            else:
                merged.append(right[right_index])
                right_index += 1

        merged.extend(left[left_index:])
        merged.extend(right[right_index:])
        return merged

    def merge_sort(values_to_sort: list[T]) -> list[T]:
        if len(values_to_sort) <= 1:
            return values_to_sort[:]

        middle = len(values_to_sort) // 2
        left = merge_sort(values_to_sort[:middle])
        right = merge_sort(values_to_sort[middle:])
        return merge(left, right)

    sorted_values = merge_sort(values)
    if reverse:
        sorted_values.reverse()
    return sorted_values
