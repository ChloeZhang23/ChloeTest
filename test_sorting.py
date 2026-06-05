import unittest

from sorting import sort_items


class SortItemsTest(unittest.TestCase):
    def test_sorts_numbers_in_ascending_order(self) -> None:
        self.assertEqual(sort_items([5, 3, 8, 1, 2]), [1, 2, 3, 5, 8])

    def test_handles_empty_and_single_item_inputs(self) -> None:
        self.assertEqual(sort_items([]), [])
        self.assertEqual(sort_items([7]), [7])

    def test_handles_duplicate_and_negative_values(self) -> None:
        self.assertEqual(sort_items([4, -1, 4, 0, -3]), [-3, -1, 0, 4, 4])

    def test_can_sort_in_reverse_order(self) -> None:
        self.assertEqual(sort_items([1, 5, 2, 5]), [1, 2, 5, 5])
        self.assertEqual(sort_items([1, 5, 2, 5], reverse=True), [5, 5, 2, 1])

    def test_does_not_mutate_input_list(self) -> None:
        original = [3, 1, 2]

        result = sort_items(original)

        self.assertEqual(result, [1, 2, 3])
        self.assertEqual(original, [3, 1, 2])

    def test_accepts_any_iterable(self) -> None:
        self.assertEqual(sort_items(value for value in [3, 1, 2]), [1, 2, 3])


if __name__ == "__main__":
    unittest.main()
